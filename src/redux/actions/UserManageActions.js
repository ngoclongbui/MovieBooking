import { userManageServices } from "../../services/UserManagerServices";
import { notify } from "../../util/notification/notification";
import {
  NAVIGATE,
  NOTIFY_TYPE,
  PAGES,
  STATUS_CODE,
} from "../../util/settings/config";
import { UserDetail } from "../../_core/models/UserManage";
import {
  SET_LST_TYPE_USER,
  SET_LST_USER,
  SET_USER_DETAIL,
  SET_USER_INFO,
  SIGN_IN,
} from "../types/UserManageTypes";
import { closeLoadingAction, openLoadingAction } from "./LoadingActions";

/*----------Action Creator-------- */
export const signInAction = (userInfo) => ({
  type: SIGN_IN,
  userInfo,
});

export const setUserInfoAction = (userInfo) => ({
  type: SET_USER_INFO,
  userInfo,
});

export const setLstUserAction = (lstUser) => ({
  type: SET_LST_USER,
  lstUser,
});

export const setLstTypeUserAction = (lstTypeUser) => ({
  type: SET_LST_TYPE_USER,
  lstTypeUser,
});

export const setUserDetailAction = (userDetail) => ({
  type: SET_USER_DETAIL,
  userDetail,
});

/*-----------Async Action--------- */

/*
13/05/2022
Bui Ngoc Long
sign in
*/

export const signInAPIAction = (userInfo, navigate) => async (dispatch) => {
  try {
    const result = await userManageServices.dangNhap(userInfo);
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      dispatch(signInAction(result.data.content));
      notify(NOTIFY_TYPE.SUCCESS, result.data.message);
      navigate(NAVIGATE.GO_BACK);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response?.data.content);
  }
};

/*
13/05/2022
Bui Ngoc Long
sign in
*/

export const signUpAPIAction = (userInfo, navigate) => async (dispatch) => {
  try {
    const result = await userManageServices.dangKy(userInfo);
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      notify(NOTIFY_TYPE.SUCCESS, result.data.message);
      navigate(`/${PAGES.SIGN_IN}`);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response?.data.content);
  }
};

/*
13/05/2022
Bui Ngoc Long
get user info
*/

export const getUserInfoAPIAction = () => async (dispatch) => {
  dispatch(openLoadingAction());
  try {
    const result = await userManageServices.thongTinTaiKhoan();
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      await dispatch(setUserInfoAction(result.data.content));
      setTimeout(() => {
        dispatch(closeLoadingAction());
      }, 300);
    }
  } catch (error) {
    setTimeout(() => {
      dispatch(closeLoadingAction());
    }, 300);
  }
};

/*
14/05/2022
Bui Ngoc Long
get lst user
*/

export const getLstUserAPIAction =
  (keyWord = null) =>
  async (dispatch) => {
    dispatch(openLoadingAction());
    try {
      const result = await userManageServices.layDanhSachNguoiDung(keyWord);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        await dispatch(setLstUserAction(result.data.content));
        setTimeout(() => {
          dispatch(closeLoadingAction());
        }, 600);
      }
    } catch (error) {
      setTimeout(() => {
        dispatch(closeLoadingAction());
      }, 600);
    }
  };

/*
17/05/2022
Bui Ngoc Long
get lst type user
*/

export const getLstTypeUserAPIAction = () => async (dispatch) => {
  try {
    const result = await userManageServices.layDanhSachLoaiNguoiDung();
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      dispatch(setLstTypeUserAction(result.data.content));
    }
  } catch (error) {}
};

/*
17/05/2022
Bui Ngoc Long
add user 
*/

export const addUserAPIAction = (useDetail, navigate) => async (dispatch) => {
  dispatch(openLoadingAction());
  try {
    const result = await userManageServices.themNguoiDung(useDetail);
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      dispatch(setUserDetailAction(new UserDetail()));
      notify(NOTIFY_TYPE.SUCCESS, result.data.message);
      navigate(NAVIGATE.GO_BACK);
      setTimeout(() => {
        dispatch(closeLoadingAction());
      }, 600);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response?.data.content);
    setTimeout(() => {
      dispatch(closeLoadingAction());
    }, 600);
  }
};

/*
17/05/2022
Bui Ngoc Long
update user
*/

export const updateUserAPIAction = (userDetail) => async (dispatch) => {
  try {
    const result = await userManageServices.capNhatThongTinNguoiDung(
      userDetail
    );
    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      dispatch(getLstUserAPIAction());
      notify(NOTIFY_TYPE.SUCCESS, result.data.message);
    }
  } catch (error) {
    notify(NOTIFY_TYPE.ERROR, error.response?.data.content);
  }
};

/*
17/05/2022
Bui Ngoc Long
delete user
*/

export const deleteUserAPIAction =
  (userAccount, navigate) => async (dispatch) => {
    try {
      const result = await userManageServices.xoaNguoiDung(userAccount);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        dispatch(getLstUserAPIAction());
        if (navigate) {
          navigate(PAGES.LIST_USERS);
        }
        notify(NOTIFY_TYPE.SUCCESS, result.data.message);
      }
    } catch (error) {
      notify(NOTIFY_TYPE.ERROR, error.response?.data.content);
    }
  };
