import React, { useState, useEffect } from "react";
import Swagger from "./Components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { api_base_url } from "./constants";
import { useNavigate } from "react-router-dom";
export default function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  axios.interceptors.request.use((request) => {
    request.url.includes(api_base_url)
      ? (request.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`)
      : (request.headers.Authorization = JSON.parse(
          localStorage.getItem("appToken")
        )?.value);

    return request;
  });
  useEffect(() => {
    !localStorage.getItem("token") && navigate("/login");
  }, []);

  const [basePath, setBasePath] = useState("");

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    localStorage.getItem("token") && (
      <Spin indicator={antIcon} spinning={loading}>
        <Swagger
          basePath={basePath}
          setBasePath={setBasePath}
          loading={loading}
          setLoading={setLoading}
        />
      </Spin>
    )
  );
}
