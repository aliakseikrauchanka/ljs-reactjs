import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../constants/statuses";
import { loadReviewsIfNotExist } from "./thunks/loadReviewsIfNotExist";

export const reviewEntityAdapter = createEntityAdapter();

export const reviewSlice = createSlice({
  name: 'review',
  initialState: reviewEntityAdapter.getInitialState({
    loadingStatus: REQUEST_STATUSES.idle,
  }),
  extraReducers: (build) =>
    build
      .addCase(loadReviewsIfNotExist.pending, (state) => {
        state.loadingStatus = REQUEST_STATUSES.loading;
      })
      .addCase(loadReviewsIfNotExist.fulfilled, (state, { payload }) => {
        if (payload?.length) {
          reviewEntityAdapter.upsertMany(state, payload);
        }
        state.loadingStatus = REQUEST_STATUSES.success;
      })
      .addCase(loadReviewsIfNotExist.rejected, (state, { payload }) => {
        state.loadingStatus =
          payload === REQUEST_STATUSES.earlyAdded
            ? REQUEST_STATUSES.success
            : REQUEST_STATUSES.failed;
      }),
});
