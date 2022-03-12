import React, { useState } from "react";
import Swagger from "./Components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export default function App() {
  const [basePath, setBasePath] = useState("/swagger.json");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <Spin indicator={antIcon} spinning={false}>
      <Swagger basePath={basePath} setBasePath={setBasePath} />
    </Spin>
  );
}
