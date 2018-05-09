'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RefusedTransactionError = exports.TransactionNotFoundError = exports.InvalidIdError = exports.InvalidStatusError = exports.InvalidInputError = undefined;

var _object = require('../util/object');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function TransactionError() {
    // Use Error as a function
    var superInstance = Error.apply(null, arguments);
    (0, _object.copyOwnPropertiesFrom)(this, superInstance);
}
TransactionError.prototype = Object.create(Error.prototype);
TransactionError.prototype.constructor = TransactionError;

var InvalidInputError = exports.InvalidInputError = function (_TransactionError) {
    _inherits(InvalidInputError, _TransactionError);

    function InvalidInputError() {
        _classCallCheck(this, InvalidInputError);

        return _possibleConstructorReturn(this, (InvalidInputError.__proto__ || Object.getPrototypeOf(InvalidInputError)).apply(this, arguments));
    }

    return InvalidInputError;
}(TransactionError);

InvalidInputError.prototype.statusCode = 405;
InvalidInputError.prototype.message = 'Invalid input';

var InvalidStatusError = exports.InvalidStatusError = function (_TransactionError2) {
    _inherits(InvalidStatusError, _TransactionError2);

    function InvalidStatusError() {
        _classCallCheck(this, InvalidStatusError);

        return _possibleConstructorReturn(this, (InvalidStatusError.__proto__ || Object.getPrototypeOf(InvalidStatusError)).apply(this, arguments));
    }

    return InvalidStatusError;
}(TransactionError);

InvalidStatusError.prototype.statusCode = 400;
InvalidStatusError.prototype.message = 'Invalid status value';

var InvalidIdError = exports.InvalidIdError = function (_TransactionError3) {
    _inherits(InvalidIdError, _TransactionError3);

    function InvalidIdError() {
        _classCallCheck(this, InvalidIdError);

        return _possibleConstructorReturn(this, (InvalidIdError.__proto__ || Object.getPrototypeOf(InvalidIdError)).apply(this, arguments));
    }

    return InvalidIdError;
}(TransactionError);

InvalidIdError.prototype.statusCode = 400;
InvalidIdError.prototype.message = "Invalid ID supplied";

var TransactionNotFoundError = exports.TransactionNotFoundError = function (_TransactionError4) {
    _inherits(TransactionNotFoundError, _TransactionError4);

    function TransactionNotFoundError() {
        _classCallCheck(this, TransactionNotFoundError);

        return _possibleConstructorReturn(this, (TransactionNotFoundError.__proto__ || Object.getPrototypeOf(TransactionNotFoundError)).apply(this, arguments));
    }

    return TransactionNotFoundError;
}(TransactionError);

TransactionNotFoundError.prototype.statusCode = 404;
TransactionNotFoundError.prototype.message = "Transaction not found";

var RefusedTransactionError = exports.RefusedTransactionError = function (_TransactionError5) {
    _inherits(RefusedTransactionError, _TransactionError5);

    function RefusedTransactionError() {
        _classCallCheck(this, RefusedTransactionError);

        return _possibleConstructorReturn(this, (RefusedTransactionError.__proto__ || Object.getPrototypeOf(RefusedTransactionError)).apply(this, arguments));
    }

    return RefusedTransactionError;
}(TransactionError);

RefusedTransactionError.prototype.statusCode = 409;
RefusedTransactionError.prototype.message = "Transaction refused";