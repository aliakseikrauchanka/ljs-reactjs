import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../constants/statuses";
import { loadDishes } from "./thunks/loadDishes";
import { loadDishIfNotExist } from "./thunks/loadDishIfNotExist";

export const dishEntityAdapter = createEntityAdapter();

export const dishSlice = createSlice({
  name: "dish",
  initialState: dishEntityAdapter.getInitialState({
    status: REQUEST_STATUSES.idle,
  }),
  reducers: {
    startLoading: (state) => {
      state.status = REQUEST_STATUSES.pending;
    },
    failLoading: (state) => {
      state.status = REQUEST_STATUSES.failed;
    },
    finishLoading: (state, { payload }) => {
      dishEntityAdapter.setMany(state, payload);
      state.status = REQUEST_STATUSES.success;
    },
  },
  extraReducers: (build) =>
    build
      .addCase(loadDishes.pending, (state) => {
        state.status = REQUEST_STATUSES.pending;
      })
      .addCase(loadDishes.fulfilled, (state, { payload }) => {
        dishEntityAdapter.setMany(state, payload);
        state.status = REQUEST_STATUSES.success
      })
      .addCase(loadDishes.rejected, state => {
        state.status = REQUEST_STATUSES.failed
      })
      .addCase(loadDishIfNotExist.pending, (state) => {
        state.status = REQUEST_STATUSES.pending;
      })
      .addCase(loadDishIfNotExist.rejected, (state, { payload }) => {
        state.status = payload === REQUEST_STATUSES.earlyLoaded ? REQUEST_STATUSES.success : REQUEST_STATUSES.failed;
      })
      .addCase(loadDishIfNotExist.fulfilled, (state, { payload }) => {
        dishEntityAdapter.setOne(state, payload);
        state.status = REQUEST_STATUSES.success;
      })
});

export const dishActions = dishSlice.actions;
