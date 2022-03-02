import React, { useState } from "react";

export default function Model({ data }) {
  const [show, setShow] = useState(false);
  const [showModel, setShowModel] = useState(false);
  return (
    <div class="wrapper">
      {/* <section class="block col-12 block-desktop col-12-desktop"> */}
      <section class="models ">
        <h4>
          <button
            style={{ outline: "none" }}
            aria-expanded="true"
            class="models-control"
            onClick={() => setShowModel(!showModel)}
          >
            <span>Models</span>
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </h4>
        {showModel && (
          <div style={{ marginBottom: "20px" }}>
            {Object.keys(data).map(function (key, index) {
              return (
                <div
                  id={`model-${key}`}
                  class="model-container"
                  data-name={key}
                >
                  <span class="models-jump-to-path"></span>
                  <span class="model-box">
                    <button
                      style={{ outline: "none" }}
                      aria-expanded="false"
                      class="model-box-control"
                      onClick={() => {
                        setShow(!show);
                      }}
                    >
                      <span class="pointer">
                        <span class="model-box">
                          <span class="model model-title">{key}</span>
                        </span>
                      </span>
                      <span class="model-toggle collapsed"></span>
                      <span> </span>
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
      {/* </section> */}
    </div>
  );
}
