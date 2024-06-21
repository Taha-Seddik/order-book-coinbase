import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { aggregateOrders, sortOrders } from '../../utils/coinbase.utils';

export const selectBestBidDetails = createSelector(
  (state: RootState) => state.coinbaseState.bids,
  (bids) => {
    if (!bids?.[0]) return null;
    return {
      bestQte: bids[0][1],
      bestPrice: bids[0][0],
    };
  },
);

export const selectBestAskDetails = createSelector(
  (state: RootState) => state.coinbaseState.asks,
  (asks) => {
    if (!asks?.[0]) return null;
    return {
      bestQte: asks[0][1],
      bestPrice: asks[0][0],
    };
  },
);

export const selectAggregatedBids = createSelector(
  (state: RootState) => state.coinbaseState.bids,
  (state: RootState) => state.coinbaseState.increment,
  (bids, increment) => {
    if (!bids?.length) return [];
    const groupedBids = aggregateOrders(bids, increment).slice(0, 10);
    return sortOrders(groupedBids, true);
  },
);

export const selectAggregatedAsks = createSelector(
  (state: RootState) => state.coinbaseState.asks,
  (state: RootState) => state.coinbaseState.increment,
  (asks, increment) => {
    if (!asks?.length) return [];
    const groupedBids = aggregateOrders(asks, increment).slice(0, 10);
    return sortOrders(groupedBids, false);
  },
);
