/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getLstBannerAPIAction } from "../../../../redux/actions/CarouselActions";

export default function HomeCarousel(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLstBannerAPIAction());
  }, []);

  const { arrImg } = useSelector((state) => state.CarouselReducers);

  const renderImg = () =>
    arrImg.map((item, index) => (
      <div key={index}>
        <div
          className="w-screen "
          style={{
            height: "100vh",
            maxHeight: "784px",
            background: `url(${item.hinhAnh}) center center/cover no-repeat`,
          }}
        >
          <div className="w-full h-full flex justify-center items-center backdrop-blur-xl">
            <img
              className="h-[680px] mx-auto shadow-[5px_5px_20px_0px] shadow-slate-500 rounded-lg"
              src={item.hinhAnh}
              alt={item.hinhAnh}
            />
          </div>
        </div>
      </div>
    ));

  return <Carousel autoplay>{renderImg()}</Carousel>;
}
