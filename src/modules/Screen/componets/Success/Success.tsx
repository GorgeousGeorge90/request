import styles from './Success.module.scss';


export const Success = () => {

    return (<section className={styles.success_container}>
        <div className={styles.success_content}>
            <h1 className={styles.success_title}>заявка принята</h1>
            <p>держите телефон под рукой.</p>
            <p>скоро с <span>вами</span>свяжется наш менеджер.</p>
        </div>
    </section>)
}