import React, { useState } from "react";
import SingleModel from "./singleModel";
import { Button, Modal, Spin, Input, Form, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
export default function Model({ data, editMode }) {
  const [showModel, setShowModel] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [propertiesCount, setPropertiesCount] = useState([1]);
  const [propertiesData, setPropertiesData] = useState({});
  let oldKey = "";
  const { Option } = Select;
  const addProperty = () => {
    let temp = { ...propertiesData };
    temp.name = {};
    setPropertiesData(temp);
  };
  const renameKey = async (e) => {
    let newKey = e.target.value;
    console.log("property", oldKey, newKey);
    propertiesData[newKey] = propertiesData[oldKey];
    delete propertiesData[oldKey];
    console.log("property", propertiesData);
  };
  const removeProperty = (key) => {
    console.log("key", key);
    let temp = { ...propertiesData };
    delete temp[key];
    setPropertiesData(temp);
    console.log("property", propertiesData);
  };
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
            <span style={{ display: "flex" }}>
              <div style={{ marginRight: "10px" }}>Models</div>
              {editMode && (
                <Button type="primary" ghost onClick={() => setEditModal(true)}>
                  Add New
                </Button>
              )}
              <span></span>
            </span>
            <i
              style={{
                transform: showModel && "rotate(180deg)",
              }}
              className="fa-solid fa-angle-down"
            ></i>
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
                    key={index}
                  />
                );
              })}
          </div>
        )}
        <Modal
          width={800}
          title="Add New Model"
          centered
          visible={editModal}
          onCancel={() => setEditModal(false)}
          footer={false}
        >
          <Spin spinning={false}>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input model name!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please select type" }]}
              >
                <Select
                  placeholder="Select an option"
                  // onChange={onGenderChange}
                >
                  <Option value="object">Object</Option>
                  <Option value="array">Array</Option>
                </Select>
              </Form.Item>
              <hr />
              <h3>Properties</h3>
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <span style={{ marginLeft: "5px" }}>Name</span>
                <span style={{ marginLeft: "140px" }}>Type</span>
              </div>
              <Form
                name="dynamic_form_item"
                layout="vertical"
                style={{ overflow: "scroll", height: "30vh" }}
              >
                <Form.List
                  name="names"
                  rules={[
                    {
                      validator: async (_, names) => {
                        if (!names || names.length < 1) {
                          return Promise.reject(
                            new Error("At least 1 Property")
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Form.Item required={true} key={field.key}>
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    "Please input all all field or delete this",
                                },
                              ]}
                              noStyle
                            >
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <Input
                                  style={{ width: "170px" }}
                                  placeholder="Property name"
                                />
                                <Select
                                  defaultValue={"object"}
                                  placeholder="Select an option"
                                  style={{ width: "170px", marginLeft: "10px" }}
                                  // onChange={onGenderChange}
                                >
                                  <Option value="object">Object</Option>
                                  <Option value="array">Array</Option>
                                </Select>
                              </div>
                            </Form.Item>
                          </Form.Item>

                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              style={{
                                marginTop: "8px",
                                marginLeft: "10px",
                              }}
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          )}
                        </div>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{ width: "30%" }}
                          icon={<PlusOutlined />}
                        >
                          Add Property
                        </Button>

                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      </section>
    </div>
  );
}
