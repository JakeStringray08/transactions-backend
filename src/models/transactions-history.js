import Transaction, { TransactionTypes, TransactionStatus } from "./transaction.js";
import { RefusedTransactionError, TransactionNotFoundError } from "../errors"

export default class TransactionsHistory {

    constructor() {
        this._history = [];  
    }

    get length() {
        return this._history.length;
    }
    
    getAllTransactions() {
        return this._history;
    }

    addTransaction(newTransaction) {
        this._checkTransaction(newTransaction);
        this._history.push(newTransaction);
        return newTransaction;
    }

    getTransactionById(transactionId) {
        if (Transaction.idValidationSchema.validate(transactionId).error) {
            throw new InvalidIdError();
        }

        const transaction = this._history.find((transaction) => {
            return transaction.id === transactionId;
        });

        if (!transaction) {
            throw new TransactionNotFoundError();
        };

        return transaction;
    }

    getTransactionIndexById(transactionId) {
        if (Transaction.idValidationSchema.validate(transactionId).error) {
            throw new InvalidIdError();
        }

        const transactionIdx = this._history.findIndex((transaction) => {
            return transaction.id === transactionId;
        });

        if (!transactionIdx === -1) {
            throw new TransactionNotFoundError();
        };

        return transactionIdx;
    }

    getTransactionAt(index) {
        return this._history[index];
    }

    deleteTransactionById(transactionId) {
        const deleteIndex = this.getTransactionIndexById(transactionId);
        return this.deleteTransactionAt(deleteIndex);
    }

    deleteTransactionAt(index) {
        const toDelete = this._history[index];
        if (toDelete.status === TransactionStatus.REVERTED) {
            throw new RefusedTransactionError();
        }

        this._history[index].revert();
        const newTransaction = toDelete.clone();
        newTransaction.type = toDelete.type === TransactionTypes.DEBIT
            ? TransactionTypes.CREDIT : TransactionTypes.DEBIT;
        this._history.push(newTransaction);
        return toDelete;
    }

    getBalance() {
        return this._history
            .reduce((acc, transaction) => {
                return acc + transaction.getEffectiveAmount();
            }, TransactionsHistory.INITIAL_BALANCE);
    }

    _checkTransaction(transaction) {
        const balance = this.getBalance();
        const balanceAfterTransaction = balance + transaction.getEffectiveAmount();


        let alreadyExist;
        try {
            alreadyExist = this.getTransactionById(transaction.id);
        } catch(err) {
            if (!(err instanceof TransactionNotFoundError)) {
                throw err;
            }
        }

        if (balanceAfterTransaction < 0 || alreadyExist) {
            throw new RefusedTransactionError();
        }
    }
}

TransactionsHistory.INITIAL_BALANCE = 0;