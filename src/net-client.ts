import net from 'net'
import prompts from '../utils/prompts';
import ManipulateJson from '../utils/manipulate-json';

// const domain = "13.235.136.94"
const domain = "0.0.0.0"
const Socket = new net.Socket();

class NetClient {
    connect() {
        return new Promise(resolve => {
            let netPort = 61337;
            Socket.connect(netPort, domain, function () {
                resolve();
                console.log("Client: Connected to server on " + netPort);
            });

            // Let's handle the response we get from the server
            Socket.on("data", function (resp: any) {
                resp = JSON.parse(resp);
                new NetClient().onListner(resp.type, resp.data);
            });

        })
    }

    async onListner(type: string, data: any) {
        if (type === 'AppList') {
            //@ts-ignore
            let config = ManipulateJson
                .path('./config.json')
                .get();
            if (!config) {
                let appInfo = await prompts.chooseApp(data);
                data.forEach((val: any) => {
                    if (appInfo.default && val.value === appInfo.applicationID) {
                        //@ts-ignore
                        ManipulateJson
                            .path('./config.json')
                            .set('name', val.title)
                            .set('pid', appInfo.applicationID)
                            .save();
                        config = {
                            name: val.title,
                            pid: appInfo.applicationID
                        }
                    }
                })
                console.log('app-info', config);
            }
            this.sendMsgToServer({
                type: 'deploy',
                data: config
            });
        } else if (type === 'scriptResponse') {
            console.log(data);
        } else if (type === 'success') {
            console.log(data);
            Socket.end();
        } else if (type === 'error') {
            console.log(`
                Deployment failed:
                Reason : ${data}
            `);
            Socket.end();
        } else {
            console.log(data);
        }
    }

    sendMsgToServer(msg: any) {
        Socket.write(JSON.stringify(msg));
    }
}

export default new NetClient();