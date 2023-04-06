import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../constants/statuses";
import { loadUserIfNotExist } from "./thunks/loadUsersIfNotExist";


export const userEntityAdapter = createEntityAdapter({
  status: REQUEST_STATUSES.idle,
})

export const userSlice = createSlice({
  name: "user",
  initialState: userEntityAdapter.getInitialState(),
  reducers: {
    startLoading: (state) => {
      state.status = REQUEST_STATUSES.pending;
    },
    failLoading: (state) => {
      state.status = REQUEST_STATUSES.failed;
    },
    finishLoading: (state, { payload }) => {
      userEntityAdapter.setMany(state, payload);
      state.status = REQUEST_STATUSES.success;
    },
  },
  extraReducers: build => build
    .addCase(loadUserIfNotExist.rejected, (state) => {
      state.status = REQUEST_STATUSES.failed
    })
    .addCase(loadUserIfNotExist.pending, (state) => {
      state.status = REQUEST_STATUSES.pending;
    })
    .addCase(loadUserIfNotExist.fulfilled, (state, payload) => {
      state.status = REQUEST_STATUSES.success;
      userEntityAdapter.addMany(state, payload);
    })
});
