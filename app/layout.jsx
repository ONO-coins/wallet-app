'use client';

import { Open_Sans } from 'next/font/google';
import '@/style/main.scss';
import '@/style/ui.scss';

import Sidebar from '@/components/layout/sidebar';
import Main from '@/components/layout/main';
import style from '@/style/dashboard.module.scss';
import { useState } from 'react';
import { Poppins } from 'next/font/google';
import classNames from 'classnames';
import { StateProvider } from '@/components/home/components/state-provider';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
});

const openSans = Open_Sans({
    subsets: ['latin'],
});

export default function RootLayout({ children }) {
    const [activeSidebar, setActiveSidebar] = useState(false);

    function burgerHandle() {
        setActiveSidebar(!activeSidebar);
    }

    function closeSidebar() {
        setActiveSidebar(false);
    }

    return (
        <html lang="en">
            <body className={openSans.className}>
                <div className="wrapper">
                    <div className="content">
                        <StateProvider>
                            <div className={classNames(style.layout, poppins.className)}>
                                <Sidebar close={closeSidebar} active={activeSidebar} />
                                <Main burgerClick={burgerHandle}>{children}</Main>
                            </div>
                        </StateProvider>
                    </div>
                </div>
            </body>
        </html>
    );
}
