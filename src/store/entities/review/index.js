import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../constants/statuses";
import { loadReviewsIfNotExist } from "./thunks/loadReviewsIfNotExist";

// const initialState = {
//   entities: {},
//   ids: [],
//   status: REQUEST_STATUSES.idle,
// };

const reviewsAdapter = createEntityAdapter({
  status: REQUEST_STATUSES.idle,
});

export const reviewSlice = createSlice({
  name: "review",
  initialState: reviewsAdapter.getInitialState(),
  extraReducers: build => build
    .addCase(loadReviewsIfNotExist.rejected, (state, payload) => {
      state.status = payload === REQUEST_STATUSES.earlyLoaded ? REQUEST_STATUSES.success : REQUEST_STATUSES.failed;
    })
    .addCase(loadReviewsIfNotExist.pending, (state) => {
      state.status = REQUEST_STATUSES.pending;
    })
    .addCase(loadReviewsIfNotExist.fulfilled, (state, payload) => {
      state.status = REQUEST_STATUSES.success;
      reviewsAdapter.setMany(state, payload);
    })
});

export const reviewActions = reviewSlice.actions;
