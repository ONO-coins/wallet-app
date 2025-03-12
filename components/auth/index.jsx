import style from './style.module.scss';
import { Typography } from '@ui/Typography';
import Image from 'next/image';
import woman from './images/woman.webp';
import Link from 'next/link';
import Buttons from './buttons';

export default function Auth() {
    return (
        <div className={style.auth}>
            <Image priority src={woman} className={style.img} alt="man" />
            <div className={style.container}>
                <Link href={process.env.LANDING_URL} target="_blank">
                    <Image
                        className={style.logo}
                        src="/img/logo.svg"
                        width={110}
                        height={42}
                        alt="ono-coin-logo"
                    />
                </Link>
                <div className={style.info}>
                    <Typography className={style.title} variant="h2" tag="h1">
                        Welcome Back to Your ONO Wallet !
                    </Typography>
                    <Typography className={style.desc} variant="text-small" tag="p">
                        Log in or create an account to securely manage your ONO coins. Fast, simple,
                        and secure access with Google and Steam accounts
                    </Typography>

                    <Buttons />
                </div>
            </div>
        </div>
    );
}
