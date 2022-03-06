import React, { useState } from "react";
import SingleModel from "./singleModel";
export default function Model({ data }) {
  const [showModel, setShowModel] = useState(false);
  return (
    <div className="wrapper">
      <section className="models ">
        <h4>
          <button
            style={{ outline: "none" }}
            aria-expanded="true"
            className="models-control"
            onClick={() => setShowModel(!showModel)}
          >
            <span>Models</span>
            <i className="fa-solid fa-angle-down"></i>
          </button>
        </h4>
        {showModel && (
          <div style={{ marginBottom: "20px" }}>
            {data &&
              Object.keys(data).map(function (key, index) {
                return (
                  <SingleModel
                    data={key}
                    arrays={data[key]}
                    allData={data}
                    inside={false}
                  />
                );
              })}
          </div>
        )}
      </section>
    </div>
  );
}
