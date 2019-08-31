const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow(){
    const options = {
        width: 500,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        }
    };

    mainWindow = new BrowserWindow(options);
    // デバッグかどうか判断してURLを分ける
    // デバッグ中: ローカルサーバーを読み込む
    // アプリケーション: ビルドされたHTMLを読み込む
    mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});
app.on("activate", () => {
    if(mainWindow == null){
        createWindow();
    }
})