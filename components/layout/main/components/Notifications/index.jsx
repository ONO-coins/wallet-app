'use client';

import Notifications from './notifications';
import NotfIcon from '@icons/Notification';
import style from '../../style.module.scss';
import { toWsAddress } from '@/lib/utils.lib';
import { useState, useEffect } from 'react';
import { useGlobalState } from '@/components/home/components/state-provider';
import { v4 as uuidv4 } from 'uuid';

const NotificationsBlock = () => {
    const [openNotf, setOpenNotf] = useState(false);
    const [notificationList, setNotificationList] = useState([]);
    const { walletAddress, setBalance, coreWsUrl } = useGlobalState();

    const toggleNotif = () => {
        if (!notificationList.length) return;
        setOpenNotf((prev) => !prev);
    };

    const onCloseNotf = () => {
        setOpenNotf(false);
        setNotificationList((prev) => prev.map((item) => ({ ...item, isNew: false })));
    };

    const addNotif = (notif) => {
        setNotificationList((prev) => {
            if (prev.length >= 3) return [notif, prev[0], prev[1]];
            return [notif, ...prev];
        });
    };

    const formatAddress = (address) => {
        return `${address.substring(1, 11)}.....${address.substring(55)}`;
    };

    const parseTransactions = (eventData) => {
        if (!eventData.includes(walletAddress)) return;

        const eventDataObject = JSON.parse(eventData);
        if (eventDataObject.type !== 'NEW_BLOCK') return;

        const transactions = eventDataObject.data.transactions.filter(
            (transaction) => transaction.from === walletAddress || transaction.to === walletAddress,
        );
        transactions.forEach((transaction) => {
            if (transaction.to === walletAddress) {
                addNotif({
                    isNew: true,
                    type: 'success',
                    title: 'Incoming funds!',
                    text: `You received ${Number(transaction.amount).toLocaleString('en-US', {
                        maximumFractionDigits: 16,
                    })} ONO from ${formatAddress(
                        transaction.from,
                    )}. Funds are already available in your account.`,
                });
                setBalance((prev) => prev + Number(transaction.amount));
            } else {
                addNotif({
                    isNew: true,
                    type: 'warning',
                    title: 'Funds sent!',
                    text: `You have sent ${Number(transaction.amount).toLocaleString('en-US', {
                        maximumFractionDigits: 16,
                    })} ONO to address ${formatAddress(
                        transaction.to,
                    )}. Your transaction is already on the blockchain`,
                });
                setBalance((prev) => prev - Number(transaction.amount) - Number(transaction.fee));
            }
            setOpenNotf(true);
        });
    };

    useEffect(() => {
        if (!coreWsUrl) return;

        const url = toWsAddress(coreWsUrl);
        const ws = new WebSocket(`${url}?node-id=${uuidv4()}`);

        ws.onmessage = (event) => {
            parseTransactions(event.data);
        };

        return () => {
            ws.close();
        };
    }, [coreWsUrl]);

    return (
        <>
            <button onClick={toggleNotif} className={style.buttonNotf}>
                <NotfIcon className={style.icon} />
            </button>

            <Notifications onClose={onCloseNotf} list={notificationList} open={openNotf} />
        </>
    );
};

export default NotificationsBlock;
