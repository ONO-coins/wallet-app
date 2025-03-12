import { Popup } from '@ui/Popup';
import { Button } from '@ui/Button';
import style from './style.module.scss';
import CopyButton from '../wallet/copy-button';

const PopupTransaction = ({ ...props }) => {
    const { close, value, setWalletAddress } = props;

    const useNewAddress = () => {
        setWalletAddress(value);
        close();
    };

    return (
        <Popup {...props}>
            <div className={style.body}>
                <h3 className={style.title} variant="h5" tag="p">
                    New address has been added:
                </h3>

                <div className={style.addressContainer}>
                    <p className={style.address}>{value}</p>
                    <CopyButton value={value} />
                </div>

                <p>Select created address?</p>
                <div className={style.buttons}>
                    <Button className={style.button} variant="primary" onClick={useNewAddress}>
                        Yes
                    </Button>
                    <Button className={style.button} variant="secondary" onClick={close}>
                        No
                    </Button>
                </div>
            </div>
        </Popup>
    );
};

export default PopupTransaction;
