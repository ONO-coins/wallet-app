'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [balance, setBalance] = useState(0);
    const [walletAddress, setWalletAddressState] = useState(null);
    const [coreUrl, setCoreUrl] = useState(null);
    const [coreWsUrl, setCoreWsUrl] = useState(null);

    useEffect(() => {
        const savedWalletAddress = localStorage.getItem('ono_wallet_address');
        if (savedWalletAddress) {
            setWalletAddressState(savedWalletAddress);
        }

        const loadCoreUrls = async () => {
            console.log('here===>', window.electronAPI);
            const coreUrlLoaded = await window.electronAPI.getCoreUrl();
            const coreWsUrlLoaded = await window.electronAPI.getCoreWsUrl();
            setCoreUrl(coreUrlLoaded);
            setCoreWsUrl(coreWsUrlLoaded);
        };
        loadCoreUrls();
    }, []);

    const setWalletAddress = (address) => {
        setWalletAddressState(address);
        if (address) {
            localStorage.setItem('ono_wallet_address', address);
        } else {
            localStorage.removeItem('ono_wallet_address');
        }
    };

    return (
        <StateContext.Provider
            value={{
                balance,
                setBalance,
                walletAddress,
                setWalletAddress,
                coreUrl,
                setCoreUrl,
                coreWsUrl,
                setCoreWsUrl,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useGlobalState = () => useContext(StateContext);
