import { TupleArrayType } from './coinbase.types';

export type ICoinbaseState = {
  bids: TupleArrayType;
  asks: TupleArrayType;
  isConnected: boolean;
  increment: number;
};
