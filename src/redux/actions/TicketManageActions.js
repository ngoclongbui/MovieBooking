// import { connection } from "../..";
import { ticketManageService } from "../../services/TicketManageServices";
import { notify } from "../../util/notification/notification";
import { NOTIFY_TYPE, STATUS_CODE } from "../../util/settings/config";
import { InfoBooking } from "../../_core/models/TicketManage";
import {
  CLEAR_YOUR_CHAIR,
  LOAD_LST_CHAIR_OTHERS_PICK,
  PICK_CHAIR,
  SET_LST_TICKET_OFFICES,
  TAB_NUMBER,
  TRANSFER_TAB,
} from "../types/TicketManageTypes";
import { closeLoadingAction, openLoadingAction } from "./LoadingActions";
import { getUserInfoAPIAction } from "./UserManageActions";

/*----------Action Creator-------- */
export const setLstTicketOfficeAction = (ticketOfficeDetail) => ({
  type: SET_LST_TICKET_OFFICES,
  ticketOfficeDetail,
});

export const pickChairAction = (chairPick) => ({
  type: PICK_CHAIR,
  chairPick,
});

export const clearPickChairAction = () => ({
  type: CLEAR_YOUR_CHAIR,
});

export const transferTabAction = (tabNumber) => ({
  type: TRANSFER_TAB,
  tabNumber,
});

export const loadLstChairOthersPickAction = (lstOthersPick) => ({
  type: LOAD_LST_CHAIR_OTHERS_PICK,
  lstOthersPick,
});

/*-----------Async Action--------- */

/*
12/05/2022
Bui Ngoc Long
Get list ticket offices form API
*/

export const getLstTicketOfficesAPIAction =
  (showTimeCode) => async (dispatch) => {
    dispatch(openLoadingAction());
    try {
      const result = await ticketManageService.layDanhSachPhongVe(showTimeCode);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        await dispatch(setLstTicketOfficeAction(result.data.content));
        dispatch(closeLoadingAction());
      }
    } catch (error) {
      dispatch(closeLoadingAction());
    }
  };

/*
12/05/2022
Bui Ngoc Long
booking ticket
*/

export const bookingTicketAPIAction =
  (infoBooking = new InfoBooking()) =>
  async (dispatch, getState) => {
    dispatch(openLoadingAction());
    try {
      const result = await ticketManageService.datVe(infoBooking);
      if (result.data.statusCode === STATUS_CODE.SUCCESS) {
        notify(NOTIFY_TYPE.SUCCESS, result.data.content);
        await dispatch(getLstTicketOfficesAPIAction(infoBooking.maLichChieu));
        await dispatch(getUserInfoAPIAction());
        await dispatch(clearPickChairAction());
        await dispatch(closeLoadingAction());
        dispatch(transferTabAction(TAB_NUMBER.TAB02));
      }
    } catch (error) {
      notify(NOTIFY_TYPE.ERROR, error.response?.data.content);
      dispatch(closeLoadingAction());
    }
  };
