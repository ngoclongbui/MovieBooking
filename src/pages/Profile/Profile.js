/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, InputNumber, Select, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GROUP,
  NAVIGATE,
  NOTIFY_TYPE,
  PAGES,
  STATUS_CODE,
  USER_INFO,
} from "../../util/settings/config";
import {
  getLstTypeUserAPIAction,
  getUserInfoAPIAction,
} from "../../redux/actions/UserManageActions";
import { HistoryBooking } from "../Checkout/Checkout";
import { useTranslation } from "react-i18next";
import { notify } from "../../util/notification/notification";
import { userManageServices } from "../../services/UserManagerServices";
import {
  closeLoadingAction,
  openLoadingAction,
} from "../../redux/actions/LoadingActions";

const { TabPane } = Tabs;

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typeUser, setTypeUser] = useState(null);
  const { userInfo, lstTypeUser } = useSelector(
    (state) => state.UserManageReducers
  );

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function findTypeUser() {
      await dispatch(getUserInfoAPIAction());
      await dispatch(getLstTypeUserAPIAction());
    }
    findTypeUser();
  }, []);

  useEffect(() => {
    setTypeUser(
      lstTypeUser.find((type) => type.tenLoai === userInfo.loaiNguoiDung)
    );
  }, [lstTypeUser]);

  const nameRegExp = RegExp(
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
  );
  const phoneRegExp = RegExp(/^[0-9]+$/);
  const emailRegExp = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userInfo.taiKhoan,
      matKhau: userInfo.matKhau,
      xacNhanMatKhau: userInfo.matKhau,
      hoTen: userInfo.hoTen,
      email: userInfo.email,
      soDt: userInfo.soDT,
      maLoaiNguoiDung: typeUser?.maLoaiNguoiDung,
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
      dispatch(openLoadingAction());
      try {
        const result = await userManageServices.capNhatThongTinNguoiDung(
          values,
          "put"
        );
        if (result.data.statusCode === STATUS_CODE.SUCCESS) {
          notify(NOTIFY_TYPE.SUCCESS, result.data.message);
          await dispatch(getUserInfoAPIAction());
          await localStorage.setItem(
            USER_INFO,
            JSON.stringify({
              ...result.data.content,
              maLoaiNguoiDung: values.maLoaiNguoiDung,
            })
          );
          dispatch(closeLoadingAction());
          setTimeout(() => {
            dispatch(closeLoadingAction());
          }, 600);
        }
      } catch (error) {
        notify(NOTIFY_TYPE.ERROR, error.response?.data.message);
        setTimeout(() => {
          dispatch(closeLoadingAction());
        }, 800);
        console.log(error.response?.data);
      }
    },
  });

  const handleChangeDataFormik = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const renderInfoUser = () => (
    <Form
      onSubmitCapture={formik.handleSubmit}
      className="w-full"
      labelCol={{
        span: 9,
      }}
      wrapperCol={{
        span: 8,
      }}
      layout="horizontal"
      size="large"
    >
      <Form.Item label={t("account")}>
        <Input
          disabled={true}
          name="taiKhoan"
          value={formik.values.taiKhoan}
          onChange={formik.handleChange}
        />
        <div className="text-red-400 h-3" id="feedback">
          {formik.errors.taiKhoan}
        </div>
      </Form.Item>
      <Form.Item label={t("yourName")}>
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
          name="matKhau"
          value={formik.values.xacNhanMatKhau}
          onChange={formik.handleChange}
        />
        <div className="text-red-400 h-3" id="feedback">
          {formik.errors.xacNhanMatKhau}
        </div>
      </Form.Item>
      <Form.Item label={t("typeUser")}>
        <Select
          defaultValue={() => {}}
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
              {t("update")}
            </Button>
            <Button
              className="w-28 btnDanger"
              shape="round"
              onClick={() => {
                navigate(NAVIGATE.GO_BACK);
              }}
            >
              {t("cancel")}
            </Button>
          </div>
          {userInfo?.loaiNguoiDung === "Quản trị" ? (
            <Button
              className="btnSuccess"
              shape="round"
              onClick={() => {
                navigate(PAGES.ADMIN);
              }}
            >
              {t("adminPage")}
            </Button>
          ) : null}
        </div>
      </Form.Item>
    </Form>
  );

  const renderInfoTicket = () => <HistoryBooking />;

  return (
    <div className="adminPages min-h-screen container mx-auto mt-20">
      <Tabs defaultActiveKey="1" style={{ height: 650 }}>
        <TabPane tab={t("userInfo").toUpperCase()} key="1">
          {renderInfoUser()}
        </TabPane>
        <TabPane tab={t("historyBooking").toUpperCase()} key="2">
          {renderInfoTicket()}
        </TabPane>
      </Tabs>
    </div>
  );
}
