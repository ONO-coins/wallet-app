'use client';

import globalStyle from '@/style/dashboard.module.scss';
import style from './style.module.scss';
import classNames from 'classnames';
import path from 'path';
import { Field } from '@ui/Field';
import { Button } from '@ui/Button';

import { useEffect, useState } from 'react';
import { usePopup } from '../home/components/popups/popup-provider';
import { useGlobalState } from '../home/components/state-provider';
import { isValidURL } from '@/lib/utils.lib';

const Settings = () => {
    const [coreUrlLocal, setCoreUrlLocal] = useState('Loading...');
    const [coreWsUrlLocal, setCoreWsUrlLocal] = useState('Loading...');
    const { coreWsUrl, setCoreWsUrl, coreUrl, setCoreUrl } = useGlobalState();

    const { triggerPopup } = usePopup();

    const handleOpenSecret = async () => {
        const dirname = await window.electronAPI.getUserDirname();
        const filePath = path.join(dirname, '/secrets/secret.txt');
        await window.electronAPI.openFile(filePath);
    };

    const handleOpenData = async () => {
        const dirname = await window.electronAPI.getUserDirname();
        const filePath = path.join(dirname, '/secrets/data.json');
        await window.electronAPI.openFile(filePath);
    };

    const changeCoreHost = async (url) => {
        const valid = isValidURL(url);
        if (!valid) {
            triggerPopup('error', 'Url must starts from http://, https://.');
            return;
        }
        await window.electronAPI.updateUserData('coreUrl', url);
        await window.electronAPI.setCoreUrl(url);
        setCoreUrl(url);
        triggerPopup('success', 'Saved');
    };

    const changeCoreWsHost = async (url) => {
        const valid = isValidURL(url);
        if (!valid) {
            triggerPopup('error', 'Url must starts from http://, https://, ws:// or wss://.');
            return;
        }
        await window.electronAPI.updateUserData('coreWsUrl', url);
        await window.electronAPI.setCoreWsUrl(url);
        setCoreWsUrl(url);
        triggerPopup('success', 'Saved');
    };

    useEffect(() => {
        if (coreUrl) setCoreUrlLocal(coreUrl);
        if (coreWsUrl) setCoreWsUrlLocal(coreWsUrl);
    }, [coreWsUrl, coreUrl]);

    return (
        <>
            <div className={classNames(globalStyle.section, style.settings)}>
                <div className={style.top}>
                    <div className={style.info}>
                        <div className={style.title}>Core settings</div>

                        <div className={style.fields}>
                            <Field
                                className={style.field}
                                label="Core HTTP url"
                                value={coreUrlLocal}
                                onChange={(e) => setCoreUrlLocal(e.target.value)}
                            />

                            <Button
                                variant="secondary"
                                className={classNames(style.sectionButton, style.inputButton)}
                                onClick={() => changeCoreHost(coreUrlLocal, setCoreUrl)}
                            >
                                Save
                            </Button>
                        </div>

                        <div className={style.fields}>
                            <Field
                                className={style.field}
                                label="Core WebSocket url"
                                value={coreWsUrlLocal}
                                onChange={(e) => setCoreWsUrlLocal(e.target.value)}
                            />

                            <Button
                                variant="secondary"
                                className={classNames(style.sectionButton, style.inputButton)}
                                onClick={() => changeCoreWsHost(coreWsUrlLocal, setCoreWsUrl)}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={style.bottom}>
                    <div className={style.block}>
                        <h3 className={style.blockTitle}>Security</h3>

                        <div className={style.sections}>
                            <div className={classNames(style.section, style.wrap)}>
                                <div className={style.sectionLeft}>
                                    <h4 className={style.sectionTitle}>Wallet secrets</h4>
                                    <p className={style.sectionDesc}>
                                        This is your private key. This action is extremely risky. Do
                                        it only if you know what you are doing. Do not change the
                                        file!
                                    </p>
                                </div>

                                <Button
                                    variant="secondary"
                                    className={style.sectionButton}
                                    onClick={handleOpenSecret}
                                >
                                    Open secret file
                                </Button>
                            </div>

                            <div className={classNames(style.section, style.wrap)}>
                                <div className={style.sectionLeft}>
                                    <h4 className={style.sectionTitle}>Wallet data</h4>
                                    <p className={style.sectionDesc}>
                                        This action is extremely risky. It will open file with all
                                        your wallets and their keys. Do it only if you know what you
                                        are doing. Do not change the file!
                                    </p>
                                </div>
                                <Button
                                    variant="secondary"
                                    className={style.sectionButton}
                                    onClick={handleOpenData}
                                >
                                    Open data file
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
