/* eslint-disable no-lone-blocks */
import { GROUP } from "../util/settings/config";
import { baseServices } from "./baseService";
export class UserManageServices extends baseServices {
  constructor() {
    {
      super();
    }
  }

  dangNhap = (thongTinDangNhap) =>
    this.post("api/QuanLyNguoiDung/DangNhap", thongTinDangNhap);

  dangKy = (userInfo) => this.post("api/QuanLyNguoiDung/DangKy", userInfo);

  thongTinTaiKhoan = () => this.post("api/QuanLyNguoiDung/ThongTinTaiKhoan");

  layDanhSachNguoiDung = (keyWord) =>
    !keyWord
      ? this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}`)
      : this.get(
          `api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}&tuKhoa=${keyWord}`
        );

  xoaNguoiDung = (accountUser) =>
    this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${accountUser}`);

  layDanhSachLoaiNguoiDung = () =>
    this.get("api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");

  themNguoiDung = (userDetail) =>
    this.post("api/QuanLyNguoiDung/ThemNguoiDung", userDetail);

  capNhatThongTinNguoiDung = (userDetail, method) =>
    method === "put"
      ? this.put("api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userDetail)
      : this.post("api/QuanLyNguoiDung/CapNhatThongTinNguoiDung", userDetail);
}

export const userManageServices = new UserManageServices();
