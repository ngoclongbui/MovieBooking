import React, { Fragment } from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { PAGES } from "../../../util/settings/config";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

export default function HomeLstCinema(props) {
  const { t } = useTranslation();

  const renderShowtime = (cinemaCluster) =>
    cinemaCluster.danhSachPhim.map((phim, index) => (
      <Fragment key={index}>
        <div className="flex my-2">
          <img
            className="w-24 h-36"
            src={phim.hinhAnh}
            alt={phim.tenPhim}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "https://picsum.photos/56/56";
            }}
          />
          <div className="ml-2">
            <h1>{phim.tenPhim}</h1>
            <p>{cinemaCluster.diaChi}</p>
            <div className="w-full grid grid-cols-4 gap-x-8 mb-4 max-h-20 overflow-y-auto pr-5">
              {phim.lstLichChieuTheoPhim?.map((lichChieu, index) => (
                <Link
                  className="col-span-1 mb-2"
                  to={`${PAGES.CHECK_OUT}/${lichChieu.maLichChieu}`}
                  key={index}
                >
                  {moment(lichChieu.ngayChieuGioChieu).format(
                    "DD/MM/YYYY - hh:mm A"
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <hr />
      </Fragment>
    ));

  const renderCinemaCluster = (cinemaSystem) => (
    <Tabs tabPosition="left" style={{ height: 460 }}>
      {cinemaSystem.lstCumRap.map((cinemaCluster, index) => (
        <TabPane
          hideAdd={true}
          style={{ height: "460px", overflowY: "scroll" }}
          tab={
            <div className="w-60 text-left">
              <img
                src={cinemaSystem.logo}
                className="rounded-full w-8"
                alt="logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://picsum.photos/48/48";
                }}
              />
              {cinemaCluster.tenCumRap}
            </div>
          }
          key={index}
        >
          {renderShowtime(cinemaCluster)}
        </TabPane>
      ))}
    </Tabs>
  );

  const renderCinemaSystem = () => (
    <Tabs tabPosition="left">
      {props.lstCinema.map((cinemaSystem, index) => (
        <TabPane
          style={{ height: "500px" }}
          tab={
            <img
              src={cinemaSystem.logo}
              className="rounded-full w-12"
              alt="logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/48/48";
              }}
            />
          }
          key={index}
        >
          {renderCinemaCluster(cinemaSystem)}
        </TabPane>
      ))}
    </Tabs>
  );

  return (
    <div className="container mx-auto mb-16">
      <h1 className="font-light text-3xl mb-5 text-[#7C3AED]">
        {t("lstCinema")}
      </h1>
      {renderCinemaSystem()}
    </div>
  );
}
