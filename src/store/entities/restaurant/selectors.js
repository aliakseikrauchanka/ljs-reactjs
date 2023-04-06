import { createSelector } from "reselect";
import { REQUEST_STATUSES } from "../../../constants/statuses";

export const selectRestaurantModule = (state) => state.restaurant;

export const selectRestaurantById = (state, { restaurantId }) =>
  selectRestaurantModule(state).entities[restaurantId];

export const selectRestaurantIds = (state) => selectRestaurantModule(state).ids;

export const selectRestaurantEntities = (state) =>
  selectRestaurantModule(state).entities;

// Optimized version of selectRestaurantsFilteredByName selector
export const selectRestaurantsFilteredByName = createSelector(
  [selectRestaurantEntities, (_, { searchValue }) => searchValue],
  (entities, searchValue) => {
    return Object.values(entities).filter(
      ({ name }) => name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );
  }
);

// export const selectRestaurantsFilteredByName = (state, { searchValue }) => {
//   return Object.values(selectRestaurantEntities(state)).filter(
//     ({ name }) => name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
//   );
// }

// creator of select restaurants for the case when we invoke selector for items in the list. Without creator every circle
// selector will be reinvoked and no profit in memoization
export const createSelectRestaurantsFilteredByName = () =>
  createSelector(
    [selectRestaurantEntities, (_, { searchValue }) => searchValue],
    (entities, searchValue) => {
      return Object.values(entities).filter(
        ({ name }) =>
          name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      );
    }
  );

export const selectRestaurantMenuById = (state, { restaurantId }) =>
  selectRestaurantById(state, { restaurantId })?.menu;

export const selectRestaurantReviewsById = (state, { restaurantId }) =>
  selectRestaurantById(state, { restaurantId })?.reviews;

export const selectRestaurantLoadingStatus = (state) =>
  selectRestaurantModule(state).status;

// export const selectRestaurantWithDish = (state, { dishId }) => Object.values(selectRestaurantEntities(state)).filter(restaurant => restaurant.menu.includes(dishId));

export const selectRestaurantWithDish = createSelector([selectRestaurantEntities, (_, { dishId }) => dishId], (entities, dishId) => {
  return Object.values(entities).filter(restaurant => restaurant.menu.includes(dishId));
});


export const selectIsRestaurantLoading = (state) =>
  selectRestaurantLoadingStatus(state) === REQUEST_STATUSES.pending;

export const selectIsRestaurantLoaded = (state) =>
  selectRestaurantLoadingStatus(state) === REQUEST_STATUSES.success;
