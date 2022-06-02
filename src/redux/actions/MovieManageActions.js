import { movieManageServices } from "../../services/MovieManageServices";
import { notify } from "../../util/notification/notification";
import { NOTIFY_TYPE, PAGES, STATUS_CODE } from "../../util/settings/config";
import {
  SET_COMING_MOVIE,
  SET_INFO_MOVIE_UPDATE,
  SET_LST_MOVIE,
  SET_SHOWING_MOVIE,
} from "../types/MovieManageTypes";
import { closeLoadingAction, openLoadingAction } from "./LoadingActions";

/*----------Action Creator-------- */
export const setLstMovieAction = (lstMovie) => ({
  type: SET_LST_MOVIE,
  lstMovie,
});

export const setInfoMovieUpdateAction = (infoMovieUpdate) => ({
  type: SET_INFO_MOVIE_UPDATE,
  infoMovieUpdate,
});

export const setLstShowingMovieAction = () => ({
  type: SET_SHOWING_MOVIE,
});

export const setLstComingMovieAction = () => ({
  type: SET_COMING_MOVIE,
});

/*-----------Async Action--------- */

/*
12/05/2022
Bui Ngoc Long
get list movie from api
*/

export const getLstMovieAPIAction = () => async (dispatch) => {
  dispatch(openLoadingAction());
  try {
    const result = await movieManageServices.layDanhSachPhim();
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      await dispatch(setLstMovieAction(result.data.content));
      setTimeout(() => {
        dispatch(closeLoadingAction());
      }, 800);
    }
  } catch (error) {}
};

/*
15/05/2022
Bui Ngoc Long
get list movie from api
*/

export const addMovieAPIAction = (formData, navigate) => async (dispatch) => {
  try {
    const result = await movieManageServices.themPhimUploadHinh(formData);
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      notify(NOTIFY_TYPE.SUCCESS, result.data.message);
      if (navigate) {
        navigate(PAGES.LIST_FILMS);
      }
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response?.data.content);
  }
};

/*
15/05/2022
Bui Ngoc Long
get info movie update from api
*/

export const getInfoMovieUpdateAPIAction = (codeMovie) => async (dispatch) => {
  try {
    const result = await movieManageServices.layThongTinPhim(codeMovie);
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      dispatch(setInfoMovieUpdateAction(result.data.content));
    }
  } catch (error) {}
};

/*
16/05/2022
Bui Ngoc Long
update movie 
*/

export const updateMovieAPIAction = (formData) => async (dispatch) => {
  try {
    const result = await movieManageServices.capNhatPhimUpload(formData);
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      console.log(result.data);
      notify(NOTIFY_TYPE.SUCCESS, result.data.message);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response?.data.content);
  }
};

/*
16/05/2022
Bui Ngoc Long
delete movie
*/

export const deleteMovieAPIAction = (movieCode) => async (dispatch) => {
  try {
    const result = await movieManageServices.xoaPhim(movieCode);
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      dispatch(getLstMovieAPIAction());
      notify(NOTIFY_TYPE.SUCCESS, result.data.message);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response?.data.content);
  }
};
