import { TicketOfficeDetail } from "../../_core/models/TicketManage";
import {
  CLEAR_YOUR_CHAIR,
  LOAD_LST_CHAIR_OTHERS_PICK,
  PICK_CHAIR,
  SET_LST_TICKET_OFFICES,
  TRANSFER_TAB,
} from "../types/TicketManageTypes";

const initialState = {
  ticketOfficeDetail: new TicketOfficeDetail(),
  lstUserPick: [],
  lstOthersPick: [],
  tabActiveKey: "1",
};

export const TicketManageReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_LST_TICKET_OFFICES:
      return { ...state, ticketOfficeDetail: action.ticketOfficeDetail };

    case PICK_CHAIR:
      let lstUserPickUpdate = [...state.lstUserPick];
      let index = lstUserPickUpdate.findIndex(
        (chair) => chair.maGhe === action.chairPick.maGhe
      );
      if (index !== -1) {
        lstUserPickUpdate.splice(index, 1);
      } else {
        lstUserPickUpdate.push(action.chairPick);
      }
      return { ...state, lstUserPick: [...lstUserPickUpdate] };

    case CLEAR_YOUR_CHAIR:
      return { ...state, lstUserPick: [] };

    case LOAD_LST_CHAIR_OTHERS_PICK:
      return { ...state, lstOthersPick: action.lstOthersPick };

    case TRANSFER_TAB:
      return { ...state, tabActiveKey: action.tabNumber };

    default:
      return { ...state };
  }
};
