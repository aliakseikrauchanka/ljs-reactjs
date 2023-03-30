import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../constants/statuses";
import { loadDishById } from "./thunks/loadDishById";
import { loadDishes } from "./thunks/loadDishes";
import { loadDishesByRestaurantId } from "./thunks/loadDishesByRestaurantId";

export const dishEntityAdapter = createEntityAdapter();

export const dishSlice = createSlice({
  name: "dish",
  initialState: dishEntityAdapter.getInitialState({
    status: REQUEST_STATUSES.idle,
  }),
  extraReducers: (build) =>
    build
      .addCase(loadDishesByRestaurantId.pending, (state) => {
        state.loadingStatus = REQUEST_STATUSES.loading;
      })
      .addCase(loadDishesByRestaurantId.fulfilled, (state, { payload }) => {
        dishEntityAdapter.upsertMany(state, payload);
        state.loadingStatus = REQUEST_STATUSES.success;
      })
      .addCase(loadDishesByRestaurantId.rejected, (state, { payload }) => {
        state.loadingStatus =
          payload === REQUEST_STATUSES.earlyAdded
            ? REQUEST_STATUSES.success
            : REQUEST_STATUSES.failed;
      })
      .addCase(loadDishes.pending, (state) => {
        state.loadingStatus = REQUEST_STATUSES.loading;
      })
      .addCase(loadDishes.fulfilled, (state, { payload }) => {
        dishEntityAdapter.upsertMany(state, payload);
        state.loadingStatus = REQUEST_STATUSES.success;
      })
      .addCase(loadDishes.rejected, (state) => {
        state.loadingStatus = REQUEST_STATUSES.failed;
      })
      .addCase(loadDishById.pending, (state) => {
        state.loadingStatus = REQUEST_STATUSES.loading;
      })
      .addCase(loadDishById.fulfilled, (state, { payload }) => {
        dishEntityAdapter.upsertOne(state, payload);
        state.loadingStatus = REQUEST_STATUSES.success;
      })
      .addCase(loadDishById.rejected, (state, { payload }) => {
        state.loadingStatus =
          payload === REQUEST_STATUSES.earlyAdded
            ? REQUEST_STATUSES.success
            : REQUEST_STATUSES.failed;
      }),
});
