const { app, BrowserWindow ,ipcMain} = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 768,
    height: 1024,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js")
      
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

app.whenReady().then(() => {
  createWindow();
});
