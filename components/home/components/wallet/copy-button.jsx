'use client';
import style from './style.scss.module.scss';
import classNames from 'classnames';

import { useState } from 'react';
import { Button } from '@ui/Button';

import Copy from '@icons/Copy';
import CheckMark from '@icons/CheckMark';

const CopyButton = ({ value, className }) => {
    const [copied, setCopied] = useState(false);

    const copyValue = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={style.tooltipContainer}>
            <div className={style.tooltip}>
                <span>{copied ? 'Copied!' : 'Copy'}</span>
            </div>
            <Button
                variant="secondary"
                className={className ? classNames(className, style.copy) : style.copy}
                icon={copied ? <CheckMark style={{ width: 20, height: 20 }} /> : <Copy />}
                onClick={copyValue}
            />
        </div>
    );
};

export default CopyButton;
