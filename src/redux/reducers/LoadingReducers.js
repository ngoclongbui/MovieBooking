import { LOADING } from "../types/LoadingTypes";

const initialState = {
  isLoading: false,
};

export const LoadingReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING.OPEN:
      return { ...state, isLoading: true };

    case LOADING.CLOSE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
