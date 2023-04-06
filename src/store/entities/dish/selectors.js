import { dishEntityAdapter } from ".";
import { REQUEST_STATUSES } from "../../../constants/statuses";

export const selectDishModule = (state) => state.dish;
const dishSelectors = dishEntityAdapter.getSelectors(selectDishModule);

export const selectDishById = (state, { dishId }) =>
  dishSelectors.selectById(state, dishId);
export const selectDishIds = dishSelectors.selectIds;
export const selectDishes = dishSelectors.selectAll;

export const selectDishesBySearch = (state, { search }) => selectDishes(state).filter(dish => search ? dish.name.toLowerCase().includes(search.toLowerCase()) : true);

export const selectDishLoadingStatus = (state) =>
  selectDishModule(state).status;

export const selectIsDishLoading = (state) =>
  selectDishLoadingStatus(state) === REQUEST_STATUSES.pending;

export const selectIsDishLoaded = (state) =>
  selectDishLoadingStatus(state) === REQUEST_STATUSES.success;
