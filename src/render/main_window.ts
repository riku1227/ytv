import { app, BrowserWindow } from 'electron';

export class MainWindow {

    public static instance: MainWindow;

    private window: BrowserWindow | null = null;

    private readonly baseUrl: string = "https://youtube.com/tv?";

    constructor() {
        app.on('ready', () => {
            this.createWindow();
        });

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') app.quit();
        });

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) this.createWindow();
        });
    }

    static getInstance() {
        if (!MainWindow.instance) {
            MainWindow.instance = new MainWindow();
        }
        return MainWindow.instance;
    }

    private createWindow() {
        this.window = new BrowserWindow({
            width: 1920,
            height: 1080,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
        });
        
        this.window.webContents.setUserAgent("Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.77 Large Screen Safari/534.24 GoogleTV/092754");
        this.window.loadURL(this.baseUrl);
    }

    launchFromDial(launchData: string) {
        if (!this.window) {
            return;
        }
        this.window.webContents.loadURL(`${this.baseUrl}${launchData}`);
    }
}