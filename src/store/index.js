import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './ticketSlice'; 
import filtersReducer from './filterSlice'; 

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    filters: filtersReducer,
  },
});


export { setSortBy, toggleFilter, resetFilters } from './filterSlice';