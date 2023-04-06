import { userEntityAdapter } from ".";
import { REQUEST_STATUSES } from "../../../constants/statuses";

export const selectUserModule = (state) => state.user;

const userSelectors = userEntityAdapter.getSelectors(selectUserModule);

export const selectUserById = (state, { userId }) => userSelectors.selectById(state, userId);

export const selectUserIds = (state) => userSelectors.selectIds(state);

export const selectUsers = (state) => userSelectors.selectEntities(state);

export const selectUserLoadingState = (state) => selectUserModule(state).status;

export const selectIsUserLoading = (state) => selectUserLoadingState(state) === REQUEST_STATUSES.pending;

export const selectIsUserLoaded = (state) => selectUserLoadingState(state) === REQUEST_STATUSES.success;
