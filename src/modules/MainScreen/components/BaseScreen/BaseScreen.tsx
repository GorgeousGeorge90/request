import styles from './BaseScreen.module.scss';
import React, { FC, useEffect, useId} from 'react';
import { usePhoneStore } from '../../store/phone.store';
import { MainScreenProps }  from '../../MainScreen';
import { buttons } from '../../mocks';
import { FocusService, NumbersService } from '../../../../services';
import {TimerService} from "../../../../services/TimerService";


export const BaseScreen:FC<MainScreenProps> = ({close}) => {
        const store = usePhoneStore()
        const id = useId()

        useEffect(()=> {
            const numberService = new NumbersService(
                buttons(id),
                store.addNumber,
                store.deleteNumber
            )

            numberService.makeSubscription()

            return () => numberService.makeUnsubscription()
        },[])

        useEffect(()=> {
            const buttons = document.querySelectorAll("[data-id='id']")

            const focusService = new FocusService(buttons)
            focusService.makeSubscription()

            return ()=> focusService.makeUnsubscription()
        },[])

        useEffect(()=> {
            const el = document.querySelector("[data-el='main']")

            if (el) {
                const timerService = new TimerService(12000, el, close)
                timerService.makeSubscription()

                if (store.isFinished) {
                    timerService.makeUnsubscription()
                }
            }
        },[store.isFinished])

        let result = store.getResult()

        const handleClick = (value:string) => {
            value === 'стереть' ? store.deleteNumber():store.addNumber(value)
        }

        return (<section className={styles.base_screen_container} data-el={'main'}>
            <div className={styles.base_content}>
                <h3 className={styles.base_title}>Введите ваш номер мобильного телефона</h3>
                <h3 className={styles.base_phone}
                    style={{color: store.error ? 'red':'black'}}
                >{result}</h3>
                <p className={styles.base_text}>и с <span>вами</span> свяжется наш менеждер для дальнейшей консультации</p>
                <ul className={styles.base_main}>
                    {
                        buttons(id).map(button => <button className={styles.base_main_item}
                                                          key={button.id}
                                                          data-btn={'test'}
                                                          type={'button'}
                                                          id={button.aria}
                                                          data-id={'id'}
                                                          disabled={button.title === 'стереть' &&
                                                                    store.currentIndex === 3}
                                                          onClick={() => handleClick(button.title)}
                                                          aria-label={button.aria}
                                                          aria-disabled={true}>
                                {button.title}
                            </button>)
                    }
                </ul>
                {
                    store.error ? <div className={styles.base_error}>
                        {store.error}</div>:
                        <div className={styles.base_check}>
                        <label className={styles.base_check_label}
                               htmlFor={`${id}-check`}
                               data-id={'id'}
                        >
                            Cогласие на обработку персональных данных
                        </label>
                        <input className={styles.base_check_input}
                               type="checkbox"
                               id={`${id}-check`}
                               data-id={'id'}
                               aria-label={'согласие'}
                               onClick={()=>store.setIsApproved()}
                        />
                    </div>
                }
                <button className={styles.base_final}
                        onClick={()=> {
                            store.getValidate(+result.replace(/[()-]/g,''))
                        }}
                        type={'button'}
                        disabled={ store.currentIndex < 16 || !store.isApproved }
                        aria-label={'выполнить'}
                        data-id={'id'}
                >
                    {
                        store.isLoading === 'pending' ? <span>Loading...</span>:<span>подтвердить номер</span>
                    }
                </button>
            </div>
        </section>)
}