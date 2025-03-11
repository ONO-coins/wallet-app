'use client';

import { Popup } from '@ui/Popup';
import { Typography } from '@ui/Typography';
import style from './style.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CopyButton from '../../wallet/copy-button';

const PopupTransaction = ({ ...props }) => {
    const { amount, paymentAddress, isOpen } = props;
    const [minutes, setMinutes] = useState(15);
    const [seconds, setSeconds] = useState(0);

    const formatTime = (value) => {
        return value < 10 ? '0' + value : value;
    };

    const getTime = (deadline) => {
        const time = deadline - Date.now();
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
        return time;
    };

    useEffect(() => {
        if (!isOpen) return;

        const deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + 15);
        setMinutes(14);
        setSeconds(59);

        const interval = setInterval(() => {
            const time = getTime(deadline);
            if (time <= 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <Popup {...props}>
            <div className={style.popupInfo}>
                <Typography variant="h5" tag="p">
                    Transaction confirmation
                </Typography>
                <p className={style.popupDesc}>
                    Transfer{' '}
                    <Link href="https://ton.org/" target="_blank" className={style.link}>
                        TON
                    </Link>{' '}
                    coins to the provided address to receive your ONO coins. Your coins will be
                    credited automatically upon receipt.
                </p>
            </div>
            <div className={style.row}>
                <div className={style.col}>
                    <Typography className={style.popupTitle} variant="text-small" tag="p">
                        TON Payment address:
                    </Typography>
                    <Typography
                        className={classNames(style.popupValue, style.popupCode)}
                        variant="btn"
                        tag="p"
                    >
                        {paymentAddress}
                    </Typography>
                </div>

                <div className={style.col}>
                    <CopyButton value={paymentAddress} />
                </div>
            </div>
            <div className={style.row}>
                <div className={style.col}>
                    <Typography className={style.popupTitle} variant="text-small" tag="p">
                        Amount to be paid:
                    </Typography>
                    <div className={style.amount}>
                        <Typography className={style.popupValue} variant="btn" tag="p">
                            {amount} TON
                        </Typography>
                    </div>
                </div>
            </div>
            <div className={style.row}>
                <div className={style.col}>
                    <Typography className={style.popupTitle} variant="text-small" tag="p">
                        Time left to pay:
                    </Typography>
                    <Typography className={style.popupValue} variant="btn" tag="p">
                        00:{formatTime(minutes)}:{formatTime(seconds)}
                    </Typography>
                </div>
            </div>
        </Popup>
    );
};

export default PopupTransaction;
