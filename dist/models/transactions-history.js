"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _transaction = require("./transaction.js");

var _transaction2 = _interopRequireDefault(_transaction);

var _errors = require("../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransactionsHistory = function () {
    function TransactionsHistory() {
        _classCallCheck(this, TransactionsHistory);

        this._history = [];
    }

    _createClass(TransactionsHistory, [{
        key: "getAllTransactions",
        value: function getAllTransactions() {
            return this._history;
        }
    }, {
        key: "addTransaction",
        value: function addTransaction(newTransaction) {
            this._checkTransaction(newTransaction);
            this._history.push(newTransaction);
            return newTransaction;
        }
    }, {
        key: "getTransactionById",
        value: function getTransactionById(transactionId) {
            if (_transaction2.default.idValidationSchema.validate(transactionId).error) {
                throw new InvalidIdError();
            }

            var transaction = this._history.find(function (transaction) {
                return transaction.id === transactionId;
            });

            if (!transaction) {
                throw new _errors.TransactionNotFoundError();
            };

            return transaction;
        }
    }, {
        key: "getTransactionIndexById",
        value: function getTransactionIndexById(transactionId) {
            if (_transaction2.default.idValidationSchema.validate(transactionId).error) {
                throw new InvalidIdError();
            }

            var transactionIdx = this._history.findIndex(function (transaction) {
                return transaction.id === transactionId;
            });

            if (!transactionIdx === -1) {
                throw new _errors.TransactionNotFoundError();
            };

            return transactionIdx;
        }
    }, {
        key: "getTransactionAt",
        value: function getTransactionAt(index) {
            return this._history[index];
        }
    }, {
        key: "deleteTransactionById",
        value: function deleteTransactionById(transactionId) {
            var deleteIndex = this.getTransactionIndexById(transactionId);
            return this.deleteTransactionAt(deleteIndex);
        }
    }, {
        key: "deleteTransactionAt",
        value: function deleteTransactionAt(index) {
            var toDelete = this._history[index];
            if (toDelete.status === _transaction.TransactionStatus.REVERTED) {
                throw new _errors.RefusedTransactionError();
            }

            this._history[index].revert();
            var newTransaction = toDelete.clone();
            newTransaction.type = toDelete.type === _transaction.TransactionTypes.DEBIT ? _transaction.TransactionTypes.CREDIT : _transaction.TransactionTypes.DEBIT;
            this._history.push(newTransaction);
            return toDelete;
        }
    }, {
        key: "getBalance",
        value: function getBalance() {
            return this._history.reduce(function (acc, transaction) {
                return acc + transaction.getEffectiveAmount();
            }, TransactionsHistory.INITIAL_BALANCE);
        }
    }, {
        key: "_checkTransaction",
        value: function _checkTransaction(transaction) {
            var balance = this.getBalance();
            var balanceAfterTransaction = balance + transaction.getEffectiveAmount();

            var alreadyExist = void 0;
            try {
                alreadyExist = this.getTransactionById(transaction.id);
            } catch (err) {
                if (!(err instanceof _errors.TransactionNotFoundError)) {
                    throw err;
                }
            }

            if (balanceAfterTransaction < 0 || alreadyExist) {
                throw new _errors.RefusedTransactionError();
            }
        }
    }, {
        key: "length",
        get: function get() {
            return this._history.length;
        }
    }]);

    return TransactionsHistory;
}();

exports.default = TransactionsHistory;


TransactionsHistory.INITIAL_BALANCE = 0;