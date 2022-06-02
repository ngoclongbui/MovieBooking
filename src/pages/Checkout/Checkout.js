/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  bookingTicketAPIAction,
  getLstTicketOfficesAPIAction,
  pickChairAction,
  transferTabAction,
} from "../../redux/actions/TicketManageActions";
import {
  CloseOutlined,
  ArrowLeftOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import "./style.css";
import { NAVIGATE, PAGES, TOKEN, USER_INFO } from "../../util/settings/config";
import { Tabs, Popover, Select } from "antd";
import { getUserInfoAPIAction } from "../../redux/actions/UserManageActions";
import { InfoBooking } from "../../_core/models/TicketManage";
import moment from "moment";
import { TAB_NUMBER } from "../../redux/types/TicketManageTypes";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const { TabPane } = Tabs;

/*---------booking function tab-----------*/
function Booking(props) {
  const { t } = useTranslation();
  const { codeShowTime } = props;

  const dispatch = useDispatch();

  const { userSignIn } = useSelector((state) => state.UserManageReducers);

  const { ticketOfficeDetail, lstUserPick, lstOthersPick } = useSelector(
    (state) => state.TicketManageReducers
  );

  const { thongTinPhim, danhSachGhe } = ticketOfficeDetail;

  /* handle render render cinema map */
  const renderChairMap = () =>
    danhSachGhe.map((seat, index) => {
      let chair = seat.loaiGhe === "Vip" ? "chair chairVIP" : "chair";
      let chairOrdered = seat.daDat ? "chairOrdered" : "";
      let userPick = "";
      let userOrdered = "";
      let othersPick = "";
      let indexOthersPick = lstOthersPick.findIndex(
        (chairPick) => chairPick.maGhe === seat.maGhe
      );
      if (indexOthersPick !== -1) {
        othersPick = "othersPick";
      }
      let indexYourPick = lstUserPick.findIndex(
        (chairPick) => chairPick.maGhe === seat.maGhe
      );
      if (indexYourPick !== -1) {
        userPick = "userPick";
      }
      if (userSignIn.taiKhoan === seat.taiKhoanNguoiDat) {
        userOrdered = "userOrdered";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch(pickChairAction(seat));
            }}
            disabled={seat.daDat || othersPick}
            className={`mb-3 ml-[15px] text-xs ${userPick} ${chair} ${chairOrdered} ${userOrdered} ${othersPick}`}
          >
            {!seat.daDat ? (
              seat.stt
            ) : !userOrdered ? (
              <CloseOutlined style={{ verticalAlign: "1px" }} />
            ) : (
              <UserOutlined style={{ verticalAlign: "1px" }} />
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });

  const renderCinemaMap = () => (
    <Fragment>
      <div className="flex justify-between content-center text-orange-400">
        <h3 className="w-full text-center text-orange-400 font-thin text-2xl">
          {t("cinemaMap")}
        </h3>
      </div>
      <div className="border-b-[10px] border-black" />
      <div className={`screen text-center`}>
        <p className="text-gray-300 text-lg p-3">{t("screen")}</p>
      </div>
      <div className="mt-5 mx-auto w-[735px]">{renderChairMap()}</div>
      <div className="mt-4 mx-auto w-[735px]">
        <button disabled className={`ml-[15px] chair`}>
          <FieldNumberOutlined style={{ verticalAlign: "1px" }} />
        </button>
        <span className="ml-1 mr-3">{t("regularChair")}</span>
        <button disabled className={`ml-[15px] chair chairVIP `}>
          <FieldNumberOutlined style={{ verticalAlign: "1px" }} />
        </button>
        <span className="ml-1 mr-3">{t("vipChair")}</span>
        <button disabled className={`ml-[15px] chair userOrdered`}>
          <UserOutlined style={{ verticalAlign: "1px" }} />
        </button>
        <span className="ml-1 mr-3">{t("yourBooked")}</span>
        <button disabled className={`ml-[15px] chair chairOrdered`}>
          <CloseOutlined style={{ verticalAlign: "1px" }} />
        </button>
        <span className="ml-1 mr-3">{t("othersBooked")}</span>
        <br />
        <button disabled className={`ml-[15px] mt-3 chair userPick`}>
          <FieldNumberOutlined style={{ verticalAlign: "1px" }} />
        </button>
        <span className="ml-1 mr-3">{t("yourChoose")}</span>
      </div>
    </Fragment>
  );

  /* handle render ticket detail */
  const renderBillAmount = () =>
    lstUserPick
      .reduce((amount, chair, index) => (amount += chair.giaVe), 0)
      .toLocaleString();

  const renderListPickChair = () => (
    <span className="w-full flex flex-wrap max-h-28 overflow-y-auto">
      <span className="text-orange-400 mr-1">{t("seatNumber")}:</span>
      {_.sortBy(lstUserPick, ["stt"]).map((chairPick, index) => (
        <span key={index} className="text-green-400 mr-1">
          {chairPick.stt}
        </span>
      ))}
    </span>
  );

  const renderTicketDetail = () => (
    <div className="flex flex-col content-between h-full text-lg">
      <div>
        <h3 className="text-center text-orange-400 font-thin text-2xl">
          {t("bookingInfo")}
        </h3>
        <h3 className="text-center text-green-400">{renderBillAmount()} đ</h3>
        <hr />
        <div className="my-5">
          <h3 className="text-orange-400 font-thin mt-3">
            {t("nameMovie")}: {thongTinPhim.tenPhim}
          </h3>
          <p>
            {t("location")}: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
          </p>
          <p>
            {t("address")}: {thongTinPhim.diaChi}
          </p>
          <p>
            {t("premiereDate")}: {thongTinPhim.ngayChieu} -{" "}
            {thongTinPhim.gioChieu}
          </p>
        </div>
        <hr />
        <div className="my-3">{renderListPickChair()}</div>
        <hr />
        <p className="mt-5">
          {t("email")}: {userSignIn.email}
        </p>
        <p>
          {t("phoneNumber")}: {userSignIn.soDT}
        </p>
        <hr />
      </div>
      <div className="mt-auto mb-0 ">
        <button
          onClick={() => {
            const infoBooking = new InfoBooking();
            infoBooking.maLichChieu = codeShowTime;
            infoBooking.danhSachVe = lstUserPick;
            dispatch(bookingTicketAPIAction(infoBooking));
          }}
          className="w-full text-lg font-thin text-orange-400 rounded-lg border border-orange-400 p-1 transition-all duration-500 hover:text-black hover:bg-orange-300 "
        >
          {t("bookTickets")}
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-12 gap-10 h-full text-gray-300 ">
      <div className="col-span-8">{renderCinemaMap()}</div>
      <div className="col-span-4">{renderTicketDetail()}</div>
    </div>
  );
}

/*---------history function tab-----------*/
export function HistoryBooking(props) {
  const { t } = useTranslation();

  const { userInfo } = useSelector((state) => state.UserManageReducers);

  const { thongTinDatVe } = userInfo;

  const renderHistoryBooking = () =>
    thongTinDatVe.map((ticket, index) => {
      const info = _.first(ticket.danhSachGhe);
      return (
        <div
          key={index}
          className="w-[395px] h-[180px] flex justify-center m-2 rounded-lg shadow-[0px_0px_10px_0px] shadow-slate-500"
        >
          <div className="flex flex-col md:flex-row md:max-w-xl text-black bg-white/60 rounded-lg ">
            <img
              className="w-[120px] h-[180px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
              src={ticket.hinhAnh}
              alt={ticket.tenPhim}
            />
            <div className="w-[275px] p-2">
              <p className="font-bold mb-2">
                {ticket.tenPhim.length > 25 ? (
                  <span>
                    {ticket.tenPhim.slice(0, 25)}{" "}
                    <Popover content={ticket.tenPhim} title={t("nameMovie")}>
                      ...
                    </Popover>
                  </span>
                ) : (
                  ticket.tenPhim
                )}
              </p>
              <p>
                {moment(ticket.ngayDat).format("hh:mm A")} -{" "}
                {moment(ticket.ngayDat).format("DD/MM/YYYY")}
              </p>
              <p>
                {info.tenCumRap} - {info.tenHeThongRap}
              </p>
              <p>
                {t("seatNumber")}:{" "}
                {ticket.danhSachGhe.slice(0, 5).map((chair, index) => (
                  <span key={index} className="mr-2">
                    {chair.tenGhe}
                  </span>
                ))}
                {ticket.danhSachGhe.length > 5 ? (
                  <Popover
                    content={() =>
                      ticket.danhSachGhe.map((chair, index) => (
                        <span key={index} className="mr-2">
                          {chair.tenGhe}
                        </span>
                      ))
                    }
                    title={t("listChair")}
                  >
                    ...
                  </Popover>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div className="w-full flex flex-wrap max-h-[590px] overflow-y-auto">
      {renderHistoryBooking()}
    </div>
  );
}

export default function Checkout() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChangeLangue(value) {
    i18n.changeLanguage(value);
  }

  const codeShowTime = params.id;

  const { userSignIn } = useSelector((state) => state.UserManageReducers);

  const { ticketOfficeDetail, tabActiveKey } = useSelector(
    (state) => state.TicketManageReducers
  );

  const { thongTinPhim } = ticketOfficeDetail;

  useEffect(() => {
    dispatch(getUserInfoAPIAction());
    dispatch(getLstTicketOfficesAPIAction(codeShowTime));
    dispatch(transferTabAction(TAB_NUMBER.TAB01));
  }, []);

  const renderControl = () => (
    <div className="text-right text-orange-400">
      <span
        onClick={() => {
          navigate(NAVIGATE.GO_BACK);
        }}
        className="mr-5 cursor-pointer transition duration-300 hover:text-orange-800"
      >
        <ArrowLeftOutlined style={{ verticalAlign: "1px" }} />
      </span>
      <span
        onClick={() => {
          navigate(PAGES.INDEX);
        }}
        className="mr-5 cursor-pointer transition duration-300 hover:text-orange-800"
      >
        <HomeOutlined style={{ verticalAlign: "1px" }} />
      </span>
      <span
        className="mr-5 cursor-pointer transition duration-300 hover:text-orange-800"
        onClick={() => {
          navigate(`/${PAGES.PROFILE}`);
        }}
      >
        <UserOutlined style={{ verticalAlign: "1px", marginRight: "5px" }} />
        {userSignIn.hoTen}
      </span>
      <span
        className="cursor-pointer align-text-bottom transition duration-300 hover:text-orange-800"
        onClick={() => {
          localStorage.removeItem(USER_INFO);
          localStorage.removeItem(TOKEN);
          navigate(PAGES.INDEX);
          window.location.reload();
        }}
      >
        <LogoutOutlined />
      </span>
      <Select
        className="w-[55px] mt-[2px]"
        defaultValue="vie"
        showArrow={false}
        bordered={false}
        value={i18n.language}
        onChange={handleChangeLangue}
        style={{ color: "rgb(251 146 60)" }}
      >
        <Option value="vie">VIE</Option>
        <Option value="eng">ENG</Option>
        <Option value="chi">CHI</Option>
      </Select>
    </div>
  );

  return (
    <div
      className="checkOut"
      style={{
        background: `url(${thongTinPhim.hinhAnh}) no-repeat center/cover`,
      }}
    >
      <div className="bg-slate-900/[0.7] backdrop-blur-sm min-h-screen flex items-center py-5">
        <div className="container mx-auto font-thin bg-black/[0.8] px-5 pb-5 rounded-xl">
          <Tabs
            activeKey={tabActiveKey}
            tabBarExtraContent={renderControl()}
            onChange={(key) => {
              dispatch(transferTabAction(key));
            }}
            style={{ minHeight: "655px" }}
          >
            <TabPane tab={t("pickAndBooking").toUpperCase()} key="1">
              <Booking codeShowTime={codeShowTime} />
            </TabPane>
            <TabPane tab={t("historyBooking").toUpperCase()} key="2">
              <HistoryBooking />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
