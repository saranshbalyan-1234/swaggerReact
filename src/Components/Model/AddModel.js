import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Spin,
  Input,
  Form,
  Select,
  AutoComplete,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { api_base_url } from "../../constants";
export default function AddModel({
  editModal,
  setEditModal,
  refresh,
  setRefresh,
}) {
  const [propertiesData, setPropertiesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allModel, setAllModel] = useState([]);
  const [name, setName] = useState("");
  const { Option } = Select;
  const deleteRow = (index) => {
    let temp = [...propertiesData];
    temp.splice(index, 1);
    setPropertiesData(temp);
  };
  const handleData = (value, index, type) => {
    let temp = [...propertiesData];
    if (type != "ref") {
      temp[index][type] = value;
    } else {
      temp[index][type] = "#/definitions/" + value;
    }
    setPropertiesData(temp);
  };
  const handleSubmit = () => {
    setLoading(true);
    let temp = {};
    propertiesData.forEach((el) => {
      let temp1 = { ...el };
      delete temp1.name;
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
      temp[el.name] = temp1;
    });

    let data = {
      name: name,
      project_id: JSON.parse(localStorage.getItem("project")).id,
      properties: JSON.stringify(temp),
    };
    axios
      .post(api_base_url + "/addModel", data)
      .then((res) => {
        setLoading(false);
        message.success("Model Added Successfully");
        setEditModal(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Model Not Added");
      });
    // setLoading(false);
  };
  useEffect(() => {
    axios
      .post(api_base_url + "/getAllModels", {
        project_id: JSON.parse(localStorage.getItem("project")).id,
      })
      .then((res) => setAllModel(res.data));
  }, []);
  const handleEnum = (value, index) => {
    let temp = [...value];
    // if (propertiesData[index].enumCheck == "yes") {
    if (propertiesData[index].type != "string") {
      temp = value.map((el) => {
        return Number(el);
      });
    }
    // }
    propertiesData[index].enum = temp;
  };
  return (
    <>
      <Modal
        width={950}
        title="Add New Model"
        centered
        visible={editModal}
        onCancel={() => setEditModal(false)}
        footer={false}
      >
        <Spin spinning={loading}>
          <Form name="basic">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input model name!" }]}
            >
              <Input
                onChange={(e) => setName(e.target.value)}
                // style={{ width: "400px" }}
              />
            </Form.Item>

            <hr />
            <h3>Properties</h3>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginLeft: "5px" }}>Name</span>
              <span style={{ marginLeft: "140px" }}>Type</span>
              {/* <span style={{ marginLeft: "150px" }}>Format</span> */}
            </div>
            {/* <Form> */}
            <Form
              name="names"
              style={{ overflow: "scroll", maxHeight: "40vh" }}
            >
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
                          message: "Please input all all field or delete this",
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
                          <Option value="model">Model</Option>
                        </Select>
                        {(propertiesData[index].type == "integer" ||
                          propertiesData[index].type == "number" ||
                          propertiesData[index].type == "string") && (
                          <>
                            <AutoComplete
                              onChange={(e) => handleData(e, index, "format")}
                              style={{ width: "170px", marginLeft: "10px" }}
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
                            {propertiesData[index].type == "string" && (
                              <Input
                                placeholder="Example"
                                style={{ width: "170px", marginLeft: "10px" }}
                                onChange={(e) =>
                                  handleData(e.target.value, index, "example")
                                }
                              />
                            )}
                            <Select
                              placeholder="ENUM?"
                              style={{ width: "170px", marginLeft: "10px" }}
                              onChange={(e) =>
                                handleData(e, index, "enumCheck")
                              }
                            >
                              <Option value="no">No</Option>
                              <Option value="yes">Yes</Option>
                            </Select>
                          </>
                        )}
                        {propertiesData[index].enumCheck == "yes" && (
                          <Select
                            mode="tags"
                            onChange={(value) =>
                              handleEnum(
                                value,

                                index
                              )
                            }
                            placeholder="Enter Enum Values"
                            style={{ width: "170px", marginLeft: "10px" }}
                          />
                        )}
                        {propertiesData[index].type == "model" && (
                          <Select
                            style={{ width: "170px", marginLeft: "10px" }}
                            placeholder="Select Model"
                            value={propertiesData[index].ref?.substring(14)}
                            onChange={(e) => handleData(e, index, "ref")}
                          >
                            {allModel.map((el) => {
                              return <Option value={el.name}>{el.name}</Option>;
                            })}
                          </Select>
                        )}
                        {propertiesData[index].type == "array" && (
                          // <Select
                          //   style={{ width: "170px", marginLeft: "10px" }}
                          //   placeholder="Select Model"
                          //   value={propertiesData[index].arrayref}
                          //   onChange={(e) => handleData(e, index, "arrayref")}
                          // >
                          //   {allModel.map((el) => {
                          //     return (
                          //       <Option value={el.name}>{el.name}</Option>
                          //     );
                          //   })}
                          // </Select>
                          <Select
                            style={{ width: "170px", marginLeft: "10px" }}
                            placeholder="Select Type"
                            value={propertiesData[index].arrayType}
                            onChange={(e) => handleData(e, index, "arrayType")}
                          >
                            <Option value="string">String</Option>
                            <Option value="integer">Integer</Option>
                            <Option value="number">Number</Option>
                            <Option value="model">Model</Option>
                          </Select>
                        )}
                        {propertiesData[index].type == "array" &&
                          propertiesData[index].arrayType == "model" && (
                            <Select
                              style={{ width: "170px", marginLeft: "10px" }}
                              placeholder="Select Model"
                              value={propertiesData[index].arrayref}
                              onChange={(e) => handleData(e, index, "arrayref")}
                            >
                              {allModel.map((el) => {
                                return (
                                  <Option value={el.name}>{el.name}</Option>
                                );
                              })}
                            </Select>
                          )}
                      </div>
                    </Form.Item>
                  </Form.Item>

                  {propertiesData.length > 1 && (
                    <MinusCircleOutlined
                      style={{
                        marginTop: "8px",
                        marginLeft: "10px",
                      }}
                      className="dynamic-delete-button"
                      onClick={() => deleteRow(index)}
                    />
                  )}
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
            </Form>
            {/* </Form> */}
            <Form.Item wrapperCol={{ offset: 10, span: 8 }}>
              <Button type="primary" htmlType="button" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}
