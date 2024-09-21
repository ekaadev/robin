import Hapi from '@hapi/hapi';
import {routers} from "./routes.js";

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    server.route(routers);

    await server.start();
}

init().then(() => {
   console.log('Server started in http://localhost:3000');
});