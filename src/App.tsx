import React from 'react';
import styles from  './App.module.scss';
import { MainScreen } from './modules/MainScreen';

function App() {

  return (<div className={styles.app_wrapper}>
    <div className={styles.app_content}>
     <MainScreen/>
    </div>
  </div>);
}

export default App;
