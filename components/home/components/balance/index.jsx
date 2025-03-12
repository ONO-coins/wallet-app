'use client';

import { useEffect } from 'react';
import classNames from 'classnames';
import globalStyle from '@/style/dashboard.module.scss';
import style from './style.module.scss';
import { Button } from '@ui/Button';

import CommandIcon from '@icons/Command';
import LogOut from '@icons/LogOut';

import { getBalance } from '@/external/core';
import { useGlobalState } from '../state-provider';

const Balance = () => {
    const { balance, setBalance, walletAddress } = useGlobalState();

    useEffect(() => {
        if (!walletAddress) return;

        const loadBalance = async () => {
            const balanceRecord = await getBalance(walletAddress);
            if (!balanceRecord) {
                setBalance(0);
                return;
            }
            setBalance(Number(balanceRecord.balance));
        };

        loadBalance();
    }, [walletAddress]);

    return (
        <div className={classNames(globalStyle.section, style.balance)}>
            <div className={style.head}>
                <div className={style.title}>Address Balance</div>
                <CommandIcon className={style.commandIcon} />
            </div>

            <div className={style.bottom}>
                <div className={style.subtitle}>Current balance</div>

                <div className={style.bottomRow}>
                    <span className={style.value}>
                        {balance.toLocaleString('en-US', {
                            maximumFractionDigits: 16,
                        })}{' '}
                        ONO
                    </span>
                    {/* <span className={style.subValue}>~$12,345.67</span> */}
                </div>

                {/* <Button className={style.button} icon={<LogOut />} iconPosition="left">
                    Withdraw
                </Button> */}
            </div>
        </div>
    );
};

export default Balance;
