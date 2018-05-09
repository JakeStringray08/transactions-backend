'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _transactions = require('./services/transactions');

var _transactions2 = _interopRequireDefault(_transactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/status', function (req, resp) {
    resp.end('I am alive');
});

var transactionsRouter = new _express2.default.Router();
var transactionsSrv = new _transactions2.default();
transactionsSrv.setupRoutes(transactionsRouter);
app.use('/api/transactions', transactionsRouter);

app.use(function (err, req, res, next) {
    if (err.statusCode) {
        res.status(err.statusCode).end(err.message);
        return;
    }

    res.status(500).send('Server error: ' + err.message);
});

var port = process.env.PORT || 3002;
app.listen(port, function () {
    return console.log('App listening on port ' + port + '!');
});

exports.default = app;