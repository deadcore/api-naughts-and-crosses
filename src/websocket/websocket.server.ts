import * as express from 'express';
import * as socketIo from 'socket.io';
import * as http from 'http';
import { Server } from '../server';

// Creates and configures an ExpressJS web server.
export default class WebsocketServer implements Server {

    public static readonly PORT = 8080;
    public app: any;
    private server: any;
    private io: SocketIO.Server;
    private port: number;

    constructor() {
        this.port = process.env.PORT || WebsocketServer.PORT;
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server);
    }

    public static bootstrap(): WebsocketServer {
        return new WebsocketServer();
    }

    start() {
        this.listen();
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m: any) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('register', (m: any) => {
                console.log('[server](register): %s', JSON.stringify(m));
                setTimeout(() => {
                    this.io.emit('open', [{name: 'Man'}, {name: 'Tan'}, {name: 'Lan'}, {name: 'Cran'}])
                }, 2000);
                this.io.emit('registered', m);
            });

            socket.on('rooms', (m: any) => {
                console.log('[server](rooms): %s', JSON.stringify(m));
                setTimeout(() => {
                    this.io.emit('open', [{name: 'Hi'}, {name: 'Die'}, {name: 'Ph'}, {name: 'Sky'}])
                }, 2000)
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

}