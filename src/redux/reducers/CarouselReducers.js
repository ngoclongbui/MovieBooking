import { SET_BANNER_CAROUSEL } from "../types/CarouselTypes";

const initialState = {
  arrImg: [],
};

export const CarouselReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_BANNER_CAROUSEL:
      return { ...state, arrImg: action.arrImg };

    default:
      return state;
  }
};
