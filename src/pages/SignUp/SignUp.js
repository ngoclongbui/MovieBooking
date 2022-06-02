/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "antd";
import {
  getLstTypeUserAPIAction,
  signUpAPIAction,
} from "../../redux/actions/UserManageActions";
import { GROUP, PAGES } from "../../util/settings/config";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { lstTypeUser } = useSelector((state) => state.UserManageReducers);

  useEffect(() => {
    dispatch(getLstTypeUserAPIAction());
  }, []);

  const nameRegExp = RegExp(
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
  );
  const phoneRegExp = RegExp(/^[0-9]+$/);
  const emailRegExp = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      xacNhanMatKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: lstTypeUser[0]?.maLoaiNguoiDung,
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

    onSubmit: (values) => {
      console.log(values);
      dispatch(signUpAPIAction(values, navigate));
    },
  });

  const handleChangeDataFormik = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm signUp">
      <div className="pt-12 pb-6 flex justify-center lg:justify-start lg:px-12">
        <Link to={PAGES.INDEX} aria-label="Back to homepage">
          <img
            className="w-[200px]"
            src="https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
            xl:text-bold"
        >
          {t("signUp")}
        </h2>
        <div className="mt-12">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                {t("fullName")}
              </div>
              <input
                name="hoTen"
                onChange={formik.handleChange}
                className="w-full bg-transparent text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Nhập vào tên của bạn"
              />
              <div className="text-red-400 h-3" id="feedback">
                {formik.errors.hoTen}
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <div className="w-1/2 pr-3">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("email")}
                </div>
                <input
                  name="email"
                  onChange={formik.handleChange}
                  className="w-full bg-transparent text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập vào địa chỉ email của bạn"
                />
                <div className="text-red-400 h-3" id="feedback">
                  {formik.errors.email}
                </div>
              </div>
              <div className="w-1/2 pl-3">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("phoneNumber")}
                </div>
                <input
                  name="soDt"
                  onChange={formik.handleChange}
                  type={"number"}
                  controls={false}
                  className="w-full bg-transparent text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập vào số điện thoại bạn"
                />
                <div className="text-red-400 h-3" id="feedback">
                  {formik.errors.soDt}
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <div className="w-1/2 pr-3">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("account")}
                </div>
                <input
                  name="taiKhoan"
                  onChange={formik.handleChange}
                  className="w-full bg-transparent text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập mật khẩu của bạn"
                />
                <div className="text-red-400 h-3" id="feedback">
                  {formik.errors.taiKhoan}
                </div>
              </div>
              <div className="w-1/2 pl-3">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("password")}
                </div>
                <input
                  name="matKhau"
                  type={"password"}
                  onChange={formik.handleChange}
                  className="w-full bg-transparent text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập mật khẩu của bạn"
                />
                <div className="text-red-400 h-3" id="feedback">
                  {formik.errors.matKhau}
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <div className="w-1/2 mr-3">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("typeUser")}
                </div>
                <Select
                  bordered={false}
                  className="w-full h-[37px] text-sm border-b py-2 border-gray-300 focus:outline-none focus:border-indigo-500"
                  value={formik.values.maLoaiNguoiDung}
                  options={lstTypeUser.map((type, index) => ({
                    label: type.tenLoai,
                    value: type.maLoaiNguoiDung,
                  }))}
                  onChange={handleChangeDataFormik("maLoaiNguoiDung")}
                />
              </div>
              <div className="w-1/2 ml-3">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("passwordConfirm")}
                </div>
                <input
                  name="xacNhanMatKhau"
                  onChange={formik.handleChange}
                  type={"password"}
                  className="w-full bg-transparent text-sm py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập lại  mật khẩu của bạn"
                />
                <div className="text-red-400 h-3" id="feedback">
                  {formik.errors.xacNhanMatKhau}
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                disabled={
                  !formik.isValid ||
                  formik.values.taiKhoan === "" ||
                  formik.values.matKhau === "" ||
                  formik.values.xacNhanMatKhau === "" ||
                  formik.values.hoTen === "" ||
                  formik.values.email === "" ||
                  formik.values.soDt === ""
                }
                type="submit"
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                        shadow-lg"
              >
                {t("signUp")}
              </button>
            </div>
          </form>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            {t("haveAccount")}?
            <span
              onClick={() => {
                navigate(`/${PAGES.SIGN_IN}`);
              }}
              className="ml-1 cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              {t("signIn")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
