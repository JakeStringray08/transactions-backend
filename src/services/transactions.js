import TransactionsHistory from '../models/transactions-history';
import Transaction from '../models/transaction';

export default class TransactionsService {
    constructor() {
        this.history = new TransactionsHistory();
    }

    getTransactions = (req, resp) => {
        const all = this.history.getAllTransactions();
        return resp.json(all);
    }

    getTransaction = (req, resp) => {
        const { transactionId } = req.params;    
        const transaction = this.history.getTransactionById(transactionId);
        resp.json(transaction);
    }

    postTransaction = (req, resp) => {
        const newTransaction = new Transaction(req.body);
        const added = this.history.addTransaction(newTransaction);
        resp.status(201).json(added);
    }

    deleteTransaction = (req, resp) => {
        const { transactionId } = req.params;

        this.history.deleteTransactionById(transactionId);
        resp.status(200).end();
    }

    setupRoutes(router) {
        router.get('/', this.getTransactions);
        router.get('/:transactionId', this.getTransaction);
        router.post('/', this.postTransaction);
        router.delete('/:transactionId', this.deleteTransaction);
    }
}