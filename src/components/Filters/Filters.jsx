import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter, resetFilters } from '../../store';

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
    <div className="filters">
      {Object.keys(filters).map((key) => (
        <label key={key}>
          <input
            type="checkbox"
            checked={filters[key]}
            onChange={() => dispatch(toggleFilter(key))}
          />
          {LABELS[key]}
        </label>
      ))}
      <button onClick={() => dispatch(resetFilters())}>
        Сбросить
      </button>
    </div>
  );
}
