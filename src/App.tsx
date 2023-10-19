import React from 'react';
import styles from  './App.module.scss';
import { Table } from "./modules/Screen/componets/Table ";

function App() {

  return (<div className={styles.app_wrapper}>
    <div className={styles.app_content}>
      <Table/>
    </div>
  </div>);
}

export default App;
