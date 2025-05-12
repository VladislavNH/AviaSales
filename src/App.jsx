import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFirstBatch } from './store/ticketSlice';
import SortTabs from './components/SortTab/SortTab';
import Filters from './components/Filters/Filters';
import TicketList from './components/TicketList/TicketList';
import styles from './App.module.scss';
import aviasalesLogo from './assets/aviasalesLogo.svg';

export default function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchFirstBatch());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={aviasalesLogo} alt="Plane" />
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Filters />
        </aside>
        <section className={styles.main}>
          <SortTabs />
          {error && <div className={styles.error}>Ошибка: {error}</div>}
          <TicketList />
        </section>
      </div>
    </div>
  );
}
