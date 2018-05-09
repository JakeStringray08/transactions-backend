import { expect } from 'chai';
import faker from 'faker';

import TransactionsHistory from './transactions-history';
import Transaction, { TransactionTypes, TransactionStatus } from './transaction';
import { RefusedTransactionError } from '../errors';

describe('TransactionsHistory', function() {
    let transactionsHistory;
    let transaction;

    beforeEach(function() {
        transactionsHistory = new TransactionsHistory();
        transaction = new Transaction({
            id: faker.random.uuid(),
            type: TransactionTypes.CREDIT,
            amount: 50,
            effectiveDate: faker.date.recent()
        });
    });

    it('should create TransactionsHistory instance', function() {
        expect(transactionsHistory).to.be.instanceof(TransactionsHistory);
    });

    it('should have zero transactions once created', function() {
        expect(transactionsHistory.getAllTransactions()).to.have.lengthOf(0);
    });

    it('should be possible to add a transaction', function() {
        transactionsHistory.addTransaction(transaction);

        expect(transactionsHistory.getTransactionAt(0)).to.be.equal(transaction);
        expect(transactionsHistory.length).to.be.equal(1);
    });

    it('should caclulate balance correctly', function() {
        transactionsHistory.addTransaction(transaction);

        const debitTransaction = new Transaction({
            id: faker.random.uuid(),
            type: TransactionTypes.DEBIT,
            amount: 20,
            effectiveDate: faker.date.recent()
        });

        transactionsHistory.addTransaction(debitTransaction);

        expect(transactionsHistory.getBalance()).to.be.equal(transaction.amount - debitTransaction.amount);
    });

    it('should throw the RefusedTransactionError if added transaction leads to negative balance', function() {
        transaction._type = TransactionTypes.DEBIT;
        expect(() => transactionsHistory.addTransaction(transaction)).to.throw(RefusedTransactionError);
    });

    it('should not delete transaction physically when deleted', function() {
        transactionsHistory.addTransaction(transaction);
        transactionsHistory.deleteTransactionById(transaction.id);

        expect(transactionsHistory.getTransactionAt(0)).to.be.equal(transaction);
    });

    it('should mark transaction as reverted when deleted', function() {
        transactionsHistory.addTransaction(transaction);
        transactionsHistory.deleteTransactionById(transaction.id);

        expect(transactionsHistory.getTransactionAt(0).status).to.be.equal(TransactionStatus.REVERTED);
    });

    it('shoud create a new transaction that revertes deleted one', function() {
        transactionsHistory.addTransaction(transaction);
        transactionsHistory.deleteTransactionById(transaction.id);

        expect(transactionsHistory.length).to.be.equal(2);
        expect(transactionsHistory.getBalance()).to.be.equal(0);
    });

    it('shoud not be possible to delete transaction more than one time', function() {
        transactionsHistory.addTransaction(transaction);
        transactionsHistory.deleteTransactionById(transaction.id);

        expect(() => transactionsHistory.deleteTransactionById(transaction.id)).to.throw(RefusedTransactionError);
    })
});