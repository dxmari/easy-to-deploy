
import { ExpressServer } from '../src/express';
import NetClient from '../src/net-client';

export default async (args: any) => {
    await NetClient.connect();
    // await ExpressServer.init();
}