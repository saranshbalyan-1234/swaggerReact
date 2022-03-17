import React, { useState } from "react";
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
export default function AddModel({ editModal, setEditModal }) {
  const [propertiesData, setPropertiesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
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
    setLoading(true);
    let temp = {};
    propertiesData.forEach((el) => {
      let temp1 = { ...el };
      delete temp1.name;

      temp[el.name] = temp1;
    });
    console.log("temp", temp);
    let data = {
      name: name,
      project_id: 4,
      properties: JSON.stringify(temp),
    };
    axios
      .post(api_base_url + "/importSingleModel", data)
      .then((res) => {
        setLoading(false);
        message.success("Model Added Successfully");
        setEditModal(false);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Model Not Added");
        setEditModal(false);
      });

    console.log("property", propertiesData);
  };
  return (
    <>
      <Modal
        width={800}
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
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <hr />
            <h3>Properties</h3>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginLeft: "5px" }}>Name</span>
              <span style={{ marginLeft: "140px" }}>Type</span>
              <span style={{ marginLeft: "150px" }}>Format</span>
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
            </Form>
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
