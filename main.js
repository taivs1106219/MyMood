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
  ipcMain.handle("open-folder", async (data) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
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
  });ipcMain.on("create-backup", (e, destination) => {
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
    archive.directory(dataPath, ".mymood");
    archive.finalize();
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

startApp();
