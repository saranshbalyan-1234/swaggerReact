import React, { useState } from "react";
import SchemaToJson from "../Util/SchemaToJson";
import { message } from "antd";
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
}) {
  const [show, setShow] = useState(false);

  console.log("schema", allData[data]);
  const deleteModel = (id) => {
    axios
      .post(api_base_url + "/deleteModel", { id: id })
      .then((res) => {
        message.success("Model Deleted Successfully");
        setRefresh(!refresh);
      })
      .catch((err) => {
        message.error("something Went Wrong");
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

          {editMode && (
            <DeleteOutlined
              onClick={() => {
                deleteModel(allData[data].id);
              }}
            />
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
