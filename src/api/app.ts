import express from 'express';
import * as bodyParser from 'body-parser';
import { corsHandler } from '../config/cors';
import router from '../api/routes';
import admin from '../config/firebase';

console.log(admin);
const app = express();

app.use(corsHandler);
app.use(bodyParser.json());
app.use('/api', router);

export default app;
