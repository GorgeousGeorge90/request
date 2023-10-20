import styles from './MainScreen.module.scss';
import { usePhoneStore } from './store/phone.store';
import { BaseScreen } from './componets/BaseScreen';
import back from './../../assets/img/back.png';
import { FC } from 'react';
import { Success } from "./componets/Success";

type MainScreenProps = {
    close:()=>void,
}

export const MainScreen:FC<MainScreenProps> = ({close}) => {
    const store = usePhoneStore()

    return (<section className={styles.screen_container}>
        <div className={styles.screen_content}>
            <img className={styles.screen_overlay}
                 src={back} alt={'back'}/>
            <div className={styles.screen_sidebar}>
            {
                store.isFinished ? <Success/>:<BaseScreen/>
            }
            </div>
        </div>
    </section>)
}