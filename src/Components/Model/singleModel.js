import React, { useState } from "react";
import SchemaToJson from "../Util/SchemaToJson";

export default function SingleModel({ data, allData, inside = false }) {
  const [show, setShow] = useState(false);
  console.log("schema", data);
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
          onClick={() => {
            setShow(!show);
          }}
        >
          <span className="pointer">
            <span className="model-box">
              <span className="model model-title">{data}</span>
            </span>
          </span>
          <span className="model-toggle collapsed"></span>
          <span> </span>
        </button>
        {show && (
          <SchemaToJson
            schema={"#/definitions/" + data}
            models={allData}
            theme={"rjc-default"}
          />
        )}
      </span>
    </div>
  );
}
