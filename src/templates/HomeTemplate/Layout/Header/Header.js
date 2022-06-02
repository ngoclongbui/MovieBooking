import React, { Fragment } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import _ from "lodash";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { PAGES, TOKEN, USER_INFO } from "../../../../util/settings/config";

const { Option } = Select;

export default function Header() {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  function handleChangeLangue(value) {
    i18n.changeLanguage(value);
  }

  const { userSignIn } = useSelector((state) => state.UserManageReducers);

  const renderControl = () => {
    if (_.isEmpty(userSignIn)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              navigate(`${PAGES.SIGN_IN}`);
            }}
            className="self-center px-8 py-2 rounded dark:text-violet-600 border border-violet-600 mr-3"
          >
            {t("signIn")}
          </button>
          <button
            onClick={() => {
              navigate(`${PAGES.SIGN_UP}`);
            }}
            className="self-center px-8 py-2 font-semibold rounded dark:bg-violet-600 dark:text-coolGray-900"
          >
            {t("signUp")}
          </button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <span
            className="cursor-pointer text-base text-blue-400 transition duration-300 hover:text-violet-600"
            onClick={() => {
              navigate(`${PAGES.PROFILE}`);
            }}
          >
            <UserOutlined
              style={{ verticalAlign: "1px", marginRight: "5px" }}
            />
            {userSignIn.hoTen}
          </span>
          <span
            className="cursor-pointer text-base mx-5 text-blue-400 transition duration-300 hover:text-violet-600"
            onClick={() => {
              localStorage.removeItem(USER_INFO);
              localStorage.removeItem(TOKEN);
              navigate(`${PAGES.INDEX}`);
              window.location.reload();
            }}
          >
            <LogoutOutlined style={{ verticalAlign: "1px" }} />
          </span>
        </Fragment>
      );
    }
  };

  return (
    <header className="p-4 bg-coolGray-800 text-coolGray-800 bg-slate-900 opacity-90 fixed top-0 w-full h-auto z-10">
      <div className="container flex justify-between h-10 mx-auto ">
        <Link
          to={PAGES.INDEX}
          aria-label="Back to homepage"
          className="flex items-center basis-1/3 h-full"
        >
          <img
            className="h-full"
            src="https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png"
            alt="logo"
          />
        </Link>
        <ul className="flex-initial basis-1/3 justify-center mb-0 hidden space-x-3 lg:flex linkMenu">
          <li className="flex">
            <NavLink
              to={PAGES.INDEX}
              className={`flex items-center px-4 mb-1 border-b-2 dark:border-transparent transition duration-300 hover:text-violet-600`}
            >
              {t("home")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to={PAGES.NEWS}
              className={`flex items-center px-4 mb-1 border-b-2 dark:border-transparent transition duration-300 hover:text-violet-600 `}
            >
              {t("news")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to={PAGES.CONTACT}
              className={`flex items-center px-4 mb-1 border-b-2 dark:border-transparent transition duration-300 hover:text-violet-600 `}
            >
              {t("contact")}
            </NavLink>
          </li>
        </ul>
        <div className="items-center basis-1/3 justify-end flex-shrink-0 hidden lg:flex">
          {renderControl()}
          <Select
            defaultValue="vie"
            showArrow={false}
            bordered={false}
            value={i18n.language}
            style={{ width: 55, marginTop: "2px", color: "rgb(96 165 250)" }}
            onChange={handleChangeLangue}
          >
            <Option value="vie">VIE</Option>
            <Option value="eng">ENG</Option>
            <Option value="chi">CHI</Option>
          </Select>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-coolGray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
