import React from 'react';
import styles from './TicketCard.module.scss';

export default function TicketCard({ price, logo, segments = [] }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.price}>{price}</div>
        <img className={styles.logo} src={logo} alt="logotype" />
      </div>

      <div className={styles.segments}>
        {segments.map((s, i) => (
          <div key={i} className={styles.segment}>
            <div className={styles.times}>
              <div className={styles.route}>
                <span className={styles.city}>{s.from} – {s.to}</span>
                <span className={styles.time}>{s.departure} – {s.arrival}</span>
              </div>
            </div>

            <div className={styles.info}>
              <span className={styles.duration}>В пути {s.duration}</span>
              <span className={styles.stops}>
                {s.stops.length} пересад{['ок','ка','ки'][s.stops.length]}: {s.stops.join(', ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
