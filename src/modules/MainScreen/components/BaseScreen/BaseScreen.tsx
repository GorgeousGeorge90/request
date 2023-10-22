import styles from './BaseScreen.module.scss';
import React, { FC, useEffect, useId } from 'react';
import { usePhoneStore } from "../../store/phone.store";
import { MainScreenProps }  from '../../MainScreen';
import { fromEvent } from "rxjs";
import {buttons} from "../../mocks";




export const BaseScreen:FC<MainScreenProps> = ({close}) => {
    const store = usePhoneStore()
    const id = useId()
    // useEffect(()=> {
    //     const el = document.querySelector("[data-test='test']")
    //     if (el) {
    //         const Test = () => {
    //                 const Timer = setTimeout(() => {
    //                     close()
    //                 }, 10000)
    //                 //Здесь можно было использовать обычный addEventListener по событию click//
    //                 const observer = {
    //                     next: () => {
    //                         clearTimeout(Timer)
    //                         Test()
    //                     }
    //                 }
    //                  fromEvent(el, 'click').subscribe(observer)
    //             }
    //             Test()
    //     }
    // },[])

    let result = store.getResult()

    const handleClick = (value:string) => {
        value === 'стереть' ? store.deleteNumber():store.addNumber(value)
    }

    return (<section className={styles.base_screen_container} data-test={'test'}>
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
                                                      type={'button'}
                                                      id={button.aria}
                                                      disabled={button.title === 'стереть'
                                                          && store.currentIndex === 3}
                                                      onClick={() => handleClick(button.title)}
                                                      aria-label={button.aria}>
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
                           data-id={'hi'}
                           onClick={()=>store.setIsApproved()}>
                        Cогласие на обработку персональных данных
                    </label>
                    <input className={styles.base_check_input}
                           type="checkbox"
                           id={`${id}-check`}
                           aria-label={'согласие'}
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
            >
                {
                    store.isLoading === 'pending' ? <span>Loading...</span>:<span>подтвердить номер</span>
                }
            </button>
        </div>
    </section>)
}