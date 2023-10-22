import styles from './MainScreen.module.scss';
import { usePhoneStore } from './store/phone.store';
import { BaseScreen } from './components/BaseScreen';
import back from './../../assets/img/back.png';
import index from './../../assets/img/index.png';
import {FC, useEffect, useState} from 'react';
import { Success } from './components/Success';
import {fromEvent, timer} from 'rxjs';

export type MainScreenProps = {
    close:()=>void,
}

export const MainScreen:FC<MainScreenProps> = ({close}) => {
    const store = usePhoneStore()

    return (<section className={styles.screen_container} data-test={'test'}>
        <div className={styles.screen_content}>
            <img className={styles.screen_overlay}
                 src={back} alt={'back'}/>
            <div className={styles.screen_sidebar}>
            {
                store.isFinished ? <Success/>:<BaseScreen close={close}/>
            }
            </div>
            <button className={styles.screen_btn}
                    onClick={close}
                    type={'button'}
                    aria-label={'close'}>
                x
            </button>
            <figure className={styles.screen_code}>
                <img src={index} alt='code'/>
                <figcaption className={styles.screen_code_text}>
                    сканируйте qr-код для получения дополнительной информации
                </figcaption>
            </figure>
        </div>
    </section>)
}