const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("node:os");
const fsPromise = require("node:fs/promises");
const default_configs = require("./default_configs");
let config;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 480,
    height: 720,
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
  // checkFileExists(path.join(os.homedir(), ".mymood"))
  //   .then(() => app.whenReady().then(() => createWindow()))
  //   .catch(() => {
  //     fsPromise
  //       .mkdir(path.join(os.homedir(), ".mymood"))
  //       .then(() => startApp())
  //       .catch(() => startApp());
  //   });
  try {
    await checkFileExists(dataPath);
  } catch {
    await fsPromise
      .mkdir(dataPath)
      .then(() => startApp())
      .catch(() => startApp());
  }
  try {
    await checkFileExists(path.join(dataPath, "config.json"));
    config = require(path.join(dataPath, "config.json"));
  } catch {
    config = default_configs;
  }
  await app.whenReady();
  createWindow();
}

ipcMain.handle("get-config", async () => {
  return config;
});
ipcMain.handle("get-datapath", async () => {
  return dataPath;
});
ipcMain.on("write-file", (e, [path, data]) => {
 
    
    fsPromise.writeFile(path,data)
  
  
});

startApp();
