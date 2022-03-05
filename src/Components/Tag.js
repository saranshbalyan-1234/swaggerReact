import React, { useState, useEffect } from "react";
import Api from "./Api";
import ApiUrl from "./ApiUrl";

export default function Tag({ tag, paths, models }) {
  const [data, setData] = useState({});
  const [api, showApi] = useState(false);
  useEffect(() => {
    for (const [key, value] of Object.entries(paths)) {
      data[key] = {};
      for (const [key1, value1] of Object.entries(value)) {
        value1.tags.forEach((el) => {
          // console.log("new", tag);
          if (el == tag.name) {
            console.log("key", el);

            data[key][key1] = value1;

            // console.log("new", key1);
          }
        });
      }
    }
    console.log("new", data);
  }, [paths]);

  return (
    <>
      <div
        class="opblock-tag-section"
        style={{ marginLeft: "20px", marginRight: "20px" }}
        onClick={() => showApi(!api)}
      >
        <h3
          class="opblock-tag"
          id="operations-tag-Cloud_App"
          data-tag="Cloud App"
          data-is-open="false"
        >
          <a class="nostyle" href="#/Cloud%20App">
            <span>{tag && tag.name}</span>
          </a>
          <small>
            <div class="markdown">
              <p>{tag && tag.description}</p>
            </div>
          </small>
          <div></div>
          <button
            aria-expanded="false"
            class="expand-operation"
            title="Expand operation"
          >
            <i class="fa-solid fa-angle-down"></i>
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
