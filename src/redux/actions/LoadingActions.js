import { LOADING } from "../types/LoadingTypes";

export const openLoadingAction = () => ({
  type: LOADING.OPEN,
});

export const closeLoadingAction = () => ({
  type: LOADING.CLOSE,
});
