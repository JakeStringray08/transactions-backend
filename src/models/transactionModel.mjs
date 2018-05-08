import Joi from "joi";
import { InvalidInputError } from "../errors/index";

export const TransactionTypes = {
    CREDIT: 'credit',
    DEBIT: 'debit'
};

export default class Transaction {

    constructor(dataObj) {
        this._validate(dataObj);
        this._id = dataObj.id;
        this._type = dataObj.type;
        this._amount = dataObj.amount;
        this._isReverted = false;
        this._effectiveDate = dataObj.effectiveDate;
    }

    _validate(data) {
        const result = Joi.validate(data, Transaction.validationSchema);
        if (result.error) {
            throw new InvalidInputError();
        }
    }

    getType() {
        return this._type;
    }

    getAmount() {
        return this._amount;
    }

    getEffectiveDate() {
        return this.effectiveDate;
    }

    isReverted() {
        return this._isReverted;
    }

    getEffectiveAmount() {
        let amount = this.getType === TransactionTypes.DEBIT ?
            -this.getAmount() : this.getAmount();

        return amount;
    }

    revert() {
        this._isReverted = true;
    }
}

Transaction.validationSchema = Joi.object().keys({
    id: Joi.string().uuid(),
    type: [TransactionTypes.CREDIT, TransactionTypes.DEBIT],
    amount: Joi.number(),
    effectiveData: Joi.date().iso()
});