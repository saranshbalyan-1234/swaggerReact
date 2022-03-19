import React, { useState } from "react";
import Swagger from "./Components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { api_base_url } from "./constants";
export default function App() {
  axios.interceptors.request.use((request) => {
    request.url.includes(api_base_url)
      ? (request.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`)
      : (request.headers.Authorization = JSON.parse(
          localStorage.getItem("appToken")
        )?.value);
    console.log("apis", request);
    return request;
  });
  const [basePath, setBasePath] = useState("");
  // const [token, setToken] = useState("");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Spin indicator={antIcon} spinning={false}>
      <Swagger basePath={basePath} setBasePath={setBasePath} />
    </Spin>
  );
}
