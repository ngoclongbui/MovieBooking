import React, { useState } from "react";
import { Button } from "antd";
import Movie from "../../../components/Movie/Movie";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  setLstComingMovieAction,
  setLstShowingMovieAction,
} from "../../../redux/actions/MovieManageActions";

export default function HomeLstMovie(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [active, setActive] = useState(true);

  const renderFilms = () =>
    props.lstMovie.map((film, index) => (
      <div className="col-span-2 my-2" key={index}>
        <Movie film={film} />
      </div>
    ));

  return (
    <div className="container my-10 mx-auto">
      <h1 className="font-light text-3xl mb-5 text-[#7C3AED]">
        {t("lstMovie")}
      </h1>
      <div className="flex w-80">
        <Button
          className="mr-2 py-4"
          size="large"
          shape="round"
          type="primary"
          ghost={!active}
          onClick={() => {
            if (!active) {
              dispatch(setLstShowingMovieAction());
              setActive(true);
            }
          }}
        >
          {t("isShowing")}
        </Button>
        <Button
          size="large"
          shape="round"
          type="primary"
          ghost={active}
          onClick={() => {
            if (active) {
              dispatch(setLstComingMovieAction());
              setActive(false);
            }
          }}
        >
          {t("isComing")}
        </Button>
      </div>
      <div className="mt-2 grid grid-cols-6 gap-3 max-h-[500px] overflow-x-hidden overflow-y-auto ">
        {renderFilms()}
      </div>
    </div>
  );
}
