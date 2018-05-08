import express from 'express';
import bodyParser from 'body-parser';

import TransactionsController from './controllers/transactionsCtrl';

const app = express();
app.use(bodyParser.json());

const transactionsRouter = new express.Router();
const transactionsCtrl = new TransactionsController;
transactionsCtrl.setupRoutes(transactionsRouter);
app.use(`/api/transactions`, transactionsRouter);

app.use(function (err, req, res, next) {
    if (err.statusCode) {
        res.status(err.statusCode).send(err.message);
        return;
    }

    res.status(500).send('Server error')
});

export default app;