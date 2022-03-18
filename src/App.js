import React, { useState } from "react";
import Swagger from "./Components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
export default function App() {
  axios.interceptors.request.use((request) => {
    request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    console.log(request.headers);
    return request;
  });
  const [basePath, setBasePath] = useState("/swagger.json");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Spin indicator={antIcon} spinning={false}>
      <Swagger basePath={basePath} setBasePath={setBasePath} />
    </Spin>
  );
}
