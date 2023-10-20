import React, {useState} from 'react';
import styles from  './App.module.scss';
import { MainScreen } from './modules/MainScreen';
import {StartScreen} from "./components/StartScreen";

function App() {
    const [ navigate,setNavigate ] = useState<boolean>(false)

  return (<div className={styles.app_wrapper}>
    <div className={styles.app_content}>
        {
            navigate ?  <MainScreen close={()=>setNavigate(false)}/>:
                        <StartScreen open={()=>setNavigate(true)}/>
        }
    </div>
  </div>);
}

export default App;
