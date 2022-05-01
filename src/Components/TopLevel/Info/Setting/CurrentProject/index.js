import React, { useState, useEffect } from "react";
import { Spin, Divider } from "antd";

import ManageDetails from "./ManageDetails";
import ManageUser from "./ManageUser";
import More from "./More";
export default function CurrentProject({
  admin,
  canImport,
  setLoading,
  path,
  host,
  datas,
  visible,
  setVisible,
  getAllProjectsByUser,
  setDetails,
}) {
  return (
    <>
      <div>
        <Divider style={{ marginTop: "-5px" }} plain>
          Manage Details
        </Divider>
        <ManageDetails
          host={host}
          path={path}
          datas={datas}
          setDetails={setDetails}
        />
        <Divider plain>Manage User</Divider>
        <ManageUser visible={visible} admin={admin} canImport={canImport} />
      </div>
      <Divider plain>More</Divider>
      <More
        admin={admin}
        canImport={canImport}
        setLoading={setLoading}
        getAllProjectsByUser={getAllProjectsByUser}
        setVisible={setVisible}
      />
    </>
  );
}
