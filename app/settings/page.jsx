import Settings from '@/components/settings';
import { PopupProvider } from '@/components/home/components/popups/popup-provider';
import { Suspense } from 'react';

export const metadata = {
    title: 'ONO Wallet - Settings',
};

const SettingsPage = async () => {
    return (
        <PopupProvider>
            <Suspense>
                <Settings />
            </Suspense>
        </PopupProvider>
    );
};

export default SettingsPage;
