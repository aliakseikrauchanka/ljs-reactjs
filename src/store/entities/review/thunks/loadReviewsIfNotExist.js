import { createAsyncThunk } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../../constants/statuses";
import { selectRestaurantReviewsById } from "../../restaurant/selectors";
import { selectReviewIds } from "../selectors";

export const loadReviewsIfNotExist = createAsyncThunk(
  `review/loadReviewsIfNotExist`,
  async (restaurantId, { getState, rejectWithValue }) => {
    const state = getState();
    const restaurantReviewIds = selectRestaurantReviewsById(state, {
      restaurantId,
    });
    const loadedReviewIds = selectReviewIds(state);

    if (
      restaurantReviewIds.every((restaurantReviewId) =>
        loadedReviewIds.includes(restaurantReviewId)
      )
    ) {
      return rejectWithValue(REQUEST_STATUSES.earlyAdded);
    }

    const response = await fetch(
      `http://localhost:3001/api/reviews?restaurantId=${restaurantId}`
    );

    return await response.json();
  }
);
