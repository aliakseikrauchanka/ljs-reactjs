import { createAsyncThunk } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../../constants/statuses";
import { selectRestaurantMenuById } from "../../restaurant/selectors";
import { selectDishIds } from "../selectors";

export const loadDishesByRestaurantId = createAsyncThunk(
  `dish/loadDishesByRestaurantId`,
  async (restaurantId, { getState, rejectWithValue }) => {
    const state = getState();
    const restaurantDishIds = selectRestaurantMenuById(state, { restaurantId });
    const loadedDishIds = selectDishIds(state);

    if (
      restaurantDishIds.every((restaurantDishId) =>
        loadedDishIds.includes(restaurantDishId)
      )
    ) {
      return rejectWithValue(REQUEST_STATUSES.earlyAdded);
    }

    const response = await fetch(
      `http://localhost:3001/api/products?restaurantId=${restaurantId}`
    );

    return await response.json();
  }
);
