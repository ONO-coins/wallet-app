import style from './style.module.scss';
import classNames from 'classnames';

import NotificationsBlock from './components/Notifications';
import Burger from '@icons/Burger';

const Main = ({ title = 'Dashboard', burgerClick, children }) => {
    return (
        <div className={style.main}>
            <div className={style.header}>
                <div className={style.container}>
                    <div className={style.headerBody}>
                        <h1 className={style.title}>{title}</h1>
                        <button onClick={burgerClick} className={style.burgerButton}>
                            <Burger className={style.burger} />
                        </button>

                        <NotificationsBlock />
                    </div>
                </div>
            </div>
            <h1 className={classNames(style.title, style.titleMob)}>{title}</h1>

            <div className={style.content}>
                <div className={style.container}>{children}</div>
            </div>

            <div className={style.footer}>
                <div className={style.container}>
                    <div className={style.footerBody}>
                        <div className={style.footerText}>
                            © {new Date().getFullYear()} All rights reserved
                        </div>
                        <div className={style.footerRight}>
                            {/* <Link
                                href={`${process.env.LANDING_URL}/privacy-policy`}
                                target="_blank"
                                className={classNames(style.footerText, style.footerLink)}
                            >
                                Terms of Use
                            </Link>
                            <Link
                                href={`${process.env.LANDING_URL}/terms-of-use`}
                                target="_blank"
                                className={classNames(style.footerText, style.footerLink)}
                            >
                                Privacy Policy
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
