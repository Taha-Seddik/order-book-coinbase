import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICoinbaseState } from '../../models/mix';
import { L2UpdateMessageData, TupleArrayType } from '../../models/coinbase.types';
import { isZeroString, sortOrders } from '../../utils/coinbase.utils';

const inialState: ICoinbaseState = {
  bids: [],
  asks: [],
  isConnected: false,
  increment: 0.01,
};

export const coinbaseSlice = createSlice({
  name: 'coinbaseSlice',
  initialState: inialState,
  reducers: {
    setOrderBook(state, action: PayloadAction<{ bids: TupleArrayType; asks: TupleArrayType }>) {
      state.bids = sortOrders(action.payload.bids, true);
      state.asks = sortOrders(action.payload.asks, false);
    },
    updateOrderBook(state, action: PayloadAction<L2UpdateMessageData['changes']>) {
      applyChanges(action.payload, state);
      state.bids = sortOrders(state.bids, true);
      state.asks = sortOrders(state.asks, false);
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setIncrement: (state, action: PayloadAction<number>) => {
      state.increment = action.payload;
    },
  },
});

const applyChanges = (changes: L2UpdateMessageData['changes'], state: ICoinbaseState) => {
  changes.forEach(([side, price, size]) => {
    const orderList = side === 'buy' ? state.bids : state.asks;
    const index = orderList.findIndex((order) => order[0] === price);

    if (isZeroString(size)) {
      if (index !== -1) {
        // filter out that
        orderList.splice(index, 1);
      }
    } else {
      if (index !== -1) {
        orderList[index] = [price, size];
      } else {
        orderList.push([price, size]);
      }
    }
  });
};

export const coinbaseSliceActions = coinbaseSlice.actions;
export const coinbaseSliceReducer = coinbaseSlice.reducer;
