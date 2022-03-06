import React, { useState } from "react";

export default function SingleModel({ data, arrays, allData, inside = false }) {
  const [show, setShow] = useState(false);
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
        <table className="model">
          <tbody>
            {show &&
              arrays &&
              Object.keys(arrays.properties).map(function (key, index) {
                console.log("modelKey", arrays.properties[key]);
                return (
                  <tr className="property-row">
                    <td> {key}</td>
                    <td>
                      {arrays.properties[key].$ref ? (
                        <table className="model">
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
                        <span className="model">
                          <span className="prop">
                            <span className="prop-type">
                              {arrays.properties[key].type}
                            </span>
                            {arrays.properties[key].format && (
                              <span className="prop-format">
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
