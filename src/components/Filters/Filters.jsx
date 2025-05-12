import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter, /*resetFilters*/ } from '../../store/filterSlice';
import styles from './Filters.module.scss';

const ORDER = ['all', 0, 1, 2, 3];
const LABELS = {
  all: 'Все',
  0: 'Без пересадок',
  1: '1 пересадка',
  2: '2 пересадки',
  3: '3 пересадки',
};

export default function Filters() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.filters);

  return (
    <div className={styles.card}>
      <div className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>

      {ORDER.map((key) => (
        <label key={key} className={styles.option}>
          <input
            type="checkbox"
            checked={filters[key]}
            onChange={() => dispatch(toggleFilter(key))}
          />
          <span className={styles.labelText}>{LABELS[key]}</span>
        </label>
      ))}

      {/* <button
        className={styles.reset}
        onClick={() => dispatch(resetFilters())}
      >
        Сбросить
      </button> */}
    </div>
  );
}
