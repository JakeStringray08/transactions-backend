'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _transactionsHistory = require('../models/transactions-history');

var _transactionsHistory2 = _interopRequireDefault(_transactionsHistory);

var _transaction = require('../models/transaction');

var _transaction2 = _interopRequireDefault(_transaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransactionsService = function () {
    function TransactionsService() {
        var _this = this;

        _classCallCheck(this, TransactionsService);

        this.getTransactions = function (req, resp) {
            var all = _this.history.getAllTransactions();
            return resp.json(all);
        };

        this.getTransaction = function (req, resp) {
            var transactionId = req.params.transactionId;

            var transaction = _this.history.getTransactionById(transactionId);
            resp.json(transaction);
        };

        this.postTransaction = function (req, resp) {
            var newTransaction = new _transaction2.default(req.body);
            var added = _this.history.addTransaction(newTransaction);
            resp.status(201).json(added);
        };

        this.deleteTransaction = function (req, resp) {
            var transactionId = req.params.transactionId;


            _this.history.deleteTransactionById(transactionId);
            resp.status(200).end();
        };

        this.history = new _transactionsHistory2.default();
    }

    _createClass(TransactionsService, [{
        key: 'setupRoutes',
        value: function setupRoutes(router) {
            router.get('/', this.getTransactions);
            router.get('/:transactionId', this.getTransaction);
            router.post('/', this.postTransaction);
            router.delete('/:transactionId', this.deleteTransaction);
        }
    }]);

    return TransactionsService;
}();

exports.default = TransactionsService;