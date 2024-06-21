import { TupleArrayType } from './coinbase.types';

export type ICoinbaseState = {
  bids: TupleArrayType;
  asks: TupleArrayType;
  isConnected: boolean;
  increment: number;
  chartData: { time: string; askPrice: number; bidPrice: number }[];
};
