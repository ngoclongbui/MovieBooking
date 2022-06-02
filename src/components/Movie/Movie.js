import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Popover } from "antd";
import { PAGES } from "../../util/settings/config";
import { useTranslation } from "react-i18next";

export default function Movie(props) {
  const { t } = useTranslation();
  const { film } = props;
  const navigate = useNavigate();

  return (
    <div className="w-[414px] flex justify-center">
      <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white/[0.2] shadow-lg">
        <img
          className="w-[174px] h-[230px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={film.hinhAnh}
          alt={film.tenPhim}
        />
        <div className="w-[240px] p-6 grid grid-cols-1 content-between justify-center">
          <div>
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              {film.tenPhim.length > 25 ? (
                <span>
                  {film.tenPhim.slice(0, 25)}
                  <Popover content={film.tenPhim} title={t("nameMovie")}>
                    ...
                  </Popover>
                </span>
              ) : (
                film.tenPhim
              )}
            </h5>
            <p className="text-gray-700 text-base mb-4">
              {film.moTa.length > 40 ? (
                <span>{film.moTa.slice(0, 40)}...</span>
              ) : (
                film.moTa
              )}
            </p>
          </div>
          <Button
            className="w-32 mx-auto"
            onClick={() => {
              navigate(`${PAGES.DETAIL}/${film.maPhim}`);
            }}
            shape="round"
            type="primary"
            ghost={true}
          >
            {t("bookTickets")}
          </Button>
        </div>
      </div>
    </div>
  );
}
