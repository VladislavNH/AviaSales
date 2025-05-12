import React from 'react';
import styles from './TicketCard.module.scss';

export default function TicketCard({ price, carrier, segments }) {
  const formatTime = (iso) => {
    const d = new Date(iso);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const logoUrl = `//pics.avs.io/99/36/${carrier}.png`;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.price}>{price.toLocaleString()} ₽</div>
        <img
          className={styles.logo}
          src={logoUrl}
          alt={`${carrier} logo`}
        />
      </div>

      <div className={styles.body}>
        {segments.map((segment, idx) => {
          const { origin, destination, date, duration, stops } = segment;
          const departure = formatTime(date);
          const arrivalDate = new Date(new Date(date).getTime() + duration * 60000);
          const arrival = formatTime(arrivalDate.toISOString());
          const stopsCount = stops.length;
          const logoUrl = `//pics.avs.io/99/36/${carrier}.png`;
          <img className={styles.logo} 
          src={logoUrl}
          alt={`${carrier} logo`}
          />

          
          return (
            <div key={idx} className={styles.segment}>
              <div className={styles.segmentInfo}>
                <div className={styles.route}>{origin} – {destination}</div>
                <div className={styles.time}>{departure} – {arrival}</div>
              </div>

              <div className={styles.segmentInfo}>
                <div className={styles.label}>В пути</div>
                <div className={styles.value}>
                  {Math.floor(duration / 60)} ч {duration % 60} м
                </div>
              </div>

              <div className={styles.segmentInfo}>
                <div className={styles.label}>
                  {stopsCount > 0
                    ? `${stopsCount} пересад${stopsCount > 1 ? 'ок' : 'ка'}`
                    : 'Без пересадок'}
                </div>
                {stopsCount > 0 && (
                  <div className={styles.value}>
                    {stops.join(', ')}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
