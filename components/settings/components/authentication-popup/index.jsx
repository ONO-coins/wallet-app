'use client'

import { Popup } from '@ui/Popup'
import { Field } from '@ui/Field'
import { Button } from '@ui/Button'
import style from './style.module.scss'
import { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import qrCode from './img/qr-code.png'

const PopupAuthentication = ({ ...props }) => {
const {close} = props

  return <Popup {...props}>
    <div className={style.body}>
      <h4 className={style.title}>Authentication settings</h4>

      <div className={style.steps}>
        <div className={style.stepsCount}>Spet: 1/2</div>
        <div className={style.stepsLines}>
          <div className={classNames(style.stepsLine, style.active)}></div>
          <div className={style.stepsLine}></div>
        </div>
      </div>

      <div className={style.step}>
        <h3 className={style.stepTitle}>1. Scan the QR code</h3>

        <p className={style.stepDesc}>Use an authenticator program or browser extension to scan. Learn more</p>

        <Image className={style.qrCode} src={qrCode} width={280} height={280} alt='qr code' />

        <Field className={style.field} label='Enter address'/>
      </div>

      <div className={style.buttons}>
      <Button className={style.button} variant='primary' onClick={close}>Next</Button>
      <Button className={style.button} variant='secondary' onClick={close}>Cancel</Button>
      </div>
    </div>
  </Popup>
}

export default PopupAuthentication;
