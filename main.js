const { app, BrowserWindow, ipcMain, webUtils, dialog } = require("electron");
const path = require("path");
const os = require("node:os");
const fsPromise = require("node:fs/promises");
const default_configs = require("./default_configs");
const { mkdir } = require("fs");
let config;
let userdata;
let petData;
let missions;
let examinationData;
const OpenAI = require("openai");
const archiver = require("archiver");
const { createWriteStream } = require("fs");
const getDateNum = require("./src/js/getDateNum");
const tar = require("tar");
const { finished } = require("stream");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  win.loadFile("dist/index.html");

  ipcMain.on("ask-gpt", async (e, [apiKey, score]) => {
    try {
      const openai = new OpenAI({ apiKey: apiKey });

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `用戶在先前的心理測驗測驗獲得${
              24 - score
            }分，滿分為24分。分數越高表示用戶的心理狀況越好，而分數越低表示用戶的心理狀況越差，。請給用戶一些關於心理測驗得分的建議，請勿在回應中提到用戶的得分。`,
          },
          { role: "user", content: "請一定要回應完整的句子" },
          { role: "user", content: "請把回應的字數限制在150字以内" },

          {
            role: "user",
            content: `我在先前的心理測驗測驗獲得${
              24 - score
            }分，滿分為24分。分數越高表示我的心理狀況越好，而分數越低表示我的心理狀況越差，。請給我一些關於心理測驗得分的建議，請勿在回應中提到我的得分。`,
          },
        ],
        model: "gpt-4o",
        stream: true,
      });

      for await (const chunk of completion) {
        if (chunk.choices[0].delta.content != undefined) {
          win.webContents.send("gpt-result", chunk.choices[0].delta.content);
        }
      }
    } catch (e) {
      win.webContents.send("gpt-result", e);
    }
  });
  ipcMain.handle("open-folder", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });
    if (canceled) {
      return "";
    } else {
      return filePaths[0];
    }
  });
  ipcMain.handle("open-file", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ["openFile"],
      filters: [{ name: "MyMood 設定檔", extensions: ["mmconf"] }],
    });
    if (canceled) {
      return "";
    } else {
      return filePaths[0];
    }
  });

  ipcMain.on("close-window", () => {
    win.close();
  });
  ipcMain.on("maximize-window", () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.on("minimize-window", () => {
    win.minimize();
  });
  ipcMain.on("restart-app", () => {
    app.relaunch();
    app.quit();
  });
  ipcMain.on("create-backup", (e, destination) => {
    const archive = archiver("tar");
    const output = createWriteStream(
      destination + "/MyMoodExport_" + getDateNum(new Date()) + ".mmconf"
    );
    output.on("close", function () {
      win.webContents.send("export-completed");
    });
    archive.on("error", function (err) {
      throw err;
    });

    archive.pipe(output);
    archive.directory(dataPath, ".mymood_new");
    archive.finalize();
  });
  ipcMain.on("import-config", (e, fileName) => {
    tar.x(
      {
        f: fileName,
        C: path.join(dataPath, ".."),
      },
      [],
      (e) => {
        win.webContents.send("import-completed");
      }
    );
  });
};

// app.whenReady().then(() => {
//   createWindow();
// });

function checkFileExists(path, callback) {
  return fsPromise.access(path, fsPromise.constants.F_OK);
}

const dataPath = path.join(os.homedir(), ".mymood");

async function startApp() {
  console.log(path.join(dataPath, "..", ".mymood_new"));
  try {
    await checkFileExists(path.join(dataPath, "..", ".mymood_new"));
    console.log("new config exists!");
    await fsPromise.rm(dataPath, { recursive: true });
    await fsPromise.rename(
      path.join(dataPath, "..", ".mymood_new"),
      path.join(dataPath, "..", ".mymood")
    );
  } catch {
    // pass
  }

  try {
    await checkFileExists(path.join(dataPath, "theme.css"));
  } catch {
    try {
      await fsPromise.writeFile(
        path.join(dataPath, "theme.css"),
        `
        body, .bg {
          background-color: #ffffff;
        }
        `
      );
      startApp();
    } catch {
      startApp();
    }
  }
  try {
    await checkFileExists(path.join(dataPath, "petData.json"));
    petData = require(path.join(dataPath, "petData.json"));
  } catch {
    petData = {};
  }
  try {
    await checkFileExists(dataPath);
  } catch {
    try {
      await fsPromise.mkdir(dataPath);
      startApp();
    } catch {
      startApp();
    }
  }
  try {
    await checkFileExists(path.join(dataPath, "config.json"));
    config = require(path.join(dataPath, "config.json"));
  } catch {
    config = default_configs;
  }
  try {
    await checkFileExists(path.join(dataPath, "userdata.json"));
    userdata = require(path.join(dataPath, "userdata.json"));
  } catch {
    userdata = {};
  }
  try {
    await checkFileExists(path.join(dataPath, "missions.json"));
    missions = require(path.join(dataPath, "missions.json"));
  } catch {
    missions = {};
  }
  try {
    await checkFileExists(path.join(dataPath, "examinationData.json"));
    examinationData = require(path.join(dataPath, "examinationData.json"));
  } catch {
    examinationData = {};
  }

  await app.whenReady();
  createWindow();
}

ipcMain.handle("get-config", async () => {
  return config;
});
ipcMain.handle("get-userdata", async () => {
  return userdata;
});
ipcMain.handle("get-datapath", async () => {
  return dataPath;
});
ipcMain.handle("get-petdata", async () => {
  return petData;
});
ipcMain.handle("get-missions", async () => {
  return missions;
});
ipcMain.handle("get-examinationData", async () => {
  return examinationData;
});

ipcMain.on("write-file", (e, [path, data]) => {
  fsPromise.writeFile(path, data);
});

ipcMain.on("send-mail", async (e, [mail, realname, score]) => {
  const accountSid = config.twilio.accountSid;
  const authToken = config.twilio.authToken;
  const msgbody=`您好，用戶${realname}在 MyMood 心理測試中獲得 ${score}/24 分。精神壓力水平屬於高，建議關心該用戶近期情緒是否異常，並提供適當協助。`

  const client = require("twilio")(accountSid, authToken);
  client.messages
    .create({
      body:msgbody,
      messagingServiceSid: config.twilio.messagingServiceId,
      to: mail,
    })
    .then((message) => console.log(message.sid));
});

startApp();
