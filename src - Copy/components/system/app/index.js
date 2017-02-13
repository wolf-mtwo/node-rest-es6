import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

module.exports = app;
