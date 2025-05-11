import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'cheapest',
  filters: {
    all: false,
    0: false,
    1: false,
    2: false,
    3: false,
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortBy(state, { payload }) {
      state.sortBy = payload;
    },
    toggleFilter(state, { payload: key }) {
      const f = state.filters;

      if (key === 'all') {
        const next = !f.all;
        Object.keys(f).forEach(k => (f[k] = next));
      } else {
        f[key] = !f[key];
        f.all = Object.entries(f)
          .filter(([k]) => k !== 'all')
          .every(([, v]) => v);
      }
    },

    resetFilters() {
      return initialState;
    },
  },
});

export const { setSortBy, toggleFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
