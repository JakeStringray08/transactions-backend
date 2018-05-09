"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TransactionStatus = exports.TransactionTypes = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _v = require("uuid/v1");

var _v2 = _interopRequireDefault(_v);

var _errors = require("../errors");

var _assert = require("assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransactionTypes = exports.TransactionTypes = {
    CREDIT: 'credit',
    DEBIT: 'debit'
};

var TransactionStatus = exports.TransactionStatus = {
    ACTIVE: 'active',
    REVERTED: 'reverted'
};

var Transaction = function () {
    function Transaction(dataObj) {
        _classCallCheck(this, Transaction);

        this._validate(dataObj);

        this._id = dataObj.id || (0, _v2.default)();
        this._type = dataObj.type;
        this._amount = parseFloat(dataObj.amount);
        this._effectiveDate = dataObj.effectiveDate || new Date().toISOString();

        this._status = TransactionStatus.ACTIVE;
    }

    _createClass(Transaction, [{
        key: "_validate",
        value: function _validate(data) {
            var result = _joi2.default.validate(data, Transaction.validationSchema);
            if (result.error) {
                throw new _errors.InvalidInputError();
            }
        }
    }, {
        key: "getEffectiveAmount",
        value: function getEffectiveAmount() {
            var amount = this.type === TransactionTypes.DEBIT ? -this.amount : this.amount;

            return amount;
        }
    }, {
        key: "revert",
        value: function revert() {
            this._status = TransactionStatus.REVERTED;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new this.constructor({
                id: this.id,
                type: this.type,
                amount: this.amount,
                effectiveDate: this.effectiveDate
            });
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return {
                id: this.id,
                type: this.type,
                amount: this.amount,
                effectiveDate: this.effectiveDate
            };
        }
    }, {
        key: "id",
        get: function get() {
            return this._id;
        }
    }, {
        key: "amount",
        get: function get() {
            return this._amount;
        }
    }, {
        key: "type",
        get: function get() {
            return this._type;
        },
        set: function set(transactionType) {
            if ([TransactionTypes.CREDIT, TransactionTypes.DEBIT].indexOf(transactionType) === -1) {
                throw new _errors.InvalidInputError();
            }
            this._type = transactionType;
        }
    }, {
        key: "effectiveDate",
        get: function get() {
            return this._effectiveDate;
        }
    }, {
        key: "status",
        get: function get() {
            return this._status;
        }
    }, {
        key: "reverted",
        get: function get() {
            return this._status === TransactionStatus.REVERTED;;
        }
    }]);

    return Transaction;
}();

Transaction.idValidationSchema = _joi2.default.string().uuid();
Transaction.validationSchema = _joi2.default.object().keys({
    id: Transaction.idValidationSchema,
    type: _joi2.default.string().regex(new RegExp(TransactionTypes.CREDIT + "|" + TransactionTypes.DEBIT)).required(),
    amount: _joi2.default.number().required(),
    effectiveDate: _joi2.default.date().iso()
}).exist();
exports.default = Transaction;