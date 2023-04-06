import { createAsyncThunk } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../../constants/statuses";
import { selectDishById } from "../selectors";

export const loadDishIfNotExist = createAsyncThunk('dish/fetchOne', async ({ dishId }, { getState, rejectWithValue }) => {
  const state = getState();
  if (selectDishById(state, { dishId })) {
    return rejectWithValue(REQUEST_STATUSES.earlyLoaded);
  }

  const response = await fetch(`http://localhost:3001/api/products?productId=${dishId}`);
  return await response.json();
});
