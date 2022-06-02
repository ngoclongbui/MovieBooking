/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { GROUP, PAGES } from "../../../util/settings/config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, InputNumber, Select, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAPIAction,
  deleteUserAPIAction,
  getUserInfoAPIAction,
  setUserDetailAction,
  updateUserAPIAction,
} from "../../../redux/actions/UserManageActions";
import { UserDetail } from "../../../_core/models/UserManage";
import { useTranslation } from "react-i18next";

export default function DetailUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { t } = useTranslation();

  const { userDetail, lstTypeUser, userInfo } = useSelector(
    (state) => state.UserManageReducers
  );

  const [statusPages, setStatusPages] = useState(false);

  useEffect(() => {
    dispatch(getUserInfoAPIAction());
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case PAGES.DETAIL_USER:
        dispatch(setUserDetailAction(new UserDetail()));
        setStatusPages(false);
        return;
      case `${PAGES.DETAIL_USER}/${params.account}`:
        setStatusPages(true);
        return;

      default:
        return;
    }
  }, [location]);

  const nameRegExp = RegExp(
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
  );
  const phoneRegExp = RegExp(/^[0-9]+$/);
  const emailRegExp = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const formik = useFormik({
    enableReinitialize: statusPages,
    initialValues: {
      taiKhoan: userDetail.taiKhoan,
      matKhau: userDetail.matKhau,
      xacNhanMatKhau: userDetail.matKhau,
      hoTen: userDetail.hoTen,
      email: userDetail.email,
      soDt: userDetail.soDt,
      maLoaiNguoiDung: statusPages
        ? userDetail.maLoaiNguoiDung
        : lstTypeUser[0].maLoaiNguoiDung,
      maNhom: GROUP,
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .matches(emailRegExp, "Invalid email address")
        .email("Invalid email address"),
      hoTen: Yup.string().matches(nameRegExp, "Please enter valid name"),
      soDt: Yup.string()
        .min(9, "Phone much have min 10 number")
        .max(11, "Must be 11 number or less")
        .matches(phoneRegExp, "Your phone is invalid"),
      maLoaiNguoiDung: Yup.string().required("Please choose type user"),
      taiKhoan: Yup.string()
        .min(6, "Have min 6 character")
        .max(32, "Must be 20 characters or less"),
      matKhau: Yup.string()
        .min(6, "Have min 6 character")
        .max(32, "Must be 20 characters or less"),
      xacNhanMatKhau: Yup.string().oneOf(
        [Yup.ref("matKhau"), null],
        "Passwords must match"
      ),
    }),

    onSubmit: async (values) => {
      if (statusPages) {
        await dispatch(updateUserAPIAction(values));
        if (formik.values.taiKhoan === userInfo.taiKhoan) {
          dispatch(getUserInfoAPIAction());
        }
      } else {
        dispatch(addUserAPIAction(values, navigate));
      }
    },
  });

  const handleChangeDataFormik = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const confirm = (value) => {
    dispatch(deleteUserAPIAction(value));
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
        size="large"
      >
        <Form.Item label={t("account")}>
          <Input
            disabled={statusPages}
            name="taiKhoan"
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
          />
          <div className="text-red-400 h-3" id="feedback">
            {formik.errors.taiKhoan}
          </div>
        </Form.Item>
        <Form.Item label={t("fullName")}>
          <Input
            name="hoTen"
            value={formik.values.hoTen}
            onChange={formik.handleChange}
          />
          <div className="text-red-400 h-3" id="feedback">
            {formik.errors.hoTen}
          </div>
        </Form.Item>
        <Form.Item label={t("email")}>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div className="text-red-400 h-3" id="feedback">
            {formik.errors.email}
          </div>
        </Form.Item>
        <Form.Item label={t("phoneNumber")}>
          <InputNumber
            style={{
              width: "100%",
            }}
            controls={false}
            name="soDt"
            value={formik.values.soDt}
            onChange={handleChangeDataFormik("soDt")}
          />
          <div className="text-red-400 h-3" id="feedback">
            {formik.errors.soDt}
          </div>
        </Form.Item>
        <Form.Item label={t("password")}>
          <Input.Password
            name="matKhau"
            value={formik.values.matKhau}
            onChange={formik.handleChange}
          />
          <div className="text-red-400 h-3" id="feedback">
            {formik.errors.matKhau}
          </div>
        </Form.Item>
        <Form.Item label={t("passwordConfirm")}>
          <Input.Password
            name="xacNhanMatKhau"
            value={formik.values.xacNhanMatKhau}
            onChange={formik.handleChange}
          />
          <div className="text-red-400 h-3" id="feedback">
            {formik.errors.xacNhanMatKhau}
          </div>
        </Form.Item>
        <Form.Item label={t("typeUser")}>
          <Select
            value={formik.values.maLoaiNguoiDung}
            options={lstTypeUser.map((type, index) => ({
              label: type.tenLoai,
              value: type.maLoaiNguoiDung,
            }))}
            onChange={handleChangeDataFormik("maLoaiNguoiDung")}
          />
          <div className="text-red-400 h-3" id="feedback">
            {formik.errors.maLoaiNguoiDung}
          </div>
        </Form.Item>
        <Form.Item label colon={false}>
          <div className="flex justify-between mt-3">
            <div>
              <Button
                disabled={
                  !formik.isValid ||
                  formik.values.taiKhoan === "" ||
                  formik.values.matKhau === "" ||
                  formik.values.xacNhanMatKhau === "" ||
                  formik.values.hoTen === "" ||
                  formik.values.email === "" ||
                  formik.values.soDt === "" ||
                  formik.values.maLoaiNguoiDung === ""
                }
                className="w-28 mr-3"
                htmlType="submit"
                type="primary"
                shape="round"
                ghost
                size="large"
              >
                {statusPages ? t("update") : t("addNew")}
              </Button>
              <Button
                className="w-28 btnDanger"
                shape="round"
                onClick={() => {
                  navigate(PAGES.LIST_USERS);
                }}
              >
                {t("cancel")}
              </Button>
            </div>
            {statusPages ? (
              <Popconfirm
                title={`Are you sure to delete user: ${formik.values.taiKhoan}`}
                onConfirm={() => {
                  confirm(formik.values.taiKhoan);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className="inline-block w-full text-end"
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            ) : null}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
