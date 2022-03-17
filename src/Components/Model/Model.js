import React, { useState } from "react";
import SingleModel from "./singleModel";
import { Button, Modal, Spin, Input, Form, Select, AutoComplete } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
export default function Model({ data, editMode }) {
  const [showModel, setShowModel] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [propertiesData, setPropertiesData] = useState([]);
  const { Option } = Select;
  const deleteRow = (index) => {
    console.log("index", index);
    let temp = [...propertiesData];
    temp.splice(index, 1);
    setPropertiesData(temp);
  };
  const handleData = (value, index, type) => {
    let temp = [...propertiesData];
    temp[index][type] = value;
    setPropertiesData(temp);
  };
  const handleSubmit = () => {
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
                <Form name="names">
                  {propertiesData.map((data, index) => (
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <Form.Item required={true} key={index}>
                        <Form.Item
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
                              onChange={(e) =>
                                handleData(e.target.value, index, "name")
                              }
                              value={propertiesData[index].name}
                            />
                            <Select
                              defaultValue={"object"}
                              style={{ width: "170px", marginLeft: "10px" }}
                              value={propertiesData[index].type}
                              onChange={(e) => handleData(e, index, "type")}
                            >
                              <Option value="object">Object</Option>
                              <Option value="array">Array</Option>
                              <Option value="string">String</Option>
                              <Option value="boolean">Boolean</Option>
                              <Option value="integer">Integer</Option>
                              <Option value="number">Number</Option>
                            </Select>
                            <AutoComplete
                              style={{ width: 200 }}
                              options={
                                propertiesData[index].type == "integer"
                                  ? [{ value: "int32" }, { value: "int64" }]
                                  : propertiesData[index].type == "number"
                                  ? [{ value: "float" }, { value: "double" }]
                                  : propertiesData[index].type == "string" && [
                                      {
                                        value: "date",
                                      },
                                      {
                                        value: "date-time",
                                      },
                                      {
                                        value: "email",
                                      },
                                      {
                                        value: "password",
                                      },
                                      {
                                        value: "byte",
                                      },
                                      {
                                        value: "binary",
                                      },
                                      {
                                        value: "hostname",
                                      },
                                      {
                                        value: "ipv4",
                                      },
                                      {
                                        value: "ipv6",
                                      },
                                      {
                                        value: "uri",
                                      },
                                      {
                                        value: "uuid",
                                      },
                                    ]
                              }
                              placeholder="Select format"
                              filterOption={(inputValue, option) =>
                                option.value
                                  .toUpperCase()
                                  .indexOf(inputValue.toUpperCase()) !== -1
                              }
                            />
                          </div>
                        </Form.Item>
                      </Form.Item>

                      <MinusCircleOutlined
                        style={{
                          marginTop: "8px",
                          marginLeft: "10px",
                        }}
                        className="dynamic-delete-button"
                        onClick={() => deleteRow(index)}
                      />
                    </div>
                  ))}

                  <Button
                    type="dashed"
                    onClick={() =>
                      setPropertiesData([
                        ...propertiesData,
                        { name: "", type: "object" },
                      ])
                    }
                    style={{ width: "30%" }}
                    icon={<PlusOutlined />}
                  >
                    Add Property
                  </Button>

                  {/* <Form.ErrorList errors={errors} /> */}
                </Form>
              </Form>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="button" onClick={handleSubmit}>
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
