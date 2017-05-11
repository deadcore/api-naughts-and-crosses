import * as http from 'http';
import * as debug from 'debug';

import App from './app';

debug('ts-express:server');

new App().start();