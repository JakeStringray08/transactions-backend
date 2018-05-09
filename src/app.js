import express from 'express';
import bodyParser from 'body-parser';

import TransactionsService from './services/transactions';

const app = express();
app.use(bodyParser.json());

app.get('/status', (req, resp) => {
    resp.end('I am alive');
});

const transactionsRouter = new express.Router();
const transactionsSrv = new TransactionsService();
transactionsSrv.setupRoutes(transactionsRouter);
app.use(`/api/transactions`, transactionsRouter);

app.use(function (err, req, res, next) {
    if (err.statusCode) {
        res.status(err.statusCode).end(err.message);
        return;
    }

    res.status(500).send('Server error: ' + err.message);
});

export default app;