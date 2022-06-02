/* eslint-disable no-lone-blocks */
import { GROUP } from "../util/settings/config";
import { baseServices } from "./baseService";

export class CinemaManageService extends baseServices {
  constructor() {
    {
      super();
    }
  }
  layThongTinLichChieuHeThongRap = () =>
    this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP}`);

  layThongTinLichChieuPhim = (maPhim) =>
    this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);

  layThongTinHeThongRap = () => this.get("api/QuanLyRap/LayThongTinHeThongRap");

  layThongTinCumRapTheoHeThong = (codeCinemaSystem) =>
    this.get(
      `api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${codeCinemaSystem}`
    );
}

export const cinemaManageService = new CinemaManageService();
