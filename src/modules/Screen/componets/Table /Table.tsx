import styles from './Table.module.scss';
import { useId } from 'react';
import { usePhoneContext } from '../../../../contexts';



export const Table = () => {
    const state = usePhoneContext()
    const id = useId()


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
        state?.updatePhone(value)
    }

    return (<section className={styles.table_container}>
        <div className={styles.table_content}>
            <h3 className={styles.table_title}>{state?.phone}</h3>
            <ul id={'events'}>
                {
                    buttons.map(button => <li key={button.id}>
                        <button type={'button'}
                                onClick={()=>handleClick(button.title)}
                                aria-label={button.aria}>
                            {button.title}
                        </button>
                    </li>)
                }
            </ul>
        </div>
    </section>)
}