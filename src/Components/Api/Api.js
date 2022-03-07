import React, { useState, useEffect } from "react";
import { Button } from "antd";
import SchemaToJson from "../Util/SchemaToJson";
import axios from "axios";
export default function Api({ data, url, type, models }) {
  const [body, showBody] = useState(false);
  const [tryApi, setTryApi] = useState(false);
  const [jsonBody, setJsonBody] = useState();
  console.log("response", data.response);
  console.log("body", data);
  useEffect(() => {
    console.log("jsonInApi", jsonBody);
  }, [jsonBody]);
  return (
    <>
      <div
        style={{ marginLeft: "20px", marginRight: "20px" }}
        class={`opblock opblock-${type}`}
      >
        <div className="opblock-summary opblock-summary-get">
          <button
            className="opblock-summary-control"
            style={{ outline: "none" }}
            onClick={() => showBody(!body)}
          >
            <span className="opblock-summary-method">{type}</span>
            <span className="opblock-summary-path">
              <a className="nostyle">
                <span style={{ minWidth: "1000px" }}>{url}</span>
              </a>
            </span>
            <div className="opblock-summary-description">{data.summary}</div>
            <i
              style={{
                transform: body && "rotate(180deg)",
              }}
              className="fa-solid fa-angle-down"
            ></i>
          </button>
          <button className="authorization__btn unlocked">
            <i className="fa fa-unlock"></i>
          </button>
        </div>
        <div className="no-margin">
          {body && (
            <div className="opblock-body">
              <div className="opblock-section">
                <div className="opblock-section-header">
                  <div className="tab-header">
                    <h4 className="opblock-title">Parameters</h4>
                  </div>
                  {!tryApi ? (
                    <div className="try-out">
                      <button
                        className="btn try-out__btn"
                        onClick={() => setTryApi(true)}
                      >
                        Try it out
                      </button>
                    </div>
                  ) : (
                    <Button
                      type="danger"
                      ghost
                      onClick={() => setTryApi(false)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                {data.parameters ? (
                  <div className="parameters-container">
                    <div className="table-container">
                      <table className="parameters">
                        <thead>
                          <tr>
                            <th className="col_header parameters-col_name">
                              Name
                            </th>
                            <th className="col_header parameters-col_description">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.parameters &&
                            data.parameters.map((el) => {
                              return (
                                <tr
                                  key={el}
                                  data-param-name="executionSuiteRunId"
                                  data-param-in="path"
                                >
                                  <td className="parameters-col_name">
                                    <div
                                      class={`parameter__name ${
                                        el.required && `required`
                                      }`}
                                    >
                                      {el.name}
                                      {el.required && <span>&nbsp;*</span>}
                                    </div>
                                    <div className="parameter__type">
                                      {el.type}
                                      <span className="prop-format">
                                        ({el.format})
                                      </span>
                                    </div>
                                    <div className="parameter__deprecated"></div>
                                    <div className="parameter__in">{el.in}</div>
                                  </td>
                                  <td className="parameters-col_description">
                                    <div className="markdown">
                                      <p>{el.description}</p>
                                    </div>
                                    {el.in == "body" ? (
                                      <div className="model-example">
                                        <ul className="tab" role="tablist">
                                          <li
                                            className="tabitem active"
                                            role="presentation"
                                          >
                                            <button
                                              aria-controls="sOXORSQ="
                                              aria-selected="true"
                                              className="tablinks"
                                              data-name="example"
                                              id="N+akoPQ="
                                              role="tab"
                                            >
                                              Example Value
                                            </button>
                                          </li>
                                          <li
                                            className="tabitem"
                                            role="presentation"
                                          >
                                            <button
                                              aria-controls="vhIQdko="
                                              aria-selected="false"
                                              className="tablinks"
                                              data-name="model"
                                              id="rE2hTbo="
                                              role="tab"
                                            >
                                              Model
                                            </button>
                                          </li>
                                        </ul>
                                        <div
                                          aria-hidden="false"
                                          aria-labelledby="N+akoPQ="
                                          data-name="examplePanel"
                                          id="sOXORSQ="
                                          role="tabpanel"
                                          tabindex="0"
                                        >
                                          <div>
                                            <div className="highlight-code">
                                              <pre className="example ">
                                                <div className="language-json">
                                                  {/* {el.schema.$ref} */}
                                                  <SchemaToJson
                                                    models={models}
                                                    schema={
                                                      el.schema.$ref
                                                        ? el.schema.$ref
                                                        : el.schema.items.$ref
                                                    }
                                                    type={
                                                      el.schema.$ref
                                                        ? "object"
                                                        : "array"
                                                    }
                                                    tryApi={tryApi}
                                                    setJsonBody={setJsonBody}
                                                  />
                                                </div>
                                              </pre>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : el.type == "file" ? (
                                      <input
                                        type="file"
                                        placeholder={el.name}
                                      />
                                    ) : (
                                      <input
                                        type="text"
                                        placeholder={el.name}
                                      />
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div class="opblock-description-wrapper">No Parameters</div>
                )}
                {data.requestBody && (
                  <div class="opblock-section opblock-section-request-body">
                    <div class="opblock-section-header">
                      <h4
                        class={`opblock-title parameter__name ${
                          data.requestBody.required && "required"
                        }`}
                      >
                        Request body
                      </h4>
                      <label>
                        <div class="content-type-wrapper body-param-content-type">
                          <select
                            aria-label="Request content type"
                            class="content-type"
                          >
                            <option value="application/json">
                              application/json
                            </option>
                          </select>
                        </div>
                      </label>
                    </div>
                    <div class="opblock-description-wrapper">
                      <div>
                        <div class="renderedMarkdown">
                          <p>{data.requestBody.description}</p>
                        </div>
                        {data.requestBody.content && (
                          <div class="model-example">
                            <ul class="tab" role="tablist">
                              <li class="tabitem active" role="presentation">
                                <button
                                  aria-controls="UQ3TnMk="
                                  aria-selected="true"
                                  class="tablinks"
                                  data-name="example"
                                  id="WA0MVUk="
                                  role="tab"
                                >
                                  Example Value
                                </button>
                              </li>
                              <li class="tabitem" role="presentation">
                                <button
                                  aria-controls="Olyi0QQ="
                                  aria-selected="false"
                                  class="tablinks"
                                  data-name="model"
                                  id="Q+mLZRs="
                                  role="tab"
                                >
                                  Schema
                                </button>
                              </li>
                            </ul>
                            <div
                              aria-hidden="false"
                              aria-labelledby="WA0MVUk="
                              data-name="examplePanel"
                              id="UQ3TnMk="
                              role="tabpanel"
                              tabindex="0"
                            >
                              <div class="highlight-code">
                                <pre
                                  class="microlight"
                                  // style="display: block; overflow-x: auto; padding: 0.5em; background: rgb(51, 51, 51); color: white;"
                                >
                                  <SchemaToJson
                                    models={["saransh"]}
                                    type={
                                      data.requestBody.content[
                                        "application/json"
                                      ].schema.type
                                    }
                                    tryApi={tryApi}
                                    requestBodyParam={
                                      data.requestBody.content[
                                        "application/json"
                                      ].schema
                                    }
                                    setJsonBody={setJsonBody}
                                  />
                                </pre>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {tryApi && (
                <div className="execute-wrapper">
                  <button className="btn execute opblock-control__btn">
                    Execute
                  </button>
                </div>
              )}
              <div className="execute-wrapper"></div>
              <div className="responses-wrapper">
                <div className="opblock-section-header">
                  <h4>Responses</h4>
                  <label for="get_api_executionSuiteRun__executionSuiteRunId__testCases_responses_select">
                    <span>Response content type</span>
                    <div className="content-type-wrapper execute-content-type">
                      <select
                        aria-controls="get_api_executionSuiteRun__executionSuiteRunId__testCases_responses"
                        aria-label="Response content type"
                        className="content-type"
                        id="get_api_executionSuiteRun__executionSuiteRunId__testCases_responses_select"
                      >
                        {data.produces ? (
                          data.produces.map((el) => {
                            return (
                              <option key={el} value={el}>
                                {el}
                              </option>
                            );
                          })
                        ) : (
                          <option>Default</option>
                        )}
                      </select>
                    </div>
                  </label>
                </div>
                <div className="responses-inner">
                  <table
                    aria-live="polite"
                    className="responses-table"
                    id="get_api_executionSuiteRun__executionSuiteRunId__testCases_responses"
                    role="region"
                  >
                    <thead>
                      <tr className="responses-header">
                        <td className="col_header response-col_status">Code</td>
                        <td className="col_header response-col_description">
                          Description
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(data.responses).map(function (key, index) {
                        return (
                          <tr className="response " key={key} data-code={key}>
                            <td className="response-col_status">{key}</td>
                            <td className="response-col_description">
                              <div className="response-col_description__inner">
                                <div className="markdown">
                                  <p>{data.responses[key].description}</p>
                                </div>
                              </div>
                              {data.responses[key].content && (
                                <SchemaToJson
                                  models={["saransh"]}
                                  type={
                                    data.responses[key].content[
                                      "application/json"
                                    ].schema.type
                                  }
                                  tryApi={tryApi}
                                  requestBodyParam={
                                    data.responses[key].content[
                                      "application/json"
                                    ].schema
                                  }
                                  editable={false}
                                />
                              )}
                              {data.responses[key].schema && (
                                <div className="model-example">
                                  <ul className="tab" role="tablist">
                                    <li
                                      className="tabitem active"
                                      role="presentation"
                                    >
                                      <button
                                        aria-controls="sOXORSQ="
                                        aria-selected="true"
                                        className="tablinks"
                                        data-name="example"
                                        id="N+akoPQ="
                                        role="tab"
                                      >
                                        Example Value
                                      </button>
                                    </li>
                                    <li className="tabitem" role="presentation">
                                      <button
                                        aria-controls="vhIQdko="
                                        aria-selected="false"
                                        className="tablinks"
                                        data-name="model"
                                        id="rE2hTbo="
                                        role="tab"
                                      >
                                        Model
                                      </button>
                                    </li>
                                  </ul>

                                  <div
                                    aria-hidden="false"
                                    aria-labelledby="N+akoPQ="
                                    data-name="examplePanel"
                                    id="sOXORSQ="
                                    role="tabpanel"
                                    tabindex="0"
                                  >
                                    <div>
                                      <div className="highlight-code">
                                        <pre className="example microlight">
                                          <div
                                            style={{ outline: "none" }}
                                            className="language-json"
                                          >
                                            {(data.responses[key].schema &&
                                              data.responses[key].schema.type !=
                                                "string" &&
                                              data.responses[key].schema
                                                ?.$ref) ||
                                            data.responses[key].schema?.items
                                              ?.$ref ? (
                                              <SchemaToJson
                                                schema={
                                                  data.responses[key].schema
                                                    .$ref
                                                    ? data.responses[key].schema
                                                        .$ref
                                                    : data.responses[key].schema
                                                        .items.$ref
                                                }
                                                models={models}
                                                type={
                                                  data.responses[key].schema
                                                    .$ref
                                                    ? "object"
                                                    : "array"
                                                }
                                                editable={false}
                                              />
                                            ) : data.responses[key].schema
                                                .type == "array" ? (
                                              `[${data.responses[key].schema.items.$ref}]`
                                            ) : (
                                              data.responses[key].schema.type ==
                                                "string" && "string"
                                            )}
                                          </div>
                                        </pre>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
