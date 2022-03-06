import React, { useState, useEffect } from "react";

import ApiUrl from "./Api/ApiUrl";

export default function Tag({ tag, paths, models }) {
  const [data, setData] = useState({});
  const [api, showApi] = useState(false);
  useEffect(() => {
    for (const [key, value] of Object.entries(paths)) {
      data[key] = {};
      for (const [key1, value1] of Object.entries(value)) {
        value1.tags.forEach((el) => {
          if (el == tag.name) {
            data[key][key1] = value1;
          }
        });
      }
    }
  }, [paths]);

  return (
    <>
      <div
        className="opblock-tag-section"
        style={{ marginLeft: "20px", marginRight: "20px" }}
        onClick={() => showApi(!api)}
      >
        <h3
          className="opblock-tag"
          id="operations-tag-Cloud_App"
          data-tag="Cloud App"
          data-is-open="false"
        >
          <a className="nostyle" href="#/Cloud%20App">
            <span>{tag && tag.name}</span>
          </a>
          <small>
            <div className="markdown">
              <p>{tag && tag.description}</p>
            </div>
          </small>
          <div></div>
          <button
            aria-expanded="false"
            className="expand-operation"
            title="Expand operation"
          >
            <i
              className="fa-solid fa-angle-down"
              style={{
                transform: api && "rotate(180deg)",
              }}
            ></i>
          </button>
        </h3>
      </div>

      {api &&
        data &&
        Object.keys(data).map(function (key, index) {
          return (
            <ApiUrl key={index} data={data[key]} url={key} models={models} />
          );
        })}
    </>
  );
}
