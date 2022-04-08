import React, { useState, useEffect } from "react";
import { Button, message, Spin, Upload, Popconfirm, Switch } from "antd";
import SchemaToJson from "../Util/SchemaToJson";
import axios from "axios";
import {
  UploadOutlined,
  DeleteOutlined,
  UnlockFilled,
} from "@ant-design/icons";
import ReactJson from "react-json-view";
import "../../Style/style.css";
import { api_base_url } from "../../constants";
export default function Api({
  data,
  url,
  type,
  models,
  basePath,
  refresh,
  setRefresh,
  editMode,
  scheme,
}) {
  const [body, showBody] = useState(false);
  const [tryApi, setTryApi] = useState(false);
  const [jsonBody, setJsonBody] = useState();
  const [newURL, setNewURL] = useState(url);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState(false);
  const [confirmLoading, setCofirmLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [response, setResponse] = useState();

  const deletePath = () => {
    setCofirmLoading(true);
    axios
      .post(api_base_url + "/deletePath", { id: data.id })
      .then((res) => {
        message.success("API Deleted Successfully");
        setRefresh(!refresh);
        setCofirmLoading(false);
        setShowConfirm(false);
      })
      .catch((err) => {
        message.error("something Went Wrong");
        setCofirmLoading(false);
        setShowConfirm(false);
      });
  };
  let formData = new FormData();
  let queryString = "";
  let searchParam = {};

  const executeApi = () => {
    console.log(newURL);
    let tempURL = newURL;

    if (tempURL.includes("{") && tempURL.includes("}")) {
      message.error("Invalid Path Variable");
      return;
    }
    if (queryString != "") tempURL = newURL + "?" + queryString;

    setLoading(true);
    if (jsonBody) {
      axios[type](scheme + basePath + tempURL, jsonBody)
        .then((res) => {
          message.success("Success");
          setLoading(false);
          setResponse(res.data);
        })
        .catch((err) => {
          message.error("Failed");
          setLoading(false);
          setResponse(err.response.data);
        });
    } else if (formdata) {
      axios[type](scheme + basePath + tempURL, formData)
        .then((res) => {
          message.success("Success");
          setLoading(false);
          setResponse(res.data);
        })
        .catch((err) => {
          message.error("Failed");
          setLoading(false);
          setResponse(err.response.data);
        });
    } else {
      axios[type](scheme + basePath + tempURL)
        .then((res) => {
          message.success("Success");
          setLoading(false);
          setResponse(res.data);
        })
        .catch((err) => {
          message.error("Failed");
          setLoading(false);
          setResponse(err.response.data);
        });
    }
  };
  const handleFile = async ({ file }, el) => {
    setFormdata(true);

    formData.append(el.name, file);
  };
  const handleParameter = (e, el) => {
    e.preventDefault();
    if (el.in == "path") {
      console.log("url", el.name);
      setNewURL(url.replace(`{${el.name}}`, e.target.value));
    } else if (el.in == "query") {
      let object = {};
      let name = el.name;
      let value = e.target.value;
      object[name] = value;
      searchParam = { ...searchParam, ...object };
      const params = new URLSearchParams(searchParam);
      queryString = params.toString();
    }

    if (el.in == "formData") {
      if (el.type == "file") {
        formData.append(el.name, e.target.files[0]);
      } else formData.append(el.name, e.target.value);
    }
  };
  const handleDeprecated = (e) => {
    axios
      .post(api_base_url + "/update", { id: data.id, deprecated: e ? 1 : 0 })
      .then((res) => {
        message.success("Status Changed");
        setRefresh(!refresh);
      })
      .catch((err) => {
        message.error("something Went Wrong");
      });
  };
  return (
    <>
      <div
        style={{ marginLeft: "20px", marginRight: "20px" }}
        className={`opblock opblock  opblock-${type} ${
          data.deprecated ? "opblock-deprecated" : ""
        }`}
      >
        <div className="opblock-summary opblock-summary-get">
          <button
            className="opblock-summary-control"
            style={{ outline: "none", overflow: "scroll" }}
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

          <UnlockFilled style={{ marginLeft: "5px", marginRight: "5px" }} />

          {editMode && (
            <div style={{ display: "flex" }}>
              {" "}
              <Popconfirm
                title="Are you Sure?"
                visible={showConfirm}
                onConfirm={() => {
                  deletePath();
                }}
                placement="left"
                okText="Yes"
                okButtonProps={{ loading: confirmLoading }}
                onCancel={() => setShowConfirm(false)}
              >
                <DeleteOutlined
                  onClick={() => {
                    // deleteModel(allData[data].id);
                    setShowConfirm(true);
                  }}
                  style={{ marginRight: "5px" }}
                />
              </Popconfirm>
              <Switch
                defaultChecked
                style={{ marginRight: "10px" }}
                onChange={(e) => {
                  handleDeprecated(e);
                }}
              />
            </div>
          )}
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
                    <button
                      class="btn try-out__btn cancel"
                      onClick={() => setTryApi(false)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
                <Spin spinning={loading}>
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
                              data.parameters.map((el, index) => {
                                return (
                                  <tr
                                    key={index}
                                    data-param-name="executionSuiteRunId"
                                    data-param-in="path"
                                  >
                                    <td className="parameters-col_name">
                                      <div
                                        className={`parameter__name ${
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
                                      <div className="parameter__in">
                                        {el.in}
                                      </div>
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
                                          >
                                            <div>
                                              <div className="highlight-code">
                                                <pre className="example ">
                                                  <div className="language-json">
                                                    {el.schema.$ref ||
                                                    el.schema.items ? (
                                                      <SchemaToJson
                                                        models={models}
                                                        schema={
                                                          el.schema.$ref
                                                            ? el.schema.$ref
                                                            : el.schema.items
                                                        }
                                                        type={
                                                          el.schema.$ref
                                                            ? "object"
                                                            : "array"
                                                        }
                                                        tryApi={tryApi}
                                                        setJsonBody={
                                                          setJsonBody
                                                        }
                                                      />
                                                    ) : (
                                                      <textarea
                                                        disabled={!tryApi}
                                                        onChange={(e) => {
                                                          setJsonBody(
                                                            e.target.value
                                                          );
                                                        }}
                                                      >
                                                        {el.description}
                                                      </textarea>
                                                    )}
                                                  </div>
                                                </pre>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ) : el.type == "file" ? (
                                        <>
                                          {/* <input
                                            type="file"
                                            style={{ maxWidth: "100px" }}
                                            placeholder={el.name}
                                            onChange={(e) =>
                                              handleParameter(e, el)
                                            }
                                          /> */}
                                          <Upload
                                            beforeUpload={() => false}
                                            onChange={(e) => handleFile(e, el)}
                                            style={{ maxWidth: "300px" }}
                                            // fileList={this.state.fileList}x
                                          >
                                            <Button
                                              disabled={!tryApi}
                                              icon={<UploadOutlined />}
                                            >
                                              Upload
                                            </Button>
                                          </Upload>
                                        </>
                                      ) : (
                                        <input
                                          type="text"
                                          placeholder={el.name}
                                          onChange={(e) =>
                                            handleParameter(e, el)
                                          }
                                          disabled={!tryApi}
                                          style={{}}
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
                    <div className="opblock-description-wrapper">
                      No Parameters
                    </div>
                  )}
                  {data.requestBody && (
                    <div className="opblock-section opblock-section-request-body">
                      <div className="opblock-section-header">
                        <h4
                          className={`opblock-title parameter__name ${
                            data.requestBody.required && "required"
                          }`}
                        >
                          Request body
                        </h4>
                        <label>
                          <div className="content-type-wrapper body-param-content-type">
                            <select
                              aria-label="Request content type"
                              className="content-type"
                            >
                              <option value="application/json">
                                application/json
                              </option>
                            </select>
                          </div>
                        </label>
                      </div>
                      <div className="opblock-description-wrapper">
                        <div>
                          <div className="renderedMarkdown">
                            <p>{data.requestBody.description}</p>
                          </div>
                          {data.requestBody.content && (
                            <div className="model-example">
                              <ul className="tab" role="tablist">
                                <li
                                  className="tabitem active"
                                  role="presentation"
                                >
                                  <button
                                    aria-controls="UQ3TnMk="
                                    aria-selected="true"
                                    className="tablinks"
                                    data-name="example"
                                    id="WA0MVUk="
                                    role="tab"
                                  >
                                    Example Value
                                  </button>
                                </li>
                                <li className="tabitem" role="presentation">
                                  <button
                                    aria-controls="Olyi0QQ="
                                    aria-selected="false"
                                    className="tablinks"
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
                              >
                                <div className="highlight-code">
                                  <pre
                                    className="microlight"
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
                </Spin>
              </div>
              {tryApi && (
                <div className="execute-wrapper">
                  <button
                    className="btn execute opblock-control__btn"
                    onClick={executeApi}
                  >
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
                          data.produces.map((el, index) => {
                            return (
                              <option key={index} value={el}>
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
                  <div>
                    {response && (
                      <ReactJson
                        style={{ padding: "20px" }}
                        src={response}
                        theme="railscasts"
                        displayObjectSize={true}
                        displayDataTypes={false}
                        enableClipboard={true}
                        name={null}
                      />
                    )}
                  </div>
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
                          <tr className="response " key={index} data-code={key}>
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
