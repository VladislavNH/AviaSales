import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFirstBatch } from './store/ticketSlice';
import SortTabs from './components/SortTab/SortTab';
import Filters from './components/Filters/Filters';
import TicketList from './components/TicketList/TicketList';
import styles from './App.module.scss';
import planeIcon from './assets/plane-icon.svg'; 

export default function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchFirstBatch());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {/* 1. Хедер с иконкой */}
      <header className={styles.header}>
        <img src={planeIcon} alt="Plane" />
      </header>

      {/* 2. Основной контент */}
      <div className={styles.content}>
        {/* 2a. Фильтры */}
        <aside className={styles.sidebar}>
          <Filters />
        </aside>

        {/* 2b. Секция с табами и списком */}
        <section className={styles.main}>
          <SortTabs />
          {error && <div className={styles.error}>Ошибка: {error}</div>}
          <TicketList />
        </section>
      </div>
    </div>
  );
}
