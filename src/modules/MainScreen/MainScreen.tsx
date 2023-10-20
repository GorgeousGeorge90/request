import styles from './MainScreen.module.scss';
import { usePhoneStore } from './store/phone.store';
import { BaseScreen } from './componets/BaseScreen';
import {useEffect, useState} from "react";
import {Success} from "./componets/Success";
import MainService from "./service/main.service";


export const MainScreen = () => {
    const store = usePhoneStore()

    return (<section className={styles.screen_container}>
        <div className={styles.screen_content}>
            {
                store.isFinished ? <Success/>:<BaseScreen/>
            }
        </div>
    </section>)
}