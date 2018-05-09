'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return {
        id: _faker2.default.random.uuid(),
        type: _transaction.TransactionTypes.CREDIT,
        amount: 50,
        effectiveDate: _faker2.default.date.recent()
    };
};

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _transaction = require('../models/transaction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }