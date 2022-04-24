import React, { useState } from "react";
import { Spin, Tabs } from "antd";
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
  setDetails,
}) {
  const { TabPane } = Tabs;

  return (
    <Tabs style={{ marginTop: "-30px" }} defaultActiveKey="1">
      <TabPane tab="Current Project" key="1">
        <CurrentProject
          admin={admin}
          canImport={canImport}
          setLoading={setLoading}
          path={path}
          host={host}
          datas={datas}
          visible={visible}
          setVisible={setVisible}
          getAllProjectsByUser={getAllProjectsByUser}
          setDetails={setDetails}
        />
      </TabPane>
      <TabPane tab="Import Project" key="2">
        <ImportProject
          canImport={canImport}
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
          setAdmin={setAdmin}
          getAllProjectsByUser={getAllProjectsByUser}
          setLoading={setLoading}
        />
      </TabPane>
    </Tabs>
  );
}
