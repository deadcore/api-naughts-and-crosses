import * as express from 'express';

// Creates and configures an ExpressJS web server.
class HttpServer {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.routes();
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (request, response, next) => {
            response.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
    }

}

export default new HttpServer().express;