import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { USER_INFO } from "../../util/settings/config";

const CheckoutTemplate = (props) => {
  if (!localStorage.getItem(USER_INFO)) {
    return <Navigate to="/signIn" />;
  }
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default CheckoutTemplate;
