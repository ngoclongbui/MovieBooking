/* eslint-disable no-lone-blocks */
import { GROUP } from "../util/settings/config";
import { baseServices } from "./baseService";

export class MovieManageServices extends baseServices {
  constructor() {
    {
      super();
    }
  }

  layDanhSachBanner = () => this.get("api/QuanLyPhim/LayDanhSachBanner");

  layDanhSachPhim = () =>
    this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}`);

  layThongTinPhim = (movieCode) =>
    this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${movieCode}`);

  themPhimUploadHinh = (formData) =>
    this.post("api/QuanLyPhim/ThemPhimUploadHinh", formData);

  capNhatPhimUpload = (formData) =>
    this.post("api/QuanLyPhim/CapNhatPhimUpload", formData);

  xoaPhim = (movieCode) =>
    this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${movieCode}`);
}

export const movieManageServices = new MovieManageServices();
