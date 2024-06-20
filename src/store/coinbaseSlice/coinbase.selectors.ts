import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
