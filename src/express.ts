import express from 'express';
import http from 'http';
import cors from 'cors';

import routes from './routes';
const app = express();

export class ExpressServer {
    static init() {
        // set the view engine to ejs
        app.set('view engine', 'ejs');


        /**
         * mount cors options for api routes
         */
        app.use('/', cors());

        /**
         * mount api routes
         */
        app.use('/', routes);


        // Server listneing
        let port: any = process.env.PORT || 8080;
        let host: any = process.env.HOST || 'localhost';
        return new Promise(resolve => {
            const Server = http.createServer(app);
            Server.listen(port, host, () => {
                console.log('listening on ' + host + ":" + port);
                resolve();
            });
        })
    }

}
