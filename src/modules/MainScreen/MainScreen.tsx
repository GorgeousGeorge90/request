import styles from './MainScreen.module.scss';
import { usePhoneStore } from './store/phone.store';
import { BaseScreen } from './components/BaseScreen';
import back from './../../assets/img/back.png';
import index from './../../assets/img/index.png';
import { FC } from 'react';
import { Success } from './components/Success';
import { useKeyPress } from '../../hooks/useKeyDownPress';

export type MainScreenProps = {
    close:()=>void,
}

export const MainScreen: FC<MainScreenProps> = ({close}) => {
    const store = usePhoneStore()

    const handleClick = () => {
        store.isFinished ? store.clearState(): close()
    }
    useKeyPress(handleClick,'Escape')

    return (<section className={styles.screen_container}>
        <div className={styles.screen_content}>
            <img className={styles.screen_overlay}
                 src={back} alt={'back'}/>
            {
                store.isFinished ? <>
                        <div className={styles.screen_sidebar}>
                            <Success/>
                        </div>
                        <button className={styles.screen_btn}
                                onClick={handleClick}
                                type={'button'}
                                aria-label={'try again'}>
                            повторить
                        </button>
                    </> :
                    <>
                        <div className={styles.screen_sidebar}>
                            <BaseScreen close={close}/>
                        </div>
                        <button className={styles.screen_btn}
                                onClick={handleClick}
                                type={'button'}
                                aria-label={'close'}>
                            x
                        </button>
                    </>
            }
            <figure className={styles.screen_code}>
                <img src={index} alt='code'/>
                <figcaption className={styles.screen_code_text}>
                    сканируйте qr-код для получения дополнительной информации
                </figcaption>
            </figure>
        </div>
    </section>)
}