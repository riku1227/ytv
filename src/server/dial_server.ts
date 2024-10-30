import { App, Server } from "peer-dial";
import express, { Express } from "express";
import { MainWindow } from "../render/main_window";
import { AddressInfo } from "net";

export class DialServer {
    private server: Server | null = null;
    private express: Express = express();
    private app: App;

    constructor () {
        this.app = {
            name: "YouTube",
            state: "stopped",
            allowStop: true,
            pid: "",
            launch: (launchData: string) => {
                MainWindow.getInstance().launchFromDial(launchData);
            },
        }

        let expressServer = this.express.listen(0, () => {
            const address = expressServer.address() as AddressInfo;

            this.server = new Server({
                expressApp: this.express,
                manufacturer: "YouTube",
                modelName: "YouTube TV",
                port: address.port,
                prefix: "/dial",
                corsAllowOrigins: "*",
                delegate: {
                    getApp: () => this.app,
    
                    launchApp: (appName, launchData, callback) => {
                        return this.onLaunchApp(appName, launchData, callback);
                    },
    
                    stopApp: (app) => {},
                }
            });

            console.log("Dial server started on port 15687");
            this.server.start();
        });
    }

    onLaunchApp(appName: string, launchData: string, callback: (data: string) => void) {
        this.app.pid = 'run';
        this.app.state = 'running';
        this.app.launch(launchData);

        callback(this.app.pid);
    }
}