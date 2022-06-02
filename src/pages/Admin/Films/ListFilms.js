/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from "react";
import { Table, Input, Button, Popconfirm } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieAPIAction,
  getInfoMovieUpdateAPIAction,
  getLstMovieAPIAction,
  setInfoMovieUpdateAction,
} from "../../../redux/actions/MovieManageActions";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../../util/settings/config";
import { InfoMovieUpdate } from "../../../_core/models/MovieManage";
import { useTranslation } from "react-i18next";
const { Search } = Input;

export default function ListFilms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getLstMovieAPIAction());
  }, []);

  const { lstMovie } = useSelector((state) => state.MovieManageReducers);

  const confirm = (value) => {
    console.log(value);
    dispatch(deleteMovieAPIAction(value));
  };

  const columns = [
    {
      title: t("movieCode"),
      dataIndex: "maPhim",
      sorter: {
        compare: (a, b) => a.maPhim - b.maPhim,
        multiple: 1,
      },
      defaultSortOrder: "descend",
      sortDirections: ["ascend", "descend", "ascend"],
      width: 120,
      showSorterTooltip: false,
    },
    {
      title: t("nameMovie"),
      dataIndex: "tenPhim",
      render: (text) => (
        <Fragment>
          {text.length > 30 ? text.substr(0, 30) + "..." : text}
        </Fragment>
      ),
      sorter: {
        compare: (a, b) => {
          let nameA = a.tenPhim.toUpperCase().trim();
          let nameB = b.tenPhim.toUpperCase().trim();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        },
        multiple: 2,
      },
      width: 300,
      showSorterTooltip: false,
    },
    {
      title: t("image"),
      dataIndex: "hinhAnh",
      render: (text, film) => (
        <img src={film.hinhAnh} alt={film.tenPhim} width={50} />
      ),
      width: 120,
    },
    {
      title: t("describe"),
      dataIndex: "moTa",
      render: (text) => (
        <Fragment>
          {text.length > 80 ? text.substr(0, 80) + "..." : text}
        </Fragment>
      ),
    },
    {
      dataIndex: "action",
      render: (text, film) => (
        <div className="text-center">
          <span
            className="text-[20px] text-green-500 opacity-70 cursor-pointer transition duration-500 hover:opacity-100"
            onClick={() => {
              navigate(`${PAGES.SHOWTIME}/${film.maPhim}`);
              dispatch(getInfoMovieUpdateAPIAction(film.maPhim));
              // localStorage.setItem("infoMovie", JSON.stringify(film));
            }}
          >
            <CalendarOutlined />
          </span>
          <span
            className="text-[20px] mx-4 text-sky-500 opacity-70 cursor-pointer transition duration-500 hover:opacity-100"
            onClick={() => {
              navigate(`${PAGES.DETAIL_FILM}/${film.maPhim}`);
            }}
          >
            <EditOutlined />
          </span>
          <Popconfirm
            title={`Are you sure to delete Movie: ${film.tenPhim}`}
            onConfirm={() => {
              confirm(film.maPhim);
            }}
            okText="Yes"
            cancelText="No"
          >
            <span className="text-[20px] text-red-500 opacity-70 cursor-pointer transition duration-500 hover:opacity-100">
              <DeleteOutlined />
            </span>
          </Popconfirm>
        </div>
      ),
      width: 180,
    },
  ];

  const data = lstMovie;

  const onSearch = (value) => console.log(value);
  return (
    <section>
      <div className="flex">
        <Button
          type="primary"
          size="large"
          ghost
          className="mr-3"
          onClick={() => {
            dispatch(setInfoMovieUpdateAction(new InfoMovieUpdate()));
            navigate(PAGES.DETAIL_FILM);
          }}
        >
          {t("addMovie")}
        </Button>
        <Search
          size="large"
          placeholder={t("nameMovie")}
          onSearch={onSearch}
          enterButton={<SearchOutlined style={{ verticalAlign: "1px" }} />}
        />
      </div>
      <Table
        pagination={{ size: "default", style: { marginBottom: "0px" } }}
        className="mt-3"
        columns={columns}
        dataSource={data}
        rowKey="maPhim"
        size={"middle"}
        scroll={{ y: 500 }}
      />
    </section>
  );
}
