/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getShowtimeMovieAPIAction } from "../../redux/actions/CinemaManageActions";
import moment from "moment";
import { Rate } from "antd";
import { PAGES } from "../../util/settings/config";
import "./detail.css";

const { TabPane } = Tabs;

export default function Detail(props) {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getShowtimeMovieAPIAction(id));
  }, []);

  const { movieDetail } = useSelector((state) => state.MovieManageReducers);

  return (
    <div
      style={{
        background: `url(${movieDetail.hinhAnh}) no-repeat center/cover`,
      }}
      className="detailMovie min-h-screen text-orange-400"
    >
      <div className="pt-32 bg-black/70 backdrop-blur-xl min-h-screen text-orange-400">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 pb-10">
            <div className="col-span-6 col-start-3">
              <div className="grid grid-cols-2">
                <img
                  className="w-full shadow-[0px_0px_20px_0px] shadow-slate-500 rounded-lg"
                  src={movieDetail.hinhAnh}
                  alt={movieDetail.tenPhim}
                />
                <div className="ml-5">
                  <p>
                    <span>Ngày khởi chiếu: </span>
                    {moment(movieDetail.ngayKhoiChieu).format("DD.MM.yyyy")}
                  </p>
                  <p className="text-2xl">{movieDetail.tenPhim}</p>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col justify-center items-center">
                <div className={`mb-5 c100 p${movieDetail.danhGia * 10} big`}>
                  <span>{movieDetail.danhGia * 10}%</span>
                  <div className="slice">
                    <div className="bar" />
                    <div className="fill" />
                  </div>
                </div>
                <Rate allowHalf value={movieDetail.danhGia / 2} />
              </div>
            </div>
            <div className="col-span-9 col-start-3 mt-20 ">
              <Tabs
                defaultActiveKey="1"
                centered
                className="mb-0 h-[500px]"
                tabBarStyle={{
                  color: "rgb(251 146 60)",
                }}
              >
                <TabPane tab="Lịch chiếu" key="1">
                  {movieDetail.heThongRapChieu?.length < 1 ? (
                    <p className="w-2/3 mx-auto text-xl text-center text-slate-400">
                      Chưa có thông tin lịch chiếu
                    </p>
                  ) : (
                    <Tabs
                      tabPosition={"left"}
                      style={{ height: "400px", overflowY: "auto" }}
                      tabBarGutter="3"
                    >
                      {movieDetail.heThongRapChieu?.map((htr, index) => (
                        <TabPane
                          className="text-slate-400"
                          tab={
                            <div>
                              <img
                                src={htr.logo}
                                className="rounded-full w-12"
                                alt="tab"
                              />
                              {htr.tenHeThongRap}
                            </div>
                          }
                          key={index}
                        >
                          {htr.cumRapChieu?.map((cumRap, index) => (
                            <Fragment key={index}>
                              <div className="flex">
                                <img
                                  className="w-14 h-14 mr-2"
                                  src={cumRap.hinhAnh}
                                  alt={cumRap.tenCumRap}
                                />
                                <div>
                                  <p className="mb-1">{cumRap.tenCumRap}</p>
                                  <p>{cumRap.diaChi}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-4 mb-4 max-h-20 overflow-y-auto">
                                {cumRap.lichChieuPhim?.map(
                                  (lichChieu, index) => (
                                    <Link
                                      className="col-span-1 mb-2"
                                      to={`/${PAGES.CHECK_OUT}/${lichChieu.maLichChieu}`}
                                      key={index}
                                    >
                                      {moment(
                                        lichChieu.ngayChieuGioChieu
                                      ).format("DD/MM/YYYY - hh:mm A")}
                                    </Link>
                                  )
                                )}
                              </div>
                            </Fragment>
                          ))}
                        </TabPane>
                      ))}
                    </Tabs>
                  )}
                </TabPane>
                <TabPane tab="Thông tin" key="2" className="text-slate-400">
                  <p className="w-2/3 mx-auto text-xl">{movieDetail.moTa}</p>
                </TabPane>
                <TabPane tab="Đánh giá" key="3" className="text-slate-400">
                  <p className="w-2/3 mx-auto text-xl text-center">
                    Chưa có đánh giá nào về bộ phim
                  </p>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
