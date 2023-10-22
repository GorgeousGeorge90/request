import styles from './Success.module.scss';


export const Success = () => {

    return (<section className={styles.success_screen_container}>
        <div className={styles.success_screen_content}>
            <h1 className={styles.success_screen_title}>заявка принята</h1>
            <p> Держите телефон под рукой.</p>
            <p> Скоро с Вами свяжется наш менеджер.</p>
        </div>
    </section>)
}