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
InvalidInputError.prototype.message = 'Invalid input';

export class InvalidStatusError extends TransactionError {}
InvalidStatusError.prototype.statusCode = 400;
InvalidStatusError.prototype.message = 'Invalid status value';

export class InvalidIdError extends TransactionError {}
InvalidIdError.prototype.statusCode = 400;
InvalidIdError.prototype.message = "Invalid ID supplied";

export class TransactionNotFoundError extends TransactionError {}
TransactionNotFoundError.prototype.statusCode = 404;
TransactionNotFoundError.prototype.message = "Transaction not found";

export class RefusedTransactionError extends TransactionError {}
RefusedTransactionError.prototype.statusCode = 409;
RefusedTransactionError.prototype.message = "Transaction refused";