'use client';

import classNames from 'classnames';
import globalStyle from '@/style/dashboard.module.scss';
import style from './style.module.scss';
import { Button } from '@ui/Button';
import { transactionDate } from '@/lib/date.lib';

import ArrowLeft from '@/components/icons/ArrowLeftFull';
import ArrowRight from '@/components/icons/ArrowRightFull';

import { getTransactions } from '@/external/core';
import { useGlobalState } from '../state-provider';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Transactions = () => {
    const { walletAddress } = useGlobalState();
    const [transactions, setTransactions] = useState([]);
    const [tab, setTab] = useState('all');

    const LOAD_COUNT = 5;

    const isDebit = (transaction) => {
        return transaction.to === walletAddress;
    };

    const getTabClass = (tabName) => {
        return tabName === tab ? classNames(style.tab, style.active) : style.tab;
    };

    const getDirection = (currentTab) => {
        switch (currentTab) {
            case 'sent':
                return 'from';
            case 'received':
                return 'to';
            default:
                return undefined;
        }
    };

    useEffect(() => {
        if (!walletAddress) return;
        if (walletAddress.length !== 66) return;

        const loadTransactions = async () => {
            const direction = getDirection(tab);
            const options = { limit: LOAD_COUNT };
            if (direction) options.direction = direction;
            const { result } = await getTransactions(walletAddress, options);
            setTransactions(result);
        };
        loadTransactions();
    }, [walletAddress, tab]);

    return (
        <div className={classNames(globalStyle.section, style.transactions)}>
            <div className={style.head}>
                <div className={style.title}>Transactions</div>
                <div className={style.tabs}>
                    <div className={getTabClass('all')} onClick={() => setTab('all')}>
                        All
                    </div>
                    <div className={getTabClass('sent')} onClick={() => setTab('sent')}>
                        Sent
                    </div>
                    <div className={getTabClass('received')} onClick={() => setTab('received')}>
                        Received
                    </div>
                </div>
            </div>

            <div className={style.listContainer}>
                {transactions.length ? (
                    <ul className={style.list}>
                        {transactions.map((transaction) => (
                            <li className={style.item} key={transaction.hash}>
                                <div className={style.itemLeft}>
                                    <div className={style.itemTime}>
                                        {transactionDate(transaction.timestamp)}
                                    </div>
                                    <div className={style.itemKey}>{transaction.hash}</div>
                                </div>
                                <div
                                    className={classNames(
                                        style.direction,
                                        isDebit(transaction) ? style.grow : style.fall,
                                    )}
                                >
                                    {isDebit(transaction) ? <ArrowLeft /> : <ArrowRight />}
                                    <span className={style.directionValue}>
                                        {isDebit(transaction) ? '+' : '-'}
                                        {transaction.amount.toLocaleString('en-US', {
                                            maximumFractionDigits: 16,
                                        })}{' '}
                                        ONO
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className={style.centered}>
                        <p>No transactions yet.</p>
                    </div>
                )}

                {transactions.length < LOAD_COUNT ? null : (
                    <Link href="/history">
                        <Button variant="secondary" className={style.button}>
                            <span className={style.pcValue}>View more</span>
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Transactions;
