import Joi from "joi";
import uuid from 'uuid/v1';
import { InvalidInputError } from "../errors";
import { throws } from "assert";


export const TransactionTypes = {
    CREDIT: 'credit',
    DEBIT: 'debit'
};

export const TransactionStatus = {
    ACTIVE: 'active',
    REVERTED: 'reverted'
}

export default class Transaction {

    static idValidationSchema = Joi.string().uuid();

    static validationSchema = Joi.object().keys({
        id: Transaction.idValidationSchema,
        type: Joi.string().regex(new RegExp(`${TransactionTypes.CREDIT}|${TransactionTypes.DEBIT}`)).required(),
        amount: Joi.number().required(),
        effectiveDate: Joi.date().iso()
    }).exist();

    constructor(dataObj) {
        this._validate(dataObj);

        this._id = dataObj.id || uuid();
        this._type = dataObj.type;
        this._amount = parseFloat(dataObj.amount);
        this._effectiveDate = dataObj.effectiveDate || new Date().toISOString();

        this._status = TransactionStatus.ACTIVE;
    }

    _validate(data) {
        const result = Joi.validate(data, Transaction.validationSchema);
        if (result.error) {
            throw new InvalidInputError();
        }
    }

    get id() {
        return this._id;
    }

    get amount() {
        return this._amount;
    }

    get type() {
        return this._type;
    }

    set type(transactionType) {
        if ([TransactionTypes.CREDIT, TransactionTypes.DEBIT].indexOf(transactionType) === -1) {
            throw new InvalidInputError();
        }
        this._type = transactionType;
    }

    get effectiveDate() {
        return this._effectiveDate;
    }

    get status() {
        return this._status;
    }

    get reverted() {
        return this._status === TransactionStatus.REVERTED;;
    }

    getEffectiveAmount() {
        let amount = this.type === TransactionTypes.DEBIT ?
            -this.amount : this.amount;

        return amount;
    }

    revert() {
        this._status = TransactionStatus.REVERTED;
    }

    clone() {
        return new this.constructor({
            id: this.id,
            type: this.type,
            amount: this.amount,
            effectiveDate: this.effectiveDate
        });
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            amount: this.amount,
            effectiveDate: this.effectiveDate
        }
    }
}