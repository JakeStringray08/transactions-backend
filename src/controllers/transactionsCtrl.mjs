import TransactionsService from '../services/transactionsSrv';

const transactionsService = new TransactionsService();

export default class TransactionsController {
    setupRoutes(router) {
        router.get('/', (req, res) => {
            const all = transactionsService.getAllTransactions();
            res.status(200).json(all);
        });
        router.get('/:id', transactionsService.getTransactionById);
        router.post('/', transactionsService.addTransaction);
        router.delete('/:id', transactionsService.deleteTransactionById);
    }
}