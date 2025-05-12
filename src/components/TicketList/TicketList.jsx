// src/components/TicketList/TicketList.jsx
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import TicketCard from '../TicketCard/TicketCard';
import Loader from '../Loader/Loader';
import styles from './TicketList.module.scss';

export default function TicketList() {
  const { items: storeTickets, loading } = useSelector(state => state.tickets);
  const { sortBy, filters } = useSelector(state => state.filters);

  const displayed = useMemo(() => {
    const getTotalMinutes = segments =>
      segments.reduce((sum, { duration }) => sum + duration, 0);

    return storeTickets
      .filter(({ segments }) => {
        const stopCount = segments.reduce((sum, { stops }) => sum + stops.length, 0);
        return filters.all || filters[stopCount];
      })
      .sort((a, b) => {
        if (sortBy === 'cheapest') {
          return a.price - b.price;
        }
        return getTotalMinutes(a.segments) - getTotalMinutes(b.segments);
      });
  }, [storeTickets, filters, sortBy]);

  const firstBatch = displayed.slice(0, 5);

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {firstBatch.map((ticket, idx) => (
          <TicketCard
            key={idx}
            price={ticket.price}
            logo={`//pics.avs.io/99/36/${ticket.carrier}.png`}
            segments={ticket.segments}
            carrier={ticket.carrier} 
          />
        ))}
      </div>

      {loading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
}
