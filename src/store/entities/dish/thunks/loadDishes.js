import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadDishes = createAsyncThunk(`dish/loadDishes`, async () => {
  const response = await fetch(`http://localhost:3001/api/products`);

  return await response.json();
});
