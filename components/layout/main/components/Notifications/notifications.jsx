import classNames from 'classnames';
import style from './style.module.scss';

import CloseIcon from '@icons/X';
import Warning from '@icons/Warning';
import InComming from '@icons/InComing';
import LogOut from '@icons/LogOut';

const defaultProps = {
    open: false,
    onClose: () => {},
    list: [],
};

const typesMessage = {
    error: {
        textColor: '#F44336',
        bgColor: '#e6313133',
        Icon: Warning,
    },
    success: {
        textColor: '#32E53B',
        bgColor: '#32e53b19',
        Icon: InComming,
    },
    warning: {
        textColor: '#FF9100',
        bgColor: '#ff910019',
        Icon: LogOut,
    },
};

const Notifications = ({
    open = defaultProps.open,
    onClose = defaultProps.onClose,

    list = defaultProps.list,
    ...props
}) => {
    return (
        <div
            className={classNames(style.notfDropdown, {
                [style.active]: open,
            })}
            {...props}
        >
            <button onClick={onClose} className={style.close}>
                <CloseIcon />
            </button>

            <div className={style.title}>Notification</div>

            <ul className={style.list}>
                {list.map((item, i) => {
                    const Icon = typesMessage[item.type].Icon;

                    return (
                        <li
                            key={i}
                            className={classNames(style.notf, {
                                [style.new]: item.isNew,
                            })}
                        >
                            <div
                                className={style.notfIcon}
                                style={{
                                    backgroundColor: typesMessage[item.type].bgColor,
                                    color: typesMessage[item.type].textColor,
                                }}
                            >
                                <Icon />
                            </div>

                            <div className={style.notfInfo}>
                                {item.title && <div className={style.notfTitle}>{item.title}</div>}
                                {item.text && <div className={style.notfText}>{item.text}</div>}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Notifications;
