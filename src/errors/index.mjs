import { copyOwnPropertiesFrom } from '../util/object';

// transaction errors

function createError(statusCode, message) {
    function e() {
        const superInstance = Error.call(null, message);
        copyOwnPropertiesFrom(this, superInstance);
    }

    e.prototype = Object.create(Error.prototype);
    e.prototype.constructor = e;
    
    e.prototype.statusCode = statusCode;
    return e;
}

export const InvalidStatusError = createError(400, 'Invalid status value');
export const InvalidInputError = createError(405, 'Invalid input');
export const InvalidIdError = createError(400, 'Invalid ID supplied');
export const TransactionNotFoundError = createError(404, 'Transaction not found');
export const RefusedTransactionError = createError(409, 'Transaction was refused due to negative amount')