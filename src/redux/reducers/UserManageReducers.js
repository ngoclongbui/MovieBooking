import { TOKEN, USER_INFO } from "../../util/settings/config";
import { TypeUser, UserDetail, UserInfo } from "../../_core/models/UserManage";
import {
  SET_LST_TYPE_USER,
  SET_LST_USER,
  SET_USER_DETAIL,
  SET_USER_INFO,
  SIGN_IN,
} from "../types/UserManageTypes";

let user = {};
if (localStorage.getItem(USER_INFO)) {
  user = JSON.parse(localStorage.getItem(USER_INFO));
}

const initialState = {
  userSignIn: user,
  userInfo: new UserInfo(),
  userDetail: new UserDetail(),
  lstTypeUser: [new TypeUser()],
  lstUser: [],
};

export const UserManageReducers = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { userInfo } = action;
      localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
      localStorage.setItem(TOKEN, userInfo.accessToken);
      return { ...state, userSignIn: userInfo };

    case SET_USER_INFO:
      return { ...state, userInfo: action.userInfo };

    case SET_USER_DETAIL:
      return { ...state, userDetail: action.userDetail };

    case SET_LST_TYPE_USER:
      return { ...state, lstTypeUser: action.lstTypeUser };

    case SET_LST_USER:
      return { ...state, lstUser: action.lstUser };

    default:
      return { ...state };
  }
};
