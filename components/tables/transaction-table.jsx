'use client';

import classNames from 'classnames';
import globalStyle from '@/style/dashboard.module.scss';
import style from './style.module.scss';
import { Pagination } from '@ui/Pagination';
import { Button } from '@ui/Button';
import ArrowRight from '@icons/ArrowRight';
import { Field } from '@ui/Field';
import Search from '@icons/Search';
import CopyButton from '@/components/home/components/wallet/copy-button';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTransactions } from '@/external/core';
import { useGlobalState } from '@/components/home/components/state-provider';
import { transactionDate } from '@/lib/date.lib';
import { useRouter } from 'next/navigation';

const TransactionTable = () => {
    const { walletAddress } = useGlobalState();
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page');

    const RECORDS_PER_PAGE = 8;

    const getPage = () => {
        return page ? page : 1;
    };

    const formatAmount = (transaction) => {
        return `${transaction.to === walletAddress ? '+' : '-'}${transaction.amount.toLocaleString(
            'en-US',
            {
                maximumFractionDigits: 16,
            },
        )}`;
    };

    const formatAddress = (address) => {
        return `${address.substring(1, 11)}.....${address.substring(55)}`;
    };

    const getSenderRecipient = (transaction) => {
        return transaction.from === walletAddress ? transaction.to : transaction.from;
    };

    useEffect(() => {
        if (!walletAddress) return;
        if (walletAddress.length !== 66) return;
        if (search.length > 0 && search.length !== 64) {
            setTransactions([]);
            return;
        }

        const loadTransactions = async () => {
            const skip = (getPage() - 1) * RECORDS_PER_PAGE;
            if (skip < 0) return;

            const options = {
                limit: RECORDS_PER_PAGE,
                skip,
            };
            if (search.length === 64) options.hash = search;
            const { result, total } = await getTransactions(walletAddress, options);
            setTransactions(result);
            if (result.length === 0) {
                router.push('/history');
            }
            setTotal(total);
        };
        loadTransactions();
    }, [walletAddress, page, search]);

    return (
        <div className={classNames(globalStyle.section, style.list)}>
            <div className={style.head}>
                <div className={style.title}>Transactions List</div>
                <Field
                    className={style.search}
                    placeholder="Search by transaction"
                    Icon={Search}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className={style.table}>
                <div className={style.tableBody}>
                    <div className={style.tableColumn}>
                        <div className={style.tableHead}>
                            <div className={style.name}>Date & Time</div>
                        </div>

                        <div className={style.values}>
                            {transactions.map((transaction) => (
                                <div className={style.value} key={'date' + transaction.hash}>
                                    {transactionDate(transaction.timestamp)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.tableColumn}>
                        <div className={style.tableHead}>
                            <div className={style.name}>Sender/Recipient</div>
                        </div>

                        <div className={style.values}>
                            {transactions.map((transaction) => (
                                <div
                                    className={style.value}
                                    key={'sender_recipient' + transaction.hash}
                                >
                                    <span>{formatAddress(getSenderRecipient(transaction))}</span>
                                    <CopyButton
                                        value={getSenderRecipient(transaction)}
                                        className={style.copyButton}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.tableColumn}>
                        <div className={style.tableHead}>
                            <div className={style.name}>Amount</div>
                        </div>

                        <div className={style.values}>
                            {transactions.map((transaction) => (
                                <div className={style.value} key={'amount' + transaction.hash}>
                                    {formatAmount(transaction)} ONO
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={classNames(style.tableColumn, style.wAuto)}>
                        <div className={style.tableHead}>
                            <div className={style.name}>Details</div>
                        </div>
                        <div className={style.values}>
                            {transactions.map((transaction) => (
                                <div className={style.value} key={'button' + transaction.hash}>
                                    <Link
                                        href={`${process.env.CORE_URL}/transaction/by-hash/${transaction.hash}`}
                                        target="_blank"
                                    >
                                        <Button
                                            className={style.viewDetail}
                                            variant="secondary"
                                            icon={<ArrowRight />}
                                        >
                                            View details
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {!transactions.length ? (
                <div className={style.noTransactionContainer}>
                    <p>No transactions yet...</p>
                </div>
            ) : null}
            <Pagination
                className={style.pagination}
                page={getPage()}
                total={total}
                perPage={RECORDS_PER_PAGE}
            />
        </div>
    );
};

export default TransactionTable;
