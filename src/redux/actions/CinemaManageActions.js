import { cinemaManageService } from "../../services/CinemaManageServices";
import { STATUS_CODE } from "../../util/settings/config";
import { SET_LST_CINEMA, SET_SHOWTIME_MOVIE } from "../types/CinemaManageTypes";

/*----------Action Creator-------- */
export const setLstCinemaAction = (lstCinema) => ({
  type: SET_LST_CINEMA,
  lstCinema,
});

export const setShowtimeMovieAction = (movieDetail) => ({
  type: SET_SHOWTIME_MOVIE,
  movieDetail,
});

/*-----------Async Action--------- */

/*
12/05/2022
Bui Ngoc Long
Get list cinema form API
*/

export const getLstCinemaAPIAction = () => async (dispatch) => {
  try {
    const result = await cinemaManageService.layThongTinLichChieuHeThongRap();
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      dispatch(setLstCinemaAction(result.data.content));
    }
  } catch (error) {
    console.log("getLstCinemaAPIAction", error.response?.data);
  }
};

/*
12/05/2022
Bui Ngoc Long
Get show time movie form API
*/
export const getShowtimeMovieAPIAction = (id) => async (dispatch) => {
  try {
    const result = await cinemaManageService.layThongTinLichChieuPhim(id);
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      dispatch(setShowtimeMovieAction(result.data.content));
    }
  } catch (error) {
    console.log("getShowtimeMovieAPIAction", error.response?.data);
  }
};
