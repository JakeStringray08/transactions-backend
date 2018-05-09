import { expect } from 'chai';
import uuid from 'uuid/v1';
import Joi from "joi";
import Transaction, { TransactionTypes } from './transaction';
import { InvalidInputError } from "../errors/index";


describe('Transaction', function () {
    let transaction;

    beforeEach(function () {
        const data = {
            id: uuid(),
            type: TransactionTypes.DEBIT,
            amount: 200,
            effectiveDate: new Date().toISOString()
        };
        transaction = new Transaction(data);
    });

    it('should create a transaction instance', function () {
        expect(transaction).to.be.an.instanceOf(Transaction);
    });

    it('should have an id', function () {
        expect(transaction).to.have.property('id');
    });

    it('should have a type', function () {
        expect(transaction).to.have.property('type');
    });

    it('should have an amount', function () {
        expect(transaction).to.have.property('amount');
    });

    it('should have an effective date', function () {
        expect(transaction).to.have.property('effectiveDate');
    });

    it('should throw the InvalidInputError if invalid arguments given', function () {
        expect(() => new Transaction()).to.throw(InvalidInputError);
        expect(() => new Transaction({
            id: 'malformed_id', amount: 34, type: TransactionTypes.DEBIT, effectiveDate: new Date().toISOString()
        })).to.throw(InvalidInputError);
    });

    it('should be unreverted initially', function() {
        expect(transaction.reverted).to.be.false;
    })

    it('should be possible to revert the transation', function() {
        transaction.revert();
        expect(transaction.reverted).to.be.true;
    });

    it('should return negative effective amount if transaction is debit', function() {
        expect(transaction.getEffectiveAmount()).to.be.below(0);
    })

    it('should return positive effective amount if transaction is credit', function() {
        transaction._type = TransactionTypes.CREDIT;
        expect(transaction.getEffectiveAmount()).to.be.above(0);
    })

    it('should have only type and amount as required arguments', function() {
        expect(() => new Transaction({ type: TransactionTypes.CREDIT, amount: 2 }))
            .not.to.throw();
    })

    it('should auto-generate uuid id if not given', function() {
        const t = new Transaction({ type: TransactionTypes.CREDIT, amount: 2 });
        expect(Joi.string().uuid().validate(t.id).error).to.be.null;
    })

    it('should auto-generate effective date id if not given', function() {
        const t = new Transaction({ type: TransactionTypes.CREDIT, amount: 2 });
        expect(Joi.string().isoDate().validate(t.effectiveDate).error).to.be.null;
    })
});
