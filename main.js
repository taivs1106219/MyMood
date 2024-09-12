const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("node:os");
const fsPromise = require("node:fs/promises");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 768,
    height: 1024,
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

function startApp() {
  checkFileExists(path.join(os.homedir(), ".mymood"))
    .then(() => app.whenReady().then(() => createWindow()))
    .catch(() => {
      fsPromise
        .mkdir(path.join(os.homedir(), ".mymood"))
        .then(() => startApp())
        .catch(() => startApp());
    });
}

startApp();
