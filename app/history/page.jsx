import TransactionTable from '@/components/tables/transaction-table';
import { Suspense } from 'react';

export const metadata = {
    title: 'ONO Wallet - Transaction history',
};

const HistoryPage = () => {
    return (
        <Suspense>
            <TransactionTable />
        </Suspense>
    );
};

export default HistoryPage;
