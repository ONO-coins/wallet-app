import style from './style.module.scss';

import Balance from './components/balance';
import Wallet from './components/wallet';
import Transactions from './components/transactions';
import Transfer from './components/transfer';
import Get from './components/get';

import { PopupProvider } from './components/popups/popup-provider';

const Home = () => {
    return (
        <PopupProvider>
            <div className={style.grid}>
                <Balance />
                <Wallet />
                <Transactions />
                <Transfer />
                <Get />
            </div>
        </PopupProvider>
    );
};

export default Home;
