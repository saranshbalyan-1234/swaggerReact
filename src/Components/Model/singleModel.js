import React, { useState } from "react";
import SchemaToJson from "../Util/SchemaToJson";
import { message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { api_base_url } from "../../constants";
export default function SingleModel({
  data,
  allData,
  inside = false,
  editMode,
  refresh,
  setRefresh,
  admin,
  setModels,
}) {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmLoading, setCofirmLoading] = useState(false);

  const deleteModel = (id) => {
    setCofirmLoading(true);
    axios
      .post(api_base_url + "/deleteModel", { id: id })
      .then((res) => {
        message.success("Model Deleted Successfully");
        let temp = { ...allData };
        delete temp[data];
        setModels(temp);
        setCofirmLoading(false);
        setShowConfirm(false);
      })
      .catch((err) => {
        message.error("something Went Wrong");
        setCofirmLoading(false);
        setShowConfirm(false);
      });
  };
  return (
    <div
      id={`model-${data}`}
      className="model-container"
      data-name={data}
      style={{ marginLeft: inside == true ? "-4px" : "15px" }}
    >
      <span className="models-jump-to-path"></span>
      <span
        className="model-box"
        style={{ padding: inside == true ? "0px" : "10px" }}
      >
        <button
          style={{ outline: "none" }}
          aria-expanded="false"
          className="model-box-control"
        >
          <span
            className="pointer"
            onClick={() => {
              setShow(!show);
            }}
          >
            <span className="model-box">
              <span className="model model-title">{data}</span>
            </span>
          </span>
          <span
            onClick={() => {
              setShow(!show);
            }}
            className="model-toggle collapsed"
          ></span>

          {editMode && admin && (
            <Popconfirm
              title="Are you Sure?"
              visible={showConfirm}
              onConfirm={() => {
                deleteModel(allData[data].id);
              }}
              okText="Yes"
              okButtonProps={{ loading: confirmLoading }}
              onCancel={() => setShowConfirm(false)}
            >
              <DeleteOutlined
                onClick={() => {
                  // deleteModel(allData[data].id);
                  setShowConfirm(true);
                }}
              />
            </Popconfirm>
          )}

          <span> </span>
        </button>
        {show && (
          <SchemaToJson
            schema={"#/definitions/" + data}
            models={allData}
            theme={"rjc-default"}
            editable={false}
          />
        )}
      </span>
    </div>
  );
}
