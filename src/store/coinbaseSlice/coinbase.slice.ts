import { createSlice } from '@reduxjs/toolkit';

export const coinbaseSlice = createSlice({
  name: 'coinbaseSlice',
  initialState: {
    data: null,
    isConnected: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const coinbaseSliceActions = coinbaseSlice.actions;
export const coinbaseSliceReducer = coinbaseSlice.reducer;
