import { WebContents } from "electron";
import fs from "fs";
import { join } from "path";

export class AutoSkipAds {
    static async injectScript(webContents: WebContents) {
        const data = fs.readFileSync(join(__dirname, "_injection_script.js"), "utf-8");
        webContents.executeJavaScript(data);
    }
}