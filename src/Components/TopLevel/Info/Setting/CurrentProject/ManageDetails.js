import React from "react";
import { Button, Input } from "antd";
export default function ManageDetails({ host, path, datas }) {
  return (
    <>
      <Input placeholder="Project Name" value={datas?.info?.title} />
      <div
        style={{
          display: "flex",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Input placeholder="Host" style={{ width: 240 }} value={host} />
        <Input
          placeholder="Base Path"
          style={{
            width: 230,
            marginLeft: "10px",
          }}
          value={path}
        />
      </div>
      <Input.TextArea
        name="description"
        placeholder="Project Description"
        value={datas?.info?.description}
      />
      <Button type="primary" ghost style={{ marginTop: "10px" }}>
        Save Details
      </Button>
    </>
  );
}
