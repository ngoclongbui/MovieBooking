/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { Layout, Menu, Select } from "antd";
import {
  VideoCameraOutlined,
  OrderedListOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  EditOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import {
  NOTIFY_TYPE,
  PAGES,
  TOKEN,
  USER_INFO,
} from "../../util/settings/config";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setInfoMovieUpdateAction } from "../../redux/actions/MovieManageActions";
import { InfoMovieUpdate } from "../../_core/models/MovieManage";
import {
  getLstTypeUserAPIAction,
  getUserInfoAPIAction,
  setUserDetailAction,
} from "../../redux/actions/UserManageActions";
import { UserDetail } from "../../_core/models/UserManage";
import { notify } from "../../util/notification/notification";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

export default function AdminTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const { userSignIn, userInfo } = useSelector(
    (state) => state.UserManageReducers
  );

  useEffect(() => {
    dispatch(getUserInfoAPIAction());
    dispatch(getLstTypeUserAPIAction());
  }, []);

  useEffect(() => {
    if (
      userInfo.loaiNguoiDung !== "" &&
      userInfo.loaiNguoiDung !== "Quản trị"
    ) {
      navigate(PAGES.INDEX);
      notify(NOTIFY_TYPE.INFO, "Bạn chưa có quyền quản trị");
    }
  }, [userInfo]);

  const { t, i18n } = useTranslation();

  const LABEL_MENU = {
    FILMS: t("filmManager"),
    LIST_FILMS: t("listMovie"),
    ADD_FILM: t("addMovie"),
    EDIT_FILM: t("updateMovie"),
    SHOWTIME: t("createShowtime"),
    USERS: t("userManager"),
    LIST_USER: t("listUser"),
    ADD_USER: t("addUser"),
    EDIT_USER: t("updateUser"),
  };

  const KEY_MENU = {
    FILMS: "sub1",
    LIST_FILMS: "1",
    ADD_FILM: "2",
    EDIT_FILM: "3",
    SHOWTIME: "4",
    USERS: "sub2",
    LIST_USER: "5",
    ADD_USER: "6",
    EDIT_USER: "7",
  };

  const items = [
    {
      label: LABEL_MENU.FILMS,
      key: KEY_MENU.FILMS,
      icon: <VideoCameraOutlined />,
      children: [
        {
          label: LABEL_MENU.LIST_FILMS,
          key: KEY_MENU.LIST_FILMS,
          icon: <OrderedListOutlined style={{ verticalAlign: "1px" }} />,
        },
        {
          label: LABEL_MENU.ADD_FILM,
          key: KEY_MENU.ADD_FILM,
          icon: <PlusOutlined style={{ verticalAlign: "1px" }} />,
        },
        {
          label: LABEL_MENU.EDIT_FILM,
          key: KEY_MENU.EDIT_FILM,
          icon: <EditOutlined style={{ verticalAlign: "1px" }} />,
          disabled: true,
        },
        {
          label: LABEL_MENU.SHOWTIME,
          key: KEY_MENU.SHOWTIME,
          icon: <ClockCircleOutlined style={{ verticalAlign: "1px" }} />,
          disabled: true,
        },
      ],
    },
    {
      label: LABEL_MENU.USERS,
      key: KEY_MENU.USERS,
      icon: <TeamOutlined />,
      children: [
        {
          label: LABEL_MENU.LIST_USER,
          key: KEY_MENU.LIST_USER,
          icon: <UnorderedListOutlined style={{ verticalAlign: "1px" }} />,
        },
        {
          label: LABEL_MENU.ADD_USER,
          key: KEY_MENU.ADD_USER,
          icon: <PlusOutlined style={{ verticalAlign: "1px" }} />,
        },
        {
          label: LABEL_MENU.EDIT_USER,
          key: KEY_MENU.EDIT_USER,
          icon: <EditOutlined style={{ verticalAlign: "1px" }} />,
          disabled: true,
        },
      ],
    },
  ];

  let [collapsed, setCollapsed] = useState(true);
  let [keySelect, setKeySelect] = useState(KEY_MENU.LIST_FILMS);
  let [titlePages, setTitlePages] = useState(LABEL_MENU.LIST_FILMS);

  function handleChangeLangue(value) {
    i18n.changeLanguage(value);
  }

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    setTitlePages(LABEL_MENU.LIST_FILMS);
  }, [i18n.language]);

  useEffect(() => {
    switch (location.pathname) {
      case PAGES.LIST_FILMS:
        setTitlePages(LABEL_MENU.LIST_FILMS);
        setKeySelect(KEY_MENU.LIST_FILMS);
        return;

      case PAGES.DETAIL_FILM:
        setTitlePages(LABEL_MENU.ADD_FILM);
        setKeySelect(KEY_MENU.ADD_FILM);
        return;

      case `${PAGES.DETAIL_FILM}/${params.id}`:
        setTitlePages(LABEL_MENU.EDIT_FILM);
        setKeySelect(KEY_MENU.EDIT_FILM);
        return;

      case `${PAGES.SHOWTIME}/${params.id}`:
        setTitlePages(LABEL_MENU.SHOWTIME);
        setKeySelect(KEY_MENU.SHOWTIME);
        return;

      case PAGES.LIST_USERS:
        setTitlePages(LABEL_MENU.LIST_USER);
        setKeySelect(KEY_MENU.LIST_USER);
        return;

      case PAGES.DETAIL_USER:
        setTitlePages(LABEL_MENU.ADD_USER);
        setKeySelect(KEY_MENU.ADD_USER);
        return;

      case `${PAGES.DETAIL_USER}/${params.account}`:
        setTitlePages(LABEL_MENU.EDIT_USER);
        setKeySelect(KEY_MENU.EDIT_USER);
        return;

      default:
        return;
    }
  }, [location]);

  const onChangePages = (e) => {
    switch (e.key) {
      case KEY_MENU.LIST_FILMS:
        navigate(PAGES.LIST_FILMS);
        return;

      case KEY_MENU.ADD_FILM:
        dispatch(setInfoMovieUpdateAction(new InfoMovieUpdate()));
        navigate(PAGES.DETAIL_FILM);
        return;

      case KEY_MENU.LIST_USER:
        navigate(PAGES.LIST_USERS);
        return;

      case KEY_MENU.ADD_USER:
        dispatch(setUserDetailAction(new UserDetail()));
        navigate(PAGES.DETAIL_USER);
        return;

      default:
        break;
    }
  };

  const renderControl = () => (
    <Fragment>
      <span
        onClick={() => {
          navigate(PAGES.INDEX);
        }}
        className="mr-5 cursor-pointer text-base text-[#001529] transition duration-300 hover:text-[#40A9FF]"
      >
        <HomeOutlined style={{ verticalAlign: "1px" }} />
      </span>
      <span
        className="cursor-pointer text-base text-[#001529] transition duration-300 hover:text-[#40A9FF]"
        onClick={() => {
          navigate(`/${PAGES.PROFILE}`);
        }}
      >
        <UserOutlined style={{ verticalAlign: "1px", marginRight: "5px" }} />
        {userSignIn.hoTen}
      </span>
      <span
        className="cursor-pointer text-base mx-5 text-[#001529] transition duration-300 hover:text-[#40A9FF]"
        onClick={() => {
          localStorage.removeItem(USER_INFO);
          localStorage.removeItem(TOKEN);
          navigate(PAGES.INDEX);
          window.location.reload();
        }}
      >
        <LogoutOutlined style={{ verticalAlign: "1px" }} />
      </span>
      <Select
        className="w-[55px]"
        defaultValue="vie"
        showArrow={false}
        bordered={false}
        style={{ color: "#001529" }}
        value={i18n.language}
        onChange={handleChangeLangue}
      >
        <Option value="vie">VIE</Option>
        <Option value="eng">ENG</Option>
        <Option value="chi">CHI</Option>
      </Select>
    </Fragment>
  );

  return (
    <section className="admin flex items-center h-screen">
      <Layout
        className="adminTemplate 2xl:container mx-auto"
        style={{
          height: "784px",
          overflow: "hidden",
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div
            className={`h-[48px] mx-auto my-2 transition-all duration-300
              ${collapsed ? `w-[48px]` : `w-[150px]`}`}
            style={{
              background: `url(
                https://cybersoft.edu.vn/wp-content/uploads/2017/03/MIN-OP1.png
              ) left center/cover no-repeat`,
              backgroundSize: "150px 45px",
            }}
          />
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            onSelect={onChangePages}
            selectedKeys={[keySelect]}
            forceSubMenuRender={true}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ background: "#F0F2F5", padding: 0 }}
          >
            <div className="mx-4 px-6 flex justify-between">
              <h1 className="text-2xl leading-[unset] m-0 text-[#001529]]">
                {titlePages}
              </h1>
              <div>{renderControl()}</div>
            </div>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              className="site-layout-background h-full"
              style={{
                padding: "0 24px 24px",
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              height: "48px",
              background: "#001529",
              textAlign: "center",
              color: "#fff",
              lineHeight: "48px",
              padding: 0,
            }}
          >
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </section>
  );
}
