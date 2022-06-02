/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Switch,
  Upload,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UploadOutlined, CalendarOutlined } from "@ant-design/icons";
import {
  addMovieAPIAction,
  deleteMovieAPIAction,
  getInfoMovieUpdateAPIAction,
  setInfoMovieUpdateAction,
  updateMovieAPIAction,
} from "../../../redux/actions/MovieManageActions";
import { PAGES } from "../../../util/settings/config";
import { InfoMovieUpdate } from "../../../_core/models/MovieManage";
import { useTranslation } from "react-i18next";

export default function DetailFilm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { t } = useTranslation();

  const [statusPages, setStatusPages] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [checked, setChecked] = useState(false);

  const { infoMovieUpdate } = useSelector((state) => state.MovieManageReducers);

  useEffect(() => {
    switch (location.pathname) {
      case PAGES.DETAIL_FILM:
        dispatch(setInfoMovieUpdateAction(new InfoMovieUpdate()));
        setImgSrc(null);
        setStatusPages(false);
        return;
      case `${PAGES.DETAIL_FILM}/${params.id}`:
        dispatch(getInfoMovieUpdateAPIAction(params.id));
        setStatusPages(true);
        return;

      default:
        return;
    }
  }, [location]);

  const formik = useFormik({
    enableReinitialize: statusPages,
    initialValues: {
      maPhim: infoMovieUpdate.maPhim,
      tenPhim: infoMovieUpdate.tenPhim,
      trailer: infoMovieUpdate.trailer,
      moTa: infoMovieUpdate.moTa,
      ngayKhoiChieu: infoMovieUpdate.ngayKhoiChieu,
      dangChieu: infoMovieUpdate.dangChieu,
      sapChieu: infoMovieUpdate.sapChieu,
      hot: infoMovieUpdate.hot,
      danhGia: infoMovieUpdate.danhGia,
      hinhAnh: null,
      maNhom: infoMovieUpdate.maNhom,
    },

    validationSchema: Yup.object().shape({
      tenPhim: Yup.string().required("Please input name movie"),
      trailer: Yup.string().required("Please input trailer movie"),
      moTa: Yup.string().required("Please input describe movie"),
      ngayKhoiChieu: Yup.string().required("Please choose premiere date"),
      hinhAnh: !statusPages
        ? Yup.mixed().required("Please upload a picture")
        : "",
    }),

    onSubmit: (values) => {
      console.log(values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append(key, values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      statusPages
        ? dispatch(updateMovieAPIAction(formData))
        : dispatch(addMovieAPIAction(formData, navigate));
    },
  });

  const handleChangeFormData = (name) => {
    return (value) => {
      switch (name) {
        case "dangChieu":
          setChecked(!value);
          formik.setFieldValue(name, checked);
          formik.setFieldValue("sapChieu", !checked);
          return;

        case "sapChieu":
          setChecked(value);
          formik.setFieldValue(name, !checked);
          formik.setFieldValue("dangChieu", checked);
          return;

        case "ngayKhoiChieu":
          formik.setFieldValue(name, moment(value).format("DD/MM/YYYY"));
          return;

        case "hinhAnh":
          async function handleChangeImg() {
            let file = value.file.originFileObj;
            let reader = new FileReader();
            await formik.setFieldValue(name, file);
            reader.readAsDataURL(file);
            reader.onload = (e) => {
              setImgSrc(e.target.result);
            };
          }
          handleChangeImg();
          return;

        default:
          formik.setFieldValue(name, value);
          return;
      }
    };
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const confirm = (value) => {
    navigate(PAGES.LIST_FILMS);
    dispatch(deleteMovieAPIAction(value));
  };

  return (
    <div className="adminPages relative flex items-center h-full w-full">
      <Form
        onSubmitCapture={formik.handleSubmit}
        className="w-full"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        layout="horizontal"
      >
        <Form.Item label={t("nameMovie")}>
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
          <div className="text-red-400 h-3 mb-1" id="feedback">
            {formik.errors.tenPhim}
          </div>
        </Form.Item>
        <Form.Item label={t("trailer")}>
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
          <div className="text-red-400 h-3 mb-1" id="feedback">
            {formik.errors.trailer}
          </div>
        </Form.Item>
        <Form.Item label={t("describe")}>
          <Input.TextArea
            name="moTa"
            rows={4}
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
          <div className="text-red-400 h-3 mb-1" id="feedback">
            {formik.errors.moTa}
          </div>
        </Form.Item>
        <Form.Item label={t("premiereDate")}>
          {statusPages ? (
            <DatePicker
              format={"DD/MM/YYYY"}
              placeholder={t("selectDate")}
              value={moment(formik.values.ngayKhoiChieu, "DD-MM-YYYY")}
              onChange={handleChangeFormData("ngayKhoiChieu")}
              allowClear={false}
            />
          ) : (
            <DatePicker
              format={"DD/MM/YYYY"}
              placeholder={t("selectDate")}
              onChange={handleChangeFormData("ngayKhoiChieu")}
              allowClear={false}
            />
          )}
          <div className="text-red-400 h-3 mb-1" id="feedback">
            {formik.errors.ngayKhoiChieu}
          </div>
        </Form.Item>
        <Form.Item label={t("showing")} valuePropName="checked">
          <Switch
            checked={!checked}
            onChange={handleChangeFormData("dangChieu")}
            defaultChecked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label={t("coming")} valuePropName="checked">
          <Switch
            checked={checked}
            onChange={handleChangeFormData("sapChieu")}
            defaultChecked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="HOT" valuePropName="checked">
          <Switch
            onChange={handleChangeFormData("hot")}
            defaultChecked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label={t("vote")}>
          <InputNumber
            min={1}
            max={10}
            onChange={handleChangeFormData("danhGia")}
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label={t("image")}>
          <Upload
            customRequest={dummyRequest}
            onChange={handleChangeFormData("hinhAnh")}
            maxCount={1}
            showUploadList={false}
            accept="image/png, image/jpeg, image/jpg"
          >
            <Button icon={<UploadOutlined style={{ verticalAlign: "1px" }} />}>
              {t("chooseImg")}
            </Button>
          </Upload>
          <div className="text-red-400 h-3 mb-1" id="feedback">
            {formik.errors.hinhAnh}
          </div>
        </Form.Item>
        <Form.Item label colon={false}>
          <div className="flex justify-between mt-3">
            <div>
              <Button
                disabled={
                  !formik.isValid ||
                  formik.values.tenPhim === "" ||
                  formik.values.trailer === "" ||
                  formik.values.moTa === "" ||
                  formik.values.ngayKhoiChieu === "" ||
                  formik.values.hinhAnh === ""
                }
                className="w-28 mr-3"
                htmlType="submit"
                type="primary"
                ghost
                size="large"
                shape="round"
              >
                {statusPages ? t("update") : t("addNew")}
              </Button>
              <Button
                className="w-28 btnDanger"
                size="large"
                shape="round"
                onClick={() => {
                  navigate(PAGES.LIST_FILMS);
                }}
              >
                {t("cancel")}
              </Button>
            </div>
            {statusPages ? (
              <div>
                <Button
                  className="mr-3 btnSuccess"
                  type="link"
                  size="large"
                  icon={<CalendarOutlined />}
                  onClick={() => {
                    navigate(`${PAGES.SHOWTIME}/${formik.values.maPhim}`);
                  }}
                />
                <Popconfirm
                  title={`Are you sure to delete Movie: ${formik.values.tenPhim}`}
                  onConfirm={() => {
                    confirm(formik.values.maPhim);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="link"
                    size="large"
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              </div>
            ) : null}
          </div>
        </Form.Item>
      </Form>
      <div className="absolute top-[40%] left-[50%]">
        {statusPages ? (
          <img
            className="w-auto h-[270px] shadow-[1px_1px_20px_0px] shadow-slate-500 rounded-lg"
            src={!imgSrc ? infoMovieUpdate.hinhAnh : imgSrc}
            alt="banner"
          />
        ) : imgSrc ? (
          <img
            className="w-auto h-[220px] rounded-lg shadow-[1px_1px_20px_0px] shadow-slate-500"
            src={imgSrc}
            alt="banner"
          />
        ) : null}
      </div>
    </div>
  );
}
