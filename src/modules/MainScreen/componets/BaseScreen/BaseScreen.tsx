import styles from './BaseScreen.module.scss';
import {useEffect, useId} from 'react';
import { usePhoneStore } from "../../store/phone.store";



export const BaseScreen = () => {
    const store = usePhoneStore()
    const id = useId()
    useEffect(()=> {
        console.log(store.isApproved)
        console.log(store.isFinished)
    },[store.isApproved])

    let result = store.getResult()
    console.log(result.replace(/[()-]/g,''))

    const buttons = [
        { id:`${id}-1`, title:'1', aria:'один' },
        { id:`${id}-2`, title:'2', aria:'два' },
        { id:`${id}-3`, title:'3', aria:'три' },
        { id:`${id}-4`, title:'4', aria:'четыре' },
        { id:`${id}-5`, title:'5', aria:'пять' },
        { id:`${id}-6`, title:'6', aria:'шесть' },
        { id:`${id}-7`, title:'7', aria:'семь' },
        { id:`${id}-8`, title:'8', aria:'восемь' },
        { id:`${id}-9`, title:'9', aria:'девять' },
        { id:`${id}-х`, title:'стереть', aria:'стереть' },
        { id:`${id}-0`, title:'0', aria:'ноль' },
    ]

    const handleClick = (value:string) => {
        value === 'стереть' ? store.deleteNumber():store.addNumber(value)
    }

    return (<section className={styles.base_screen_container}>
        <div className={styles.base_content}>
            <h3>Введите ваш номер мобильного телефона</h3>
            <h3 className={styles.base_title}>{result}</h3>
            <p>и с <span>вами</span> свяжется наш менеждер для дальнейшей консультации</p>
            <ul className={styles.base_main}>
                {
                    buttons.map(button => <button className={styles.base_main_item}
                                                  key={button.id}
                                                  type={'button'}
                                                  disabled={ button.title === 'стереть'
                                                      && store.currentIndex === 3 }
                                                  onClick={()=>handleClick(button.title)}
                                                  aria-label={button.aria}>
                            {button.title}
                        </button>)
                }
            </ul>
            <div className={styles.base_check}>
                <label className={styles.base_check_label}
                       htmlFor={`${id}-check`}
                       onClick={()=>store.setIsApproved()}
                />
                <input className={styles.base_check_input}
                       type="checkbox"
                       id={`${id}-check`}
                       aria-describedby={`${id}-check`}
                       aria-label={'согласие'}
                       defaultChecked={store.isApproved}
                />
                <p  className={styles.base_check_info}
                    id={`${id}-check`}>согласие на обработку персональных данных</p>
            </div>
            <button className={styles.base_final}
                    onClick={()=> {
                        store.getValidate(+result.replace(/[()-]/g,''))
                    }}
                    type={'button'}
                    disabled={ store.currentIndex < 15 || !store.isApproved }
                    aria-label={'выполнить'}>
                {
                    store.isLoading === 'pending' ? <span>Loading...</span>:<span>подтвердить номер</span>
                }
            </button>
        </div>
    </section>)
}