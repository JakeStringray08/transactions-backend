import faker from 'faker';
import { TransactionTypes } from '../models/transaction'

export default function() {
    return {
        id: faker.random.uuid(),
        type: TransactionTypes.CREDIT,
        amount: 50,
        effectiveDate: faker.date.recent()
    }
}