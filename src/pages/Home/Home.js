/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLstMovieAPIAction,
  setLstShowingMovieAction,
} from "../../redux/actions/MovieManageActions";
import { getLstCinemaAPIAction } from "../../redux/actions/CinemaManageActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import HomeLstMovie from "./HomeLstMovie/HomeLstMovie";
import HomeLstCinema from "./HomeLstCinema/HomeLstCinema";

export default function Home() {
  const dispatch = useDispatch();
  const { lstMovieFilter } = useSelector((state) => state.MovieManageReducers);
  const { lstCinema } = useSelector((state) => state.CinemaManageReducers);

  useEffect(() => {
    async function getAndSetData() {
      dispatch(getLstCinemaAPIAction());
      await dispatch(getLstMovieAPIAction());
      dispatch(setLstShowingMovieAction());
    }
    getAndSetData();
  }, []);

  return (
    <div className="2xl:container mx-auto">
      <HomeCarousel />
      <HomeLstMovie lstMovie={lstMovieFilter} />
      <HomeLstCinema lstCinema={lstCinema} />
    </div>
  );
}
