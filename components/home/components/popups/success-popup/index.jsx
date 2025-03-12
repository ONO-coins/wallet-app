import { Popup } from '@ui/Popup';
import style from './style.module.scss';

import CheckMark from '@icons/CheckMark';

const PopupTransaction = ({ ...props }) => {
    return (
        <Popup {...props}>
            <div className={style.body}>
                <div className={style.indicator}>
                    <CheckMark className={style.icon} />
                </div>

                <p className={style.text}>{props.value}</p>
            </div>
        </Popup>
    );
};

export default PopupTransaction;
