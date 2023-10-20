import styles from './StartScreen.module.scss';
import ReactPlayer from 'react-player/youtube'
import index from './../../assets/img/index.png';
import { FC } from 'react';

type StartScreenProps = {
    open:()=>void;
}

export const StartScreen:FC<StartScreenProps> = ({open}) => {

    return <section
        className={styles.start_container}>
        <div className={styles.start_content}>
            <ReactPlayer className={styles.start_video}
                         url='https://www.youtube.com/watch?v=M7FIvfx5J10'
                         width={'100%'} height={'100%'}
                         muted={true}
                         playing={true}
                         loop={true}
            />
            <div className={styles.start_banner}>
                <h3 className={styles.start_banner_title}>
                    <span>исполните мечту вашего</span>
                    <span>малыша!</span>
                    <span>подарите ему собаку!</span>
                </h3>
                <figure className={styles.start_banner_index}>
                    <img src={index} alt='qr'/>
                    <figcaption className={styles.start_banner_index_text}>
                        Сканируйте код или нажмите ОК
                    </figcaption>
                </figure>
                <button className={styles.start_banner_btn}
                        onClick={open}
                        type={'button'}
                        aria-label={'переход'}>
                    ок
                </button>
            </div>
        </div>
    </section>
}