import { REQUEST_STATUSES } from "../../../constants/statuses";
import { dishEntityAdapter } from "../dish";

export const selectReviewModule = (state) => state.review;

const reviewSelectors = dishEntityAdapter.getSelectors(selectReviewModule);

export const selectReviewById = (state, { reviewId }) =>
  reviewSelectors.selectById(state, reviewId);

export const selectReviewIds = (state) => reviewSelectors.selectIds(state);

export const selectReviews = (state) => reviewSelectors.selectEntities(state);

export const selectReviewLoadingStatus = (state) =>
  selectReviewModule(state).status;

export const selectIsReviewLoading = (state) =>
  selectReviewLoadingStatus(state) === REQUEST_STATUSES.pending;

export const selectIsReviewLoaded = (state) =>
  selectReviewLoadingStatus(state) === REQUEST_STATUSES.success;
