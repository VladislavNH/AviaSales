import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../store'; 
import styles from './SortTab.module.scss';

const tabs = [
  { label: 'САМЫЙ ДЕШЕВЫЙ', value: 'cheapest' },
  { label: 'САМЫЙ БЫСТРЫЙ',    value: 'fastest' },
];

export default function SortTab() {
  const dispatch = useDispatch();
  const active = useSelector(state => state.filters.sortBy);

  return (
    <div className={styles.container}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          type="button"
          className={`${styles.tab} ${active === tab.value ? styles.active : ''}`}
          onClick={() => dispatch(setSortBy(tab.value))}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}