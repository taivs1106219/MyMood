const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("node:os");
const fsPromise = require("node:fs/promises");
const default_configs = require("./default_configs");
const { mkdir } = require("fs");
let config;
let userdata;
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
      await fsPromise.writeFile(path.join(dataPath, "theme.css"), "");
      startApp();
    } catch {
      startApp;
    }
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
ipcMain.on("write-file", (e, [path, data]) => {
  fsPromise.writeFile(path, data);
});

startApp();
