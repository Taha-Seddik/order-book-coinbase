import { configureStore } from '@reduxjs/toolkit';
import { coinbaseSliceReducer } from './coinbaseSlice/coinbase.slice';
import webSocketMiddleware from './middleware/webSocketMiddleware';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    coinbaseSlice: coinbaseSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
