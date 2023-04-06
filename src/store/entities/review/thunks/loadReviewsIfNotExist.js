import { createAsyncThunk } from "@reduxjs/toolkit";
import { reviewSlice } from "..";
import { REQUEST_STATUSES } from "../../../../constants/statuses";
import { selectRestaurantReviewsById } from "../../restaurant/selectors";
import { selectReviewIds } from "../selectors";

export const loadReviewsIfNotExist = createAsyncThunk('review/fetchForRestaurant', async (restaurantId, { getState, rejectWithValue }) => {
  const state = getState();

  const restaurantReviewIds = selectRestaurantReviewsById(state, { restaurantId });
  const reviewIds = selectReviewIds(state);

  if (restaurantReviewIds.every((id) => reviewIds.includes(id))) {
    return rejectWithValue(REQUEST_STATUSES.earlyLoaded);
  }

  try {
    const response = await fetch(`http://localhost:3001/api/reviews?restaurantId=${restaurantId}`);
    return await response.json();
  } catch (e) {
    return rejectWithValue(REQUEST_STATUSES.failed);
  }
});
