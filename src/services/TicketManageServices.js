/* eslint-disable no-lone-blocks */
import { baseServices } from "./baseService";

export class TicketManageService extends baseServices {
  constructor() {
    {
      super();
    }
  }
  layDanhSachPhongVe = (showTimeCode) =>
    this.get(`api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeCode}`);

  datVe = (infoBooking) => this.post("api/QuanLyDatVe/DatVe", infoBooking);

  taoLichChieu = (infoNewShowTime) =>
    this.post("api/QuanLyDatVe/TaoLichChieu", infoNewShowTime);
}

export const ticketManageService = new TicketManageService();
