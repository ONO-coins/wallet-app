import style from './style.module.scss';
import Image from 'next/image';
import { Button } from '@ui/Button';
import Link from 'next/link';

import four from './img/four.svg';
import icon from './img/icon.svg';

export default function Custom404() {
    return (
        <div className={style.error}>
            <div className={style.code}>
                <Image className={style.four} src={four} width={202} height={252} alt="404" />
                <Image className={style.icon} src={icon} width={300} height={300} alt="404" />
                <Image className={style.four} src={four} width={202} height={252} alt="404" />
            </div>

            <h1 className={style.title}>Page not found</h1>
            <p className={style.desc}>
                Looks like you took a wrong turn! Let's get you back on track. Head back to our
                homepage and continue your adventure.
            </p>

            <Link href={process.env.LANDING_URL}>
                <Button className={style.button}>BACK TO HOME</Button>
            </Link>
        </div>
    );
}
