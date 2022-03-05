import React, { useState } from "react";

export default function SingleModel({ data, arrays, allData, inside = false }) {
  const [show, setShow] = useState(false);
  return (
    <div
      id={`model-${data}`}
      class="model-container"
      data-name={data}
      style={{ marginLeft: inside == true ? "-4px" : "15px" }}
    >
      <span class="models-jump-to-path"></span>
      <span
        class="model-box"
        style={{ padding: inside == true ? "0px" : "10px" }}
      >
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
              <span class="model model-title">{data}</span>
            </span>
          </span>
          <span class="model-toggle collapsed"></span>
          <span> </span>
        </button>
        <table class="model">
          <tbody>
            {show &&
              arrays &&
              Object.keys(arrays.properties).map(function (key, index) {
                console.log("modelKey", arrays.properties[key]);
                return (
                  <tr class="property-row">
                    <td> {key}</td>
                    <td>
                      {arrays.properties[key].$ref ? (
                        <table class="model">
                          <tbody>
                            {Object.keys(allData).map(function (key1, index) {
                              console.log(
                                "condition",
                                allData[key1].properties
                              );
                              return (
                                key1.toLowerCase() == key && (
                                  <SingleModel
                                    data={key1}
                                    arrays={allData[key1]}
                                    allData={allData}
                                    inside={true}
                                  />
                                )
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <span class="model">
                          <span class="prop">
                            <span class="prop-type">
                              {arrays.properties[key].type}
                            </span>
                            {arrays.properties[key].format && (
                              <span class="prop-format">
                                ({arrays.properties[key].format})
                              </span>
                            )}
                          </span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </span>
    </div>
  );
}
