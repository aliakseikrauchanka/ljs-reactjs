import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectIsUserLoading, selectUserIds } from "../selectors";

export const loadUserIfNotExist = createAsyncThunk('user/fetchAll', async (_, { getState, rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3001/api/users/");
    return await response.json();
  } catch (e) {
    return rejectWithValue();
  }

}, {
  condition: (_, { getState }) => {
    const state = getState();
    const userIds = selectUserIds(state);
    const isLoading = selectIsUserLoading(state);

    if (userIds.length || isLoading) {
      return false;
    }
    return true;
  }
});
