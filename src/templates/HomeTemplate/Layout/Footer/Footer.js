/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getLstCinemaAPIAction } from "../../../../redux/actions/CinemaManageActions";
import { useTranslation } from "react-i18next";
import { PAGES } from "../../../../util/settings/config";

export default function Footer(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { lstCinema } = useSelector((state) => state.CinemaManageReducers);

  const arrHeThongRap = _.map(lstCinema, (heThongRap) =>
    _.pick(heThongRap, ["maHeThongRap", "tenHeThongRap", "logo"])
  );

  useEffect(() => {
    dispatch(getLstCinemaAPIAction());
  }, []);

  return (
    <footer className="py-6 dark:bg-coolGray-800 dark:text-coolGray-50 bg-slate-900 ">
      <div className="container mx-auto space-y-6 divide-y divide-coolGray-400 divide-opacity-50">
        <div className="grid grid-cols-12 items-center">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6 ">
            <Link
              to={PAGES.INDEX}
              aria-label="Back to homepage"
              className="flex justify-center space-x-3 md:justify-start"
            >
              <div className="flex items-center justify-center w-16 h-16 ">
                <img
                  className="h-full rounded-full"
                  src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-1/48370078_1053884018132590_7661979321124257792_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=1&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=W3uVm6JBQSkAX9hBQVt&_nc_ht=scontent.fsgn5-3.fna&oh=00_AT9PaG9hwcZ698rd9bt99prUP-WhmrQP1KeXmPIkS-_kTw&oe=629898A9"
                  alt="logo"
                />
              </div>
              <span className="self-center text-2xl font-light text-indigo-300">
                Movie booking
              </span>
            </Link>
          </div>
          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="pb-1 mb-1 text-lg font-light text-indigo-300">
              {t("partner").toUpperCase()}
            </p>
            <div className="flex">
              {arrHeThongRap.map((htr, index) => (
                <div key={index} className="mr-4">
                  <img
                    src={htr.logo}
                    alt={htr.ten}
                    className="hover:dark:text-violet-400 w-12"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center pt-6 m-0">
          <span className="text-indigo-300">©2022 All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
