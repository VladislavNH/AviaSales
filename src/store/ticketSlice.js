import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSearchId, getTickets } from '../api/aviasales';


export const fetchFirstBatch = createAsyncThunk(
  'tickets/fetchFirstBatch',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const searchId = await getSearchId();
      let stop = false;
      while (!stop) {
        const { tickets, stop: isFinished } = await getTickets(searchId);
        dispatch(addTickets(tickets));
        stop = isFinished;
      }
      return; 
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTickets(state, action) {
      state.items.push(...action.payload);
    },
    resetTickets() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirstBatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirstBatch.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchFirstBatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addTickets, resetTickets } = ticketSlice.actions;
export default ticketSlice.reducer;
