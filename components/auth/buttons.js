'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@ui/Button';
import Google from '@icons/GoogleColor';
import Steam from '@icons/Steam';
import style from './style.module.scss';
import classNames from 'classnames';

export default function Buttons() {
    return (
        <div className={style.buttons}>
            <Button
                className={classNames(style.button, style.google)}
                icon={<Google />}
                onClick={async () => await signIn('google')}
            >
                Continue with{' '}
            </Button>
            <Button
                className={classNames(style.button, style.apple)}
                icon={<Steam />}
                onClick={async () => await signIn('steam')}
            >
                Continue with{' '}
            </Button>
        </div>
    );
}
