import { movieManageServices } from "../../services/MovieManageServices";
import { STATUS_CODE } from "../../util/settings/config";
import { SET_BANNER_CAROUSEL } from "../types/CarouselTypes";
/*----------Action Creator-------- */
export const getLstBannerAction = (arrImg) => ({
  type: SET_BANNER_CAROUSEL,
  arrImg,
});

/*-----------Async Action--------- */

/*
12/05/2022
Bui Ngoc Long
Get list banner for carousel
*/

export const getLstBannerAPIAction = () => async (dispatch) => {
  try {
    const result = await movieManageServices.layDanhSachBanner();

    if (result.data.statusCode === STATUS_CODE.SUCCESS) {
      dispatch(getLstBannerAction(result.data.content));
    }
  } catch (error) {}
};
