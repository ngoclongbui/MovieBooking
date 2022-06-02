import {
  SET_COMING_MOVIE,
  SET_INFO_MOVIE_UPDATE,
  SET_LST_MOVIE,
  SET_SHOWING_MOVIE,
} from "../types/MovieManageTypes";
import { SET_SHOWTIME_MOVIE } from "../types/CinemaManageTypes";
import { InfoMovieUpdate } from "../../_core/models/MovieManage";

const initialState = {
  lstMovie: [],
  lstMovieFilter: [],
  movieDetail: {},
  infoMovieUpdate: new InfoMovieUpdate(),
};

export const MovieManageReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_LST_MOVIE:
      return { ...state, lstMovie: action.lstMovie };
    case SET_COMING_MOVIE:
      return {
        ...state,
        lstMovieFilter: state.lstMovie.filter((movie) => movie.sapChieu),
      };
    case SET_SHOWING_MOVIE:
      return {
        ...state,
        lstMovieFilter: state.lstMovie.filter((movie) => movie.dangChieu),
      };
    case SET_SHOWTIME_MOVIE:
      return { ...state, movieDetail: action.movieDetail };
    case SET_INFO_MOVIE_UPDATE:
      return { ...state, infoMovieUpdate: action.infoMovieUpdate };
    default:
      return { ...state };
  }
};
