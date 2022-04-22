import React, { useState } from "react";
import { Button, Modal, Spin, Form, Input, Select, message, Tabs } from "antd";
import AddParameter from "./AddParameter";
import axios from "axios";
import { api_base_url } from "../../../constants";
import AddResponse from "./AddResponse";
export default function AddApi({
  addApi,
  setAddApi,
  tags,
  tag,
  setRefresh,
  refresh,
}) {
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [parameterData, setParameterData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    type: "post",
    tags: [tag.name],
    produces: ["application/json"],
    consumes: ["application/json"],
  });
  const formItemLayout = {
    labelCol: {
      xs: { span: 0 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 0 },
      sm: { span: 18 },
    },
  };
  const handleDetails = (value, type) => {
    let object = {};
    object[type] = value;
    setDetails({ ...details, ...object });
  };
  const handleSubmit = () => {
    setLoading(true);

    const temp = parameterData.map((el) => {
      let temp1 = { ...el };
      // delete temp1.name;
      temp1.type == "model" && delete temp1.type;
      if (temp1.enumCheck != "yes") {
        temp1.enumCheck && delete temp1.enumCheck;
        temp1.enum && delete temp1.enum;
      }
      if (temp1.arrayType) {
        temp1.items = {
          type: temp1.arrayType,
        };
        delete temp1.arrayType;
      }
      if (temp1.arrayref) {
        temp1.items = {
          $ref: "#/definitions/" + temp1.arrayref,
        };
        delete temp1.arrayref;
      }
      temp1.arrayref && delete temp1.arrayref;
      return temp1;
    });
    let temp1 = {};
    responseData.forEach((el) => {
      let temp3 = { ...el };
      if (temp3.model) {
        if (temp3.array) {
          temp3.schema = {
            type: "array",
            items: {
              $ref: "#/definitions/" + temp3.model,
            },
          };
          delete temp3.array;
        } else {
          temp3.schema = {
            $ref: "#/definitions/" + temp3.model,
          };
        }
        delete temp3.model;
      }
      temp1[el.statusCode] = temp3;
    });

    let data = {
      ...details,
      tags: JSON.stringify(details.tags),
      produces: JSON.stringify(details.produces),
      consumes: JSON.stringify(details.consumes),
      project_id: JSON.parse(localStorage.getItem("project")).id,
      parameters: JSON.stringify(temp),
      responses: JSON.stringify(temp1),
    };
    axios
      .post(api_base_url + "/addPath", data)
      .then((res) => {
        setLoading(false);
        message.success("API Added Successfully");
        setAddApi(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        setLoading(false);
        message.error("API Not Added");
      });
    // setLoading(false);
  };
  return (
    <Modal
      width={950}
      title="Add New API"
      centered
      visible={addApi}
      onCancel={() => setAddApi(false)}
      footer={false}
    >
      <Spin spinning={loading}>
        <Form name="basic" {...formItemLayout}>
          <div style={{ display: "flex" }}>
            <Form.Item
              style={{ width: "45%" }}
              label="End Point"
              name="path"
              rules={[
                { required: true, message: "Please input API End Point!" },
              ]}
            >
              <Input
                placeholder="API End Point"
                onChange={(e) => handleDetails(e.target.value, "path")}
                // style={{ width: "400px" }}
              />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              style={{ width: "45%", marginLeft: "20px" }}
              rules={[{ required: true, message: "Please Select Type!" }]}
            >
              <Select
                name="type"
                defaultValue="post"
                onChange={(e) => handleDetails(e, "type")}
              >
                <Option value="get">GET</Option>
                <Option value="post">POST</Option>
                <Option value="put">PUT</Option>
                <Option value="delete">DELETE</Option>
                {/* <Option value="patch">PATCH</Option>
                <Option value="head">HEAD</Option>
                <Option value="options">OPTIONS</Option> */}
              </Select>
            </Form.Item>
          </div>
          <div style={{ display: "flex" }}>
            <Form.Item style={{ width: "45%" }} label="Summary" name="summary">
              <Input
                placeholder="Summary"
                onChange={(e) => handleDetails(e.target.value, "summary")}
                // style={{ width: "400px" }}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              style={{ width: "45%", marginLeft: "20px" }}
            >
              <Input
                placeholder="Description"
                onChange={(e) => handleDetails(e.target.value, "description")}
                // style={{ width: "400px" }}
              />
            </Form.Item>
          </div>
          <div style={{ display: "flex" }}>
            <Form.Item
              label="Consumes"
              name="consumes"
              style={{ width: "45%" }}
              rules={[
                { required: true, message: "Please Select Consumes Type!" },
              ]}
            >
              <Select
                mode="tags"
                name="type"
                defaultValue="application/json"
                onChange={(e) => handleDetails(e, "consumes")}
              >
                <Option value="application/json">application/json</Option>
                <Option value="application/xml">application/xml</Option>
                <Option value="application/x-www-form-urlencoded">
                  application/x-www-form-urlencoded
                </Option>
                <Option value="multipart/form-data">multipart/form-data</Option>
                <Option value="text/plain; charset=utf-8">
                  text/plain; charset=utf-8
                </Option>
                <Option value="text/html">text/html</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Produces"
              name="produces"
              style={{ width: "45%", marginLeft: "20px" }}
              rules={[
                { required: true, message: "Please Select Produces Type!" },
              ]}
            >
              <Select
                mode="tags"
                name="Produces"
                defaultValue="application/json"
                onChange={(e) => handleDetails(e, "produces")}
              >
                <Option value="application/json">application/json</Option>
                <Option value="application/xml">application/xml</Option>
                <Option value="application/x-www-form-urlencoded">
                  application/x-www-form-urlencoded
                </Option>
                <Option value="multipart/form-data">multipart/form-data</Option>
                <Option value="text/plain; charset=utf-8">
                  text/plain; charset=utf-8
                </Option>
                <Option value="text/html">text/html</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label="Tags"
            name="tags"
            style={{ width: "45%" }}
            value={details.tags}

            // rules={[{ required: true, message: "Please Select Tags!" }]}
          >
            <Select
              mode="multiple"
              name="tags"
              defaultValue={tag.name}
              onChange={(e) => {
                handleDetails(e);
              }}
              // onSelect={(e) => handleDetails(e, "tags")}
            >
              <Option>{"safa"}</Option>
              {tags.map((el) => {
                return <Option value={el.name}>{el.name}</Option>;
              })}
            </Select>
          </Form.Item>

          <hr />
          <Tabs defaultActiveKey="1">
            {details.type != "get" ||
              (details.type != "delete" && (
                <TabPane tab="Request" key="1">
                  <AddParameter
                    setParameterData={setParameterData}
                    parameterData={parameterData}
                    type={details.type}
                  />
                </TabPane>
              ))}
            <TabPane tab="Response" key="2">
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <span style={{ marginLeft: "5px" }}>Status Code</span>
                <span style={{ marginLeft: "100px" }}>Description</span>
                <span style={{ marginLeft: "237px" }}>Model</span>
                <span style={{ marginLeft: "140px" }}>Array</span>
              </div>
              <AddResponse
                setResponseData={setResponseData}
                responseData={responseData}
              />
            </TabPane>
          </Tabs>

          <Form style={{ overflow: "scroll", maxHeight: "40vh" }}></Form>
          <Form.Item wrapperCol={{ offset: 10, span: 8 }}>
            <Button type="primary" htmlType="button" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
