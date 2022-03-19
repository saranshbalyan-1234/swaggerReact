import React, { useState, useEffect } from "react";

import ApiUrl from "./Api/ApiUrl";
import {
  Button,
  Modal,
  Spin,
  Form,
  Input,
  Select,
  Popconfirm,
  message,
} from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { api_base_url } from "../constants";
export default function Tag({
  tag,
  paths,
  models,
  basePath,
  editMode,
  tags,
  refresh,
  setRefresh,
}) {
  const [data, setData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmLoading, setCofirmLoading] = useState(false);
  const [api, showApi] = useState(false);
  const [addApi, setAddApi] = useState(false);
  const [search, setSearch] = useState("");
  const onSearch = (e) => {
    showApi(true);
    setSearch(e.target.value.toLowerCase());
  };
  const { Option } = Select;
  const { Search } = Input;

  useEffect(() => {
    console.log("tags", tag);
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
  const deleteTag = (id) => {
    setCofirmLoading(true);
    axios
      .post(api_base_url + "/deleteTag", { id: tag.id })
      .then((res) => {
        message.success("Tag Deleted Successfully");
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
  return (
    <>
      <h3
        className="opblock-tag-section"
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        <div
          className="opblock-tag"
          id="operations-tag-Cloud_App"
          data-tag="Cloud App"
          data-is-open="false"
        >
          <div className="nostyle" onClick={() => showApi(!api)}>
            <span>{tag && tag.name}</span>
          </div>

          <small onClick={() => showApi(!api)}>
            <div className="markdown">
              <p>{tag && tag.description}</p>
            </div>
          </small>
          <div></div>
          <button
            aria-expanded="false"
            className="expand-operation"
            title="Expand operation"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Search
              placeholder="Search API"
              onChange={(e) => onSearch(e)}
              onFocus={() => {
                showApi(true);
              }}
              // enterButton
              style={{ marginRight: "10px" }}
            />
            {editMode && (
              <>
                <PlusCircleOutlined
                  onClick={() => {
                    setAddApi(true);
                  }}
                  style={{ marginRight: "5px" }}
                />
                <Popconfirm
                  title="All Related Api Will Be Deleted too! Are you Sure? "
                  placement="left"
                  visible={showConfirm}
                  onConfirm={() => {
                    deleteTag();
                  }}
                  okText="Yes"
                  okButtonProps={{ loading: confirmLoading }}
                  onCancel={() => setShowConfirm(false)}
                >
                  {" "}
                  <DeleteOutlined
                    onClick={() => {
                      setShowConfirm(true);
                    }}
                    style={{ marginRight: "10px" }}
                  />
                </Popconfirm>
              </>
            )}
            <i
              onClick={() => showApi(!api)}
              className="fa-solid fa-angle-down"
              style={{
                transform: api && "rotate(180deg)",
              }}
            ></i>
          </button>
        </div>
      </h3>

      {api &&
        data &&
        Object.keys(data).map(function (key, index) {
          return (
            key.toLowerCase().includes(search) && (
              <ApiUrl
                key={index}
                basePath={basePath}
                data={data[key]}
                url={key}
                models={models}
              />
            )
          );
        })}
      <Modal
        width={950}
        title="Add New API"
        centered
        visible={addApi}
        onCancel={() => setAddApi(false)}
        footer={false}
      >
        <Spin
          spinning={false}
          // spinning={loading}
        >
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
                  // onChange={(e) => setName(e.target.value)}
                  // style={{ width: "400px" }}
                />
              </Form.Item>
              <Form.Item
                label="Type"
                name="type"
                style={{ width: "45%", marginLeft: "20px" }}
                rules={[{ required: true, message: "Please Select Type!" }]}
              >
                <Select name="type" defaultValue="get">
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
              <Form.Item
                style={{ width: "45%" }}
                label="Summary"
                name="summary"
              >
                <Input
                  placeholder="Summary"
                  // onChange={(e) => setName(e.target.value)}
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
                  // onChange={(e) => setName(e.target.value)}
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
                <Select mode="tags" name="type" defaultValue="application/json">
                  <Option>application/json</Option>
                  <Option>application/xml</Option>
                  <Option>application/x-www-form-urlencoded</Option>
                  <Option>multipart/form-data</Option>
                  <Option>text/plain; charset=utf-8</Option>
                  <Option>text/html</Option>
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
                >
                  <Option>application/json</Option>
                  <Option>application/xml</Option>
                  <Option>application/x-www-form-urlencoded</Option>
                  <Option>multipart/form-data</Option>
                  <Option>text/plain; charset=utf-8</Option>
                  <Option>text/html</Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item
              label="Tags"
              name="tags"
              style={{ width: "45%" }}
              rules={[{ required: true, message: "Please Select Tags!" }]}
            >
              <Select mode="tags" name="type" defaultValue={tag.name}>
                {tags.map((el) => {
                  return <Option>{el.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <hr />
            <h3>Properties</h3>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginLeft: "5px" }}>Name</span>
              <span style={{ marginLeft: "140px" }}>Type</span>
              {/* <span style={{ marginLeft: "150px" }}>Format</span> */}
            </div>
            <Form style={{ overflow: "scroll", maxHeight: "40vh" }}></Form>
            <Form.Item wrapperCol={{ offset: 10, span: 8 }}>
              <Button
                type="primary"
                htmlType="button"
                //  onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}
