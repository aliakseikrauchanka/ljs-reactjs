import { createSelector } from "reselect";

export const selectCartModule = (state) => state.cart;

export const selectDishCount = (state, { dishId }) =>
  selectCartModule(state)[dishId] || 0;

export const selectCartIds = createSelector(selectCartModule, (state) =>
  Object.keys(state)
);
