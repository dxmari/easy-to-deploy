
import { ExpressServer } from '../src/express';

export default async (args: any) => {
    if (args.host) {
        process.env.HOST = args.host;
    }
    if (args.port) {
        process.env.PORT = args.port;
    }
    if (args.debug) {
        process.env.DEBUG = args.debug;
    }
    // await shell('node lib/index.js');
    ExpressServer.init();
}