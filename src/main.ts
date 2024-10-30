import { DialServer } from "./server/dial_server";
import { MainWindow } from "./render/main_window";

const {app, BrowserWindow} = require('electron');

console.log('ウィンドウを作成しました'); 

const mainWindow = MainWindow.getInstance();
const dialServer = new DialServer();