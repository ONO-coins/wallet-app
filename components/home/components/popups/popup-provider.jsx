'use client';

import React, { createContext, useState, useContext } from 'react';
import Popup from '../popups/popup';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const defaultValue = { type: 'error', text: '' };
    const [value, setValue] = useState(defaultValue);
    const triggerPopup = (type, text) => setValue({ type, text });
    const clearPopup = () => {
        setValue(defaultValue);
    };

    return (
        <PopupContext.Provider value={{ value, triggerPopup, clearPopup }}>
            {children}
            <Popup close={() => clearPopup(false)} />
        </PopupContext.Provider>
    );
};

export const usePopup = () => useContext(PopupContext);
