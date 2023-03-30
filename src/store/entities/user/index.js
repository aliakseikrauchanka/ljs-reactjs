import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../constants/statuses";
import { loadUserIfNotExist } from "./thunks/loadUsersIfNotExist";

const userEntityAdapter = createEntityAdapter();

export const userSlice = createSlice({
  name: 'user',
  initialState: userEntityAdapter.getInitialState({
    loadingStatus: REQUEST_STATUSES.idle,
  }),
  extraReducers: (builder) =>
    builder
      .addCase(loadUserIfNotExist.pending, (state) => {
        state.loadingStatus = REQUEST_STATUSES.loading;
      })
      .addCase(loadUserIfNotExist.fulfilled, (state, { payload }) => {
        userEntityAdapter.setAll(state, payload);
        state.loadingStatus = REQUEST_STATUSES.success;
      })
      .addCase(loadUserIfNotExist.rejected, (state, { payload }) => {
        state.loadingStatus =
          payload === REQUEST_STATUSES.earlyAdded
            ? REQUEST_STATUSES.success
            : REQUEST_STATUSES.failed;
      }),
});