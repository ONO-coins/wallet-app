'use client';

import Image from 'next/image';
import classNames from 'classnames';
import style from './style.module.scss';
import globalStyle from '@/style/dashboard.module.scss';
import Popup from './popup-transaction';
import cardIcon from './img/card-coin.svg';
import { usePopup } from '../popups/popup-provider';
import { Typography } from '@ui/Typography';
import { Button } from '@ui/Button';
import { Field } from '@ui/Field';
import { useState } from 'react';
import { purchase } from '@/external/purchase';

const Get = () => {
    const { triggerPopup } = usePopup();
    const [popupOpen, setPopupOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [paymentAddress, setPaymentAddress] = useState('');

    const tonAmount = amount
        ? (amount * 0.1).toLocaleString('en-US', {
              maximumFractionDigits: 12,
          })
        : '0.10';

    function openPopup() {
        setPopupOpen(true);
    }

    function closePopup() {
        setPopupOpen(false);
    }

    function setOnoValue(value) {
        if (!value) setAmount('');
        if (isNaN(Number(value))) return;

        const percision = value.split('.')[1];
        if (percision && percision.length > 8) return;

        if (Number(value) > 1_000_000) {
            setAmount(1_000_000);
            return;
        }
        setAmount(value);
    }

    const buyHandler = async () => {
        try {
            if (recipientAddress.length < 66) throw new Error('Wrong recipient address');
            if (!amount) throw new Error('Wrong amount');
            if (amount < 1) throw new Error('Minimal purchase is 1 ONO');
            const response = await purchase(recipientAddress, Number(amount));
            setPaymentAddress(response.address);
            openPopup();
        } catch (error) {
            triggerPopup('error', error.message);
        }
    };

    return (
        <>
            <div className={classNames(globalStyle.section, style.get)}>
                <div className={style.cardTitle}>
                    <Image
                        className={style.icon}
                        src={cardIcon}
                        alt="card"
                        width={52}
                        height={52}
                    />

                    <Typography weight={400} variant="h3">
                        Buy ONO
                    </Typography>
                </div>

                <div className={style.form}>
                    <div className={style.field}>
                        <Field
                            required
                            label="ONO amount"
                            id="amount"
                            placeholder="Enter amount in ONO"
                            note={`*Price per ${amount || 1} ONO: ${tonAmount} TON`}
                            onChange={(e) => setOnoValue(e.target.value)}
                            value={amount || ''}
                        />
                    </div>

                    <div className={style.field}>
                        <Field
                            required
                            label="ONO wallet address"
                            id="amount"
                            placeholder="ONO wallet address"
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                        />
                    </div>
                </div>

                <Button variant="primary" className={style.button} onClick={buyHandler}>
                    <span className={style.buttonPc}>Generate Address</span>
                    <span className={style.buttonMb}>Buy</span>
                </Button>
            </div>

            <Popup
                isOpen={popupOpen}
                close={closePopup}
                amount={Number(tonAmount)}
                paymentAddress={paymentAddress}
            />
        </>
    );
};

export default Get;
