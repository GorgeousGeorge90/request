import React, {useEffect, useState} from 'react';
import styles from  './App.module.scss';
import { MainScreen } from './modules/MainScreen';
import { StartScreen } from "./components/StartScreen";

function App() {
    const [navigate, setNavigate] = useState<boolean>(false)
    const [ start,setStart ] = useState<number>(0)
    let new_time = localStorage.getItem('time')
    useEffect(() => {
        if (new_time) {
            setStart(JSON.parse(new_time))
        }

        return () => localStorage.removeItem('time')
    },[new_time])

    return (<div className={styles.app_wrapper}>
        <div className={styles.app_content}>
            {
                navigate ? <MainScreen close={() => setNavigate(false)}/> :
                           <StartScreen start={start}
                                        open={() => setNavigate(true)}
                           />
            }
        </div>
    </div>);
}

export default App;
