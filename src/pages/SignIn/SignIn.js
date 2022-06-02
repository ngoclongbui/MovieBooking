import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInAPIAction } from "../../redux/actions/UserManageActions";
import { PAGES } from "../../util/settings/config";
import { useTranslation } from "react-i18next";

export default function SignIn(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      dispatch(signInAPIAction(values, navigate));
    },
  });

  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm">
      <div className="py-12 flex justify-center lg:justify-start lg:px-12">
        <Link to={PAGES.INDEX} aria-label="Back to homepage">
          <img
            className="w-[200px]"
            src="https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
        >
          {t("signIn")}
        </h2>
        <div className="mt-12">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                {t("userName")}
              </div>
              <input
                name="taiKhoan"
                onChange={formik.handleChange}
                className="w-full bg-transparent text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder={t("inputYourAccount")}
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  {t("password")}
                </div>
              </div>
              <input
                name="matKhau"
                type="password"
                onChange={formik.handleChange}
                className="w-full bg-transparent text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder={t("inputYourPassword")}
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
              >
                {t("signIn")}
              </button>
            </div>
          </form>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            {t("don'tHaveAccount")}?
            <span
              onClick={() => {
                navigate(`/${PAGES.SIGN_UP}`);
              }}
              className="ml-1 cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              {t("signUp")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
