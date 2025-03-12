'use client';

import classNames from 'classnames';
import globalStyle from '@/style/dashboard.module.scss';
import style from './style.scss.module.scss';
import { Button } from '@ui/Button';
import { Dropdown } from '@ui/Dropdown';
import { useEffect, useState } from 'react';
import Popup from '../add-adress';
import CopyButton from './copy-button';
import { usePopup } from '../popups/popup-provider';

import Plus from '@icons/Plus';
import { getAddresses, createAddress } from '@/internal/wallet';
import { useGlobalState } from '../state-provider';

const Wallet = () => {
    const { walletAddress, setWalletAddress } = useGlobalState();
    const [popupOpen, setPopupOpen] = useState(false);
    const [options, setOptions] = useState([]);

    const { triggerPopup } = usePopup();

    const dropdownChange = (value) => {
        setWalletAddress(value);
    };

    const newAddress = async () => {
        try {
            const result = await createAddress();
            setOptions([...options, { id: result.id, value: result.publicKey }]);
            setPopupOpen(true);
        } catch (err) {
            triggerPopup('error', err.message);
        }
    };

    useEffect(() => {
        const loadAddresses = async () => {
            const addresses = await getAddresses();
            setOptions(addresses.map((address) => ({ id: address.id, value: address.publicKey })));
            if (!walletAddress) setWalletAddress(addresses[0].publicKey);
        };
        loadAddresses();
    }, []);

    return (
        <>
            <div className={classNames(globalStyle.section, style.wallet)}>
                <div className={style.head}>
                    <div className={style.title}>Wallet address</div>
                    <Button
                        className={style.button}
                        iconPosition="left"
                        icon={<Plus />}
                        onClick={newAddress}
                    >
                        Add address
                    </Button>
                </div>

                <div className={style.bottom}>
                    <Dropdown
                        className={style.dropdown}
                        onChange={dropdownChange}
                        value={walletAddress}
                        index={options.find((option) => option.value === walletAddress)?.id + 1}
                        options={options}
                        label="Select an address"
                    />

                    <CopyButton value={walletAddress} />
                </div>
            </div>

            <Popup
                isOpen={popupOpen}
                close={() => setPopupOpen(false)}
                value={options[options.length - 1]?.value}
                setWalletAddress={setWalletAddress}
            />
        </>
    );
};

export default Wallet;
