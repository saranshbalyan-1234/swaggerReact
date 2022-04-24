import React, { useState } from "react";
import { Button, Input, Spin, message } from "antd";
import axios from "axios";
import { api_base_url } from "../../../../../constants";
export default function ManageDetails({ host, path, datas, setDetails }) {
  const [tempDetails, setTempDetails] = useState({
    project_id: JSON.parse(localStorage.getItem("project")).id,
    title: datas?.info?.title,
    host: host,
    basePath: path,
    description: datas?.info?.description,
    version: datas?.info?.version,
  });
  const [manageDetailsLoading, setManageDetailsLoading] = useState(false);
  const handleChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    setTempDetails({ ...tempDetails, ...obj });
  };
  const handleSubmit = async () => {
    setManageDetailsLoading(true);
    await axios
      .post(`${api_base_url}/updateInfo`, tempDetails)
      .then((res) => {
        message.success("Project Updated SuccessFully");
        setDetails({
          ...tempDetails,
          basePath: tempDetails.host + tempDetails.basePath,
        });
      })
      .catch((err) => {
        message.error("Somehting Went Wrong");
      });
    setManageDetailsLoading(false);
  };
  return (
    <Spin spinning={manageDetailsLoading}>
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        {" "}
        <Input
          placeholder="Project Name"
          value={tempDetails.title}
          style={{ width: 280 }}
          name="title"
          onChange={handleChange}
        />
        <Input
          placeholder="Version"
          value={tempDetails.version}
          style={{ width: 180, marginLeft: "10px" }}
          name="version"
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Input
          placeholder="Host"
          style={{ width: 280 }}
          value={tempDetails.host}
          name="host"
          onChange={handleChange}
        />
        <Input
          name="basePath"
          placeholder="Base Path"
          style={{
            width: 180,
            marginLeft: "10px",
          }}
          value={tempDetails.basePath}
          onChange={handleChange}
        />
      </div>
      <Input.TextArea
        name="description"
        placeholder="Project Description"
        value={tempDetails.description}
        onChange={handleChange}
      />
      <Button
        type="primary"
        ghost
        style={{ marginTop: "10px" }}
        onClick={handleSubmit}
      >
        Save Details
      </Button>
    </Spin>
  );
}
