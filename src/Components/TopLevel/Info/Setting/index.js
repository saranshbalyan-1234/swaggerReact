import React, { useState } from "react";
import { Spin, message, Tabs } from "antd";
import axios from "axios";
import { api_base_url } from "../../../../constants";
import ImportProject from "./ImportProject";
import CurrentProject from "./CurrentProject";
import NewProject from "./NewProject";
export default function Settings({
  admin,
  canImport,
  datas,
  host,
  path,
  visible,
  setVisible,
  setLoading,
  getAllProjectsByUser,
  setEditMode,
  setAdmin,
}) {
  const { TabPane } = Tabs;

  const [loadingImport, setLoadingImport] = useState(false);

  return (
    <Spin spinning={loadingImport}>
      <Tabs style={{ marginTop: "-30px" }} defaultActiveKey="1">
        <TabPane tab="Current Project" key="1">
          <CurrentProject
            admin={admin}
            canImport={canImport}
            loadingImport={loadingImport}
            setLoadingImport={setLoadingImport}
            setLoading={setLoading}
            path={path}
            host={host}
            datas={datas}
            visible={visible}
            setVisible={setVisible}
            getAllProjectsByUser={getAllProjectsByUser}
          />
        </TabPane>
        <TabPane tab="Import Project" key="2">
          <ImportProject
            canImport={canImport}
            setLoadingImport={setLoadingImport}
            datas={datas}
            getAllProjectsByUser={getAllProjectsByUser}
            setAdmin={setAdmin}
            setVisible={setVisible}
            setLoading={setLoading}
            setEditMode={setEditMode}
          />
        </TabPane>

        <TabPane tab="New Project" key="3">
          <NewProject
            setEditMode={setEditMode}
            setVisible={setVisible}
            setLoadinImport={setLoadingImport}
            setAdmin={setAdmin}
            getAllProjectsByUser={getAllProjectsByUser}
            setLoading={setLoading}
          />
        </TabPane>
      </Tabs>
    </Spin>
  );
}
