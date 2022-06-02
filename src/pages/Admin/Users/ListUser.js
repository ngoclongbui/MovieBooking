/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Table, Input, Button, Popconfirm } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../../util/settings/config";
import {
  deleteUserAPIAction,
  getLstUserAPIAction,
  setUserDetailAction,
} from "../../../redux/actions/UserManageActions";
import { UserDetail } from "../../../_core/models/UserManage";
import { useTranslation } from "react-i18next";
const { Search } = Input;

export default function ListUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getLstUserAPIAction());
  }, []);

  const { lstUser } = useSelector((state) => state.UserManageReducers);

  const confirm = (value) => {
    dispatch(deleteUserAPIAction(value));
  };

  const columns = [
    {
      title: t("account"),
      dataIndex: "taiKhoan",
      sorter: {
        compare: (a, b) => {
          let accountA = a.taiKhoan.toUpperCase().trim();
          let accountB = b.taiKhoan.toUpperCase().trim();
          if (accountA < accountB) {
            return -1;
          }
          if (accountA > accountB) {
            return 1;
          }
          return 0;
        },
      },
      width: 250,
      showSorterTooltip: false,
    },
    {
      title: t("fullName"),
      dataIndex: "hoTen",
      sorter: {
        compare: (a, b) => {
          let nameA = a.hoTen.toUpperCase().trim();
          let nameB = b.hoTen.toUpperCase().trim();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        },
      },
      showSorterTooltip: false,
    },
    {
      title: t("email"),
      dataIndex: "email",
      sorter: {
        compare: (a, b) => {
          let emailA = a.email.toUpperCase().trim();
          let emailB = b.email.toUpperCase().trim();
          if (emailA < emailB) {
            return -1;
          }
          if (emailA > emailB) {
            return 1;
          }
          return 0;
        },
      },
      showSorterTooltip: false,
    },
    {
      title: t("phoneNumber"),
      dataIndex: "soDt",
    },
    {
      dataIndex: "action",
      render: (text, user) => (
        <div className="text-center">
          <span
            className="text-[20px] mx-4 text-sky-500 opacity-70 cursor-pointer  transition duration-500 hover:opacity-100"
            onClick={() => {
              dispatch(setUserDetailAction(user));
              navigate(`${PAGES.DETAIL_USER}/${user.taiKhoan}`);
            }}
          >
            <EditOutlined />
          </span>
          <Popconfirm
            title={`Are you sure to delete user: ${user.taiKhoan}`}
            onConfirm={() => {
              confirm(user.taiKhoan);
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
      width: 120,
    },
  ];

  const data = lstUser;

  const onSearch = (value) => dispatch(getLstUserAPIAction(value));

  return (
    <section>
      <div className="flex">
        <Button
          type="primary"
          size="large"
          ghost
          className="mr-3"
          onClick={() => {
            dispatch(setUserDetailAction(new UserDetail()));
            navigate(PAGES.DETAIL_USER);
          }}
        >
          {t("addUser")}
        </Button>
        <Search
          size="large"
          placeholder={t("userName")}
          onSearch={onSearch}
          enterButton={<SearchOutlined style={{ verticalAlign: "1px" }} />}
        />
      </div>
      <Table
        pagination={{ size: "default", style: { marginBottom: "0px" } }}
        className="mt-3"
        columns={columns}
        dataSource={data}
        rowKey="taiKhoan"
        size={"small"}
        scroll={{ y: 500 }}
      />
    </section>
  );
}
