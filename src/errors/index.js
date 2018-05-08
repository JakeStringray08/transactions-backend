import { copyOwnPropertiesFrom } from '../util/object';

function TransactionError() {
    // Use Error as a function
    var superInstance = Error.apply(null, arguments);
    copyOwnPropertiesFrom(this, superInstance);
}
TransactionError.prototype = Object.create(Error.prototype);
TransactionError.prototype.constructor = TransactionError;

export class InvalidInputError extends TransactionError {}
InvalidInputError.prototype.statusCode = 405;

export class InvalidStatusError extends TransactionError {}
InvalidStatusError.prototype.statusCode = 400;

export class InvalidIdError extends TransactionError {}
InvalidStatusError.prototype.statusCode = 400;

export class TransactionNotFoundError extends TransactionError {}
InvalidStatusError.prototype.statusCode = 404;

export class RefusedTransactionError extends TransactionError {}
InvalidStatusError.prototype.statusCode = 409;
