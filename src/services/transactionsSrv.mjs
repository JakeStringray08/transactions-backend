import { TransactionTypes } from "../models/transactionModel.mjs";
import {RefusedTransactionError, TransactionNotFoundError} from "../errors"

export default class TransactionsService {

    constructor() {
        this._history = [];  
    }
    
    getAllTransactions() {
        return this._history;
    }

    addTransaction(newTransaction) {
        this._checkTransaction(newTransaction);
        this._history.push(newTransaction);
    }

    getTransactionById(transactionId) {
        return this._history.find((transaction) => {
            return transaction.id === transactionId;
        })
    }

    getTransactionAt(index) {
        return this._history[index];
    }

    deleteTransactionById(transactionId) {
        const deleteIndex = this._history.findIndex((transaction) => {
            return transaction.id === transactionId;
        });

        if (deleteIndex === -1) {
            throw new TransactionNotFoundError();
        }

        this.deleteTransactionAt(deleteIndex);
    }

    deleteTransactionAt(index) {
        this._history.splice(index, 1);
    }

    getBalance() {
        return this._history
            .reduce((acc, transaction) => {
                return acc + transaction.getEffectiveAmount();
            }, TransactionsService.INITIAL_BALANCE);
    }

    _checkTransaction(transaction) {
        const balance = this.getBalance();
        const balanceAfterTransaction = balance + transaction.getEffectiveAmount();

        if (balanceAfterTransaction < 0) {
            throw new RefusedTransactionError();
        }
    }
}

TransactionsService.INITIAL_BALANCE = 0;