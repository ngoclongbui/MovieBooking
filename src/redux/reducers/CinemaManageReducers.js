import { SET_LST_CINEMA } from "../types/CinemaManageTypes";

const initialState = {
  lstCinema: [],
};

export const CinemaManageReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_LST_CINEMA:
      return { ...state, lstCinema: action.lstCinema };
    default:
      return { ...state };
  }
};
