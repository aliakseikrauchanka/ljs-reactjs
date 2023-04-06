import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadDishes = createAsyncThunk("dishes", async (_, { getState, rejectWithValue }) => {
  const response = await fetch('http://localhost:3001/api/products');

  // TODO: check additional parameters and handle error response
  return await response.json();
});
