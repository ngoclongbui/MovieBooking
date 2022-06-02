/* eslint-disable no-useless-constructor */
/* eslint-disable no-use-before-define */
export class TicketOfficeDetail {
  thongTinPhim = new ThongTinPhim();
  danhSachGhe = [];
}

export class ThongTinPhim {
  maLichChieu = "";
  tenCumRap = "";
  tenRap = "";
  diaChi = "";
  tenPhim = "";
  hinhAnh = "";
  ngayChieu = "";
  gioChieu = "";
}

export class InfoBooking {
  maLichChieu = 0;
  danhSachVe = [];
  constructor() {}
}
