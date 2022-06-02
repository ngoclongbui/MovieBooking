/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, DatePicker, InputNumber, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  NAVIGATE,
  NOTIFY_TYPE,
  STATUS_CODE,
} from "../../../util/settings/config";
import { cinemaManageService } from "../../../services/CinemaManageServices";
import moment from "moment";
import { ticketManageService } from "../../../services/TicketManageServices";
import { notify } from "../../../util/notification/notification";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ShowTime(props) {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { infoMovieUpdate } = useSelector((state) => state.MovieManageReducers);

  const [cinema, setCinema] = useState({
    cinemaSystem: [],
    cinemaCluster: [],
  });

  useEffect(() => {
    async function getInfoCinemaSystem() {
      try {
        const result = await cinemaManageService.layThongTinHeThongRap();
        setCinema({
          ...cinema,
          cinemaSystem: result.data.content,
        });
      } catch (error) {}
    }
    getInfoCinemaSystem();
  }, []);

  const formik = useFormik({
    initialValues: {
      maPhim: params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    validationSchema: Yup.object().shape({
      ngayChieuGioChieu: Yup.string().required("Please choose date - time"),
      maRap: Yup.string().required("Please choose cinema cluster"),
      giaVe: Yup.string().required("Please input fare"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await ticketManageService.taoLichChieu(values);
        if (result.data.statusCode === STATUS_CODE.SUCCESS) {
          notify(NOTIFY_TYPE.SUCCESS, result.data.content);
        }
      } catch (error) {
        notify(NOTIFY_TYPE.ERROR, error.response?.data.content);
        console.log(error.response?.data);
      }
    },
  });

  const handleChangeCinemaSystem = async (value) => {
    try {
      let result = await cinemaManageService.layThongTinCumRapTheoHeThong(
        value
      );
      setCinema({
        ...cinema,
        cinemaCluster: result.data.content,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleChangeCinemaCluster = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const handleChangeDatePicker = (value, dateString) => {
    formik.setFieldValue("ngayChieuGioChieu", dateString);
  };

  const onOk = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const handleChangePrice = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  return (
    <div className="adminPages relative flex items-center h-full w-full">
      <Form
        onSubmitCapture={formik.handleSubmit}
        className="w-full"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 7,
        }}
        layout="horizontal"
      >
        <Form.Item label={t("nameMovie")}>
          <h3 className="text-2xl mb-1">{infoMovieUpdate.tenPhim}</h3>
        </Form.Item>
        <Form.Item label={t("cinemaSystem")}>
          <Select
            options={cinema.cinemaSystem?.map((item, index) => ({
              label: item.tenHeThongRap,
              value: item.maHeThongRap,
            }))}
            onChange={handleChangeCinemaSystem}
            placeholder="Vui lòng chọn hệ thống rạp"
          />
          <div className="text-red-400 h-3 mb-1" id="feedback">
            {formik.errors.maRap}
          </div>
        </Form.Item>
        <Form.Item label={t("cinemaCluster")}>
          <Select
            options={cinema.cinemaCluster?.map((item, index) => ({
              label: item.tenCumRap,
              value: item.maCumRap,
            }))}
            onChange={handleChangeCinemaCluster}
            placeholder="Vui lòng chọn cụm rạp"
          />
          <div className="text-red-400 h-3 mb-1" id="feedback">
            {formik.errors.maRap}
          </div>
        </Form.Item>
        <Form.Item label={t("dateTime")}>
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            showTime
            onChange={handleChangeDatePicker}
            onOk={onOk}
          />
          <div className="text-red-400 h-3 mb-1" id="feedback">
            {formik.errors.giaVe}
          </div>
        </Form.Item>
        <Form.Item label={t("fare")}>
          <InputNumber
            min={75000}
            max={150000}
            step={5000}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            onChange={handleChangePrice}
          />
          <div className="text-red-400 h-3 mb-1" id="feedback">
            {formik.errors.ngayChieuGioChieu}
          </div>
        </Form.Item>
        <Form.Item label colon={false}>
          <Button
            disabled={
              !formik.isValid ||
              formik.values.maRap === "" ||
              formik.values.giaVe === "" ||
              formik.values.ngayChieuGioChieu === ""
            }
            className="w-34 mr-3"
            htmlType="submit"
            type="primary"
            size="large"
            shape="round"
            ghost
          >
            {t("createShowtime")}
          </Button>
          <Button
            className="w-32 btnDanger"
            size="large"
            shape="round"
            onClick={() => {
              navigate(NAVIGATE.GO_BACK);
            }}
          >
            {t("cancel")}
          </Button>
        </Form.Item>
      </Form>
      <div className="absolute top-[25%] left-[55%]">
        <img
          className="w-auto h-[320px] shadow-[1px_1px_20px_0px] shadow-slate-500 rounded-lg"
          src={infoMovieUpdate.hinhAnh}
          alt={infoMovieUpdate.tenPhim}
        />
      </div>
    </div>
  );
}
