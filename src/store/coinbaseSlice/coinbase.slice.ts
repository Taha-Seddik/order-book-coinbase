import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICoinbaseState } from '../../models/mix';
import { L2UpdateMessageData, TupleArrayType } from '../../models/coinbase.types';
import { isZeroString, sortOrders } from '../../utils/coinbase.utils';

const inialState: ICoinbaseState = {
  bids: [],
  asks: [],
  isConnected: false,
  increment: 0.01,
  chartData: [],
  isLoading: true,
};

export const coinbaseSlice = createSlice({
  name: 'coinbaseSlice',
  initialState: inialState,
  reducers: {
    setOrderBook(state, action: PayloadAction<{ bids: TupleArrayType; asks: TupleArrayType }>) {
      state.bids = sortOrders(action.payload.bids, true);
      state.asks = sortOrders(action.payload.asks, false);
      // set chart data
      state.chartData = [
        {
          time: new Date().toISOString(),
          askPrice: parseFloat(state.asks[0][0]),
          bidPrice: parseFloat(state.bids[0][0]),
        },
      ];
      state.isLoading = false;
    },
    updateOrderBook(state, action: PayloadAction<L2UpdateMessageData>) {
      applyChanges(action.payload.changes, state);
      state.bids = sortOrders(state.bids, true);
      state.asks = sortOrders(state.asks, false);
      // update chart data
      state.chartData.push({
        time: new Date().toISOString(),
        askPrice: parseFloat(state.asks[0][0]),
        bidPrice: parseFloat(state.bids[0][0]),
      });
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setIncrement: (state, action: PayloadAction<number>) => {
      state.increment = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
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
