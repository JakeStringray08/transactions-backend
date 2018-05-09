import express from 'express';
import bodyParser from 'body-parser';

import TransactionsService from './services/transactions';

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));

export default app;
