'use client'

import { Popup } from '@ui/Popup'
import { Button } from '@ui/Button'
import style from './style.module.scss'
import { useState } from 'react'
import classNames from 'classnames'

import Download from '@icons/FiDownload'
import Copy from '@icons/FiCopy'

const PopupRecovery = ({ ...props }) => {
const {close} = props

  return <Popup {...props}>
    <div className={style.body}>
      <h4 className={style.title}>Authentication settings</h4>

      <div className={style.steps}>
        <div className={style.stepsCount}>Spet: 2/2</div>
        <div className={style.stepsLines}>
          <div className={classNames(style.stepsLine, style.active)}></div>
          <div className={classNames(style.stepsLine, style.active)}></div>
        </div>
      </div>


      <div className={style.step}>
        <h3 className={style.stepTitle}>Save the recovery codes</h3>

        <p className={style.stepDesc}>You can use recovery codes as a second factor for authentication if you lose access to your device.</p>


        <div className={style.stepSection}>
          <div className={style.stepCodes}>
            <div className={style.stepCode}>
              apple-sunrise-lion-blue
              tree-dolphin-spark-moon
              river-eagle-flower-cloud
              ocean-firefly-tiger-green
            </div>
            <div className={style.stepCode}>
              star-whale-stone-orange forest-butterfly-bear-sky desert-wind-fox-yellow
              mountain-breeze-wolf-light
            </div>
          </div>

          <div className={style.stepButtons}>
            <button className={style.buttonCode}><Download className={style.buttonIco}/></button>
            <button className={style.buttonCode}><Copy className={style.buttonIco}/></button>
          </div>

        </div>
      </div>

      <div className={style.buttons}>
      <Button className={style.button} variant='primary' onClick={close}>Next</Button>
      <Button className={style.button} variant='secondary' onClick={close}>Cancel</Button>
      </div>
    </div>
  </Popup>
}

export default PopupRecovery;
