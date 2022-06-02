import React from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
export default function Loading() {
  const { isLoading } = useSelector((state) => state.LoadingReducers);

  const renderLoading = () => (
    <div className="h-screen w-screen flex items-center justify-center fixed z-[999] top-0 left-0 bg-slate-900/[0.3] backdrop-blur-md">
      <Spin size="large" tip="Loading" />
    </div>
  );

  return isLoading ? renderLoading() : null;
}
