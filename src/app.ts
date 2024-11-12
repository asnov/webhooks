import { readFileSync } from 'fs';
import { createServer } from 'https';
import express from 'express';
import CrypoBotAPI from 'crypto-bot-api';
import 'dotenv/config';

const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY || '';
const webhookPath = process.env.WEBHOOK_PATH || '';

const app = express();
const client = new CrypoBotAPI(apiKey);


client.on('paid', (invoice, requestDate) => {
  console.log(requestDate, invoice);
});

app.use(`/${webhookPath}`, client.middleware());

// Note: if you want to use self-signed certificate
// you must uploat it in CryptoBot API application settings
createServer({
  key: readFileSync(__dirname + '/../../keys/privkey.pem'),
  cert: readFileSync(__dirname + '/../../keys/fullchain.pem')
}, app).listen(port);
