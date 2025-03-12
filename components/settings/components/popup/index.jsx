import { Popup } from '@ui/Popup';
import { Button } from '@ui/Button';
import style from './style.module.scss';
import CopyButton from '@/components/home/components/wallet/copy-button';

const PopupDelete = ({ ...props }) => {
    const { close, callback } = props;

    const handleAccept = () => {
        callback();
        close();
    };

    return (
        <Popup {...props}>
            <div className={style.body}>
                <h3 className={style.title} variant="h5" tag="p">
                    Warning! 🚨
                </h3>

                <p>
                    Deleting your account will permanently erase your crypto wallet and all
                    associated data across example.com. This action cannot be undone.
                </p>

                <p>Once deleted:</p>

                <ul>
                    <li className={style.listItem}>
                        You will lose access to your wallet and funds.
                    </li>
                    <li className={style.listItem}>
                        Access to other site services will also be lost, including the Dota 2 site.
                    </li>
                    <li className={style.listItem}>Recovery will not be possible.</li>
                </ul>

                <p>Are you sure you want to proceed? ⚠️</p>

                <div className={style.buttons}>
                    <Button className={style.button} variant="secondary" onClick={handleAccept}>
                        Yes
                    </Button>
                    <Button className={style.button} variant="primary" onClick={close}>
                        No
                    </Button>
                </div>
            </div>
        </Popup>
    );
};

export default PopupDelete;
