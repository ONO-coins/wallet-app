'use client';

import classNames from 'classnames';
import globalStyle from '@/style/dashboard.module.scss';
import style from './style.module.scss';
import { Field } from '@ui/Field';
import { Button } from '@ui/Button';

import { useGlobalState } from '../state-provider';
import { usePopup } from '../popups/popup-provider';
import { useState } from 'react';

import { calculateFee } from '@/lib/numbers.lib';
import { sendTransaction } from '@/internal/wallet';

const Transfer = () => {
    const { triggerPopup } = usePopup();
    const { balance, walletAddress } = useGlobalState();
    const [amount, setAmount] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');

    const fee = calculateFee(amount);
    const totalAmoun = Number(amount) + fee;

    const handleChangeAmount = (value) => {
        if (!value) setAmount('');
        if (isNaN(Number(value))) return;

        const percision = value.split('.')[1];
        if (percision && percision.length > 8) return;

        if (Number(value) + fee > balance) {
            setAmount(balance - fee);
            return;
        }

        setAmount(value);
    };

    const sendTransactionHandler = async () => {
        try {
            if (recipientAddress.length < 66) throw new Error('Wrong recipient address');
            if (!amount) throw new Error('Wrong amount');
            const response = await sendTransaction(walletAddress, recipientAddress, Number(amount));
            if (response.error) throw new error(response.error);
            triggerPopup('success', `${amount} ONO coins has been sended!`);
        } catch (error) {
            triggerPopup('error', error.message);
        }
    };

    return (
        <>
            <div className={classNames(globalStyle.section, style.transfer)}>
                <div className={style.head}>
                    <div className={style.title}>Transfer Form</div>
                    <div className={style.desc}>
                        Send ONO quickly and securely. Enter the address, amount, and confirm your
                        transaction.
                    </div>
                </div>

                <div className={style.form}>
                    <Field
                        className={style.field}
                        label="Recipient address"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                    <Field
                        className={style.field}
                        label="Amount in ONO*"
                        note={`Fee: ${fee.toLocaleString('en-US', {
                            maximumFractionDigits: 16,
                        })} ONO`}
                        value={amount}
                        onChange={(e) => handleChangeAmount(e.target.value)}
                    />

                    <div className={style.total}>
                        <div className={style.totalTitle}>Total</div>
                        <div className={style.totalValue}>
                            {amount
                                ? totalAmoun.toLocaleString('en-US', {
                                      maximumFractionDigits: 12,
                                  })
                                : ''}{' '}
                            ONO
                        </div>
                    </div>

                    <Button className={style.submit} onClick={sendTransactionHandler}>
                        Send
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Transfer;
