import React, { useState } from "react";
import { Button } from "antd";
export default function Api({ data, url, type }) {
  console.log("saransh", data.parameters);
  const [body, showBody] = useState(false);
  const [tryApi, setTryApi] = useState(false);
  return (
    <>
      <div
        style={{ marginLeft: "20px", marginRight: "20px" }}
        class={`opblock opblock-${type}`}
      >
        <div class="opblock-summary opblock-summary-get">
          <button
            aria-expanded="false"
            class="opblock-summary-control"
            style={{ outline: "none" }}
            onClick={() => showBody(!body)}
          >
            <span class="opblock-summary-method">{type}</span>
            <span class="opblock-summary-path">
              <a class="nostyle">
                <span>{url}</span>
              </a>
            </span>
            <div class="opblock-summary-description">{data.summary}</div>
            <i class="fa-solid fa-angle-down"></i>
          </button>
          <button
            class="authorization__btn unlocked"
            aria-label="authorization button unlocked"
          >
            <i class="fa fa-unlock"></i>
          </button>
        </div>
        <div class="no-margin">
          {body && (
            <div class="opblock-body">
              <div class="opblock-section">
                <div class="opblock-section-header">
                  <div class="tab-header">
                    <h4 class="opblock-title">Parameters</h4>
                  </div>
                  {!tryApi ? (
                    <div class="try-out">
                      <button
                        class="btn try-out__btn"
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
                <div class="parameters-container">
                  <div class="table-container">
                    <table class="parameters">
                      <thead>
                        <tr>
                          <th class="col_header parameters-col_name">Name</th>
                          <th class="col_header parameters-col_description">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.parameters.map((el) => {
                          return (
                            <tr
                              data-param-name="executionSuiteRunId"
                              data-param-in="path"
                            >
                              <td class="parameters-col_name">
                                <div
                                  class={`parameter__name ${
                                    el.required && `required`
                                  }`}
                                >
                                  {el.name}
                                  {el.required && <span>&nbsp;*</span>}
                                </div>
                                <div class="parameter__type">
                                  {el.type}
                                  <span class="prop-format">({el.format})</span>
                                </div>
                                <div class="parameter__deprecated"></div>
                                <div class="parameter__in">{el.in}</div>
                              </td>
                              <td class="parameters-col_description">
                                <div class="markdown">
                                  <p>{el.description}</p>
                                </div>
                                <input type="text" placeholder={el.name} />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {tryApi && (
                <div class="execute-wrapper">
                  <button class="btn execute opblock-control__btn">
                    Execute
                  </button>
                </div>
              )}
              <div class="execute-wrapper"></div>
              <div class="responses-wrapper">
                <div class="opblock-section-header">
                  <h4>Responses</h4>
                  <label for="get_api_executionSuiteRun__executionSuiteRunId__testCases_responses_select">
                    <span>Response content type</span>
                    <div class="content-type-wrapper execute-content-type">
                      <select
                        aria-controls="get_api_executionSuiteRun__executionSuiteRunId__testCases_responses"
                        aria-label="Response content type"
                        class="content-type"
                        id="get_api_executionSuiteRun__executionSuiteRunId__testCases_responses_select"
                      >
                        <option value="application/json">
                          application/json
                        </option>
                      </select>
                    </div>
                  </label>
                </div>
                <div class="responses-inner">
                  <table
                    aria-live="polite"
                    class="responses-table"
                    id="get_api_executionSuiteRun__executionSuiteRunId__testCases_responses"
                    role="region"
                  >
                    <thead>
                      <tr class="responses-header">
                        <td class="col_header response-col_status">Code</td>
                        <td class="col_header response-col_description">
                          Description
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="response " data-code="200">
                        <td class="response-col_status">200</td>
                        <td class="response-col_description">
                          <div class="response-col_description__inner">
                            <div class="markdown">
                              <p>OK</p>
                            </div>
                          </div>
                          <div class="model-example">
                            <ul class="tab" role="tablist">
                              <li class="tabitem active" role="presentation">
                                <button
                                  aria-controls="sOXORSQ="
                                  aria-selected="true"
                                  class="tablinks"
                                  data-name="example"
                                  id="N+akoPQ="
                                  role="tab"
                                >
                                  Example Value
                                </button>
                              </li>
                              <li class="tabitem" role="presentation">
                                <button
                                  aria-controls="vhIQdko="
                                  aria-selected="false"
                                  class="tablinks"
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
                                <div class="highlight-code">
                                  <pre class="example microlight">
                                    <code class="language-json">
                                      <span></span>
                                      <span class="hljs-attr">"dataSet"</span>
                                      <span>"string"</span>
                                      <span class="hljs-attr">"resultId"</span>
                                      <span> </span>
                                      <span>0</span>
                                      <span></span>
                                      <span class="hljs-attr">"sequence"</span>
                                      <span> </span>
                                      <span>0</span>
                                      <span></span>
                                      <span class="hljs-attr">
                                        "testCaseId"
                                      </span>
                                      <span> </span>
                                      <span>0</span>
                                      <span></span>
                                    </code>
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="response " data-code="401">
                        <td class="response-col_status">401</td>
                        <td class="response-col_description">
                          <div class="response-col_description__inner">
                            <div class="markdown">
                              <p>Unauthorized</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="response " data-code="403">
                        <td class="response-col_status">403</td>
                        <td class="response-col_description">
                          <div class="response-col_description__inner">
                            <div class="markdown">
                              <p>Forbidden</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="response " data-code="404">
                        <td class="response-col_status">404</td>
                        <td class="response-col_description">
                          <div class="response-col_description__inner">
                            <div class="markdown">
                              <p>Not Found</p>
                            </div>
                          </div>
                        </td>
                      </tr>
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
