import classNames from 'classnames';
import globalStyle from '@/style/dashboard.module.scss';
import style from './style.module.scss';
import { Button } from '@ui/Button';

import CheckMark from '@icons/CheckMark';

const Status = () => {
    return (
        <div className={classNames(globalStyle.section, style.status)}>
            <div className={style.head}>
                <div className={style.title}>Sync Status</div>
            </div>

            <div className={style.main}>
                <div className={style.indicatorStatus}>
                    <div className={style.indicator}>
                        <CheckMark />
                    </div>

                    <div className={style.statusText}>Synchronized</div>
                </div>

                <ul className={style.quality}>
                    <li className={style.qualityItem}>
                        <span className={style.qualityTitle}>Status:</span>
                        <span className={style.qualityValue}>Synchronized</span>
                    </li>
                    <li className={style.qualityItem}>
                        <span className={style.qualityTitle}>Last updated:</span>
                        <span className={style.qualityValue}>17/12/2024, 14:45</span>
                    </li>
                    <li className={style.qualityItem}>
                        <span className={style.qualityTitle}>Data:</span>
                        <span className={style.qualityValue}>Complete</span>
                    </li>
                    <li className={style.qualityItem}>
                        <span className={style.qualityTitle}>Files:</span>
                        <span className={style.qualityValue}>Complete</span>
                    </li>
                    <li className={style.qualityItem}>
                        <span className={style.qualityTitle}>Settings:</span>
                        <span className={style.qualityValue}>Complete</span>
                    </li>
                </ul>

                <div className={style.progress}>
                    <div className={style.progressTitle}>Progress</div>
                    <div className={style.progressValue}>
                        <div className={style.progressTop}>
                            <div className={style.progressMin}>0%</div>
                            <div className={style.progressMax}>100%</div>
                        </div>

                        <div className={style.progressBar}>
                            <div className={style.progressTrack}></div>
                        </div>
                    </div>
                </div>

                <Button className={style.button} variant="secondary">
                    Retry Sync
                </Button>
            </div>
        </div>
    );
};

export default Status;
