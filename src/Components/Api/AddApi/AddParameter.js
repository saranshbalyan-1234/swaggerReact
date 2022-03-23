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
import axios from "axios";
import { api_base_url } from "../../../constants";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
export default function AddParameter({ setParameterData, parameterData }) {
  const [allModel, setAllModel] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    axios
      .post(api_base_url + "/getAllModels", {
        project_id: JSON.parse(localStorage.getItem("project")).id,
      })
      .then((res) => setAllModel(res.data));
  }, []);
  const handleData = (value, index, type) => {
    let temp = [...parameterData];
    if (type != "ref") {
      temp[index][type] = value;
    } else {
      temp[index].schema = {
        $ref: "#/definitions/" + value,
      };
      // temp[index][type] = "#/definitions/" + value;
    }
    setParameterData(temp);
  };
  const deleteRow = (index) => {
    let temp = [...parameterData];
    temp.splice(index, 1);
    setParameterData(temp);
  };
  const handleEnum = (value, index) => {
    let temp = [...value];
    // if (propertiesData[index].enumCheck == "yes") {
    if (parameterData[index].type != "string") {
      temp = value.map((el) => {
        return Number(el);
      });
    }
    // }
    parameterData[index].enum = temp;
  };
  return (
    <Form name="names" style={{ overflow: "scroll", maxHeight: "40vh" }}>
      {parameterData.map((data, index) => (
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
                <Select
                  defaultValue={"body"}
                  style={{ width: "170px" }}
                  value={parameterData[index].in}
                  onChange={(e) => {
                    handleData(e, index, "in");
                    e == "body"
                      ? handleData("model", index, "type")
                      : handleData("object", index, "type");
                  }}
                >
                  <Option value="path">Path</Option>
                  <Option value="query">Query</Option>
                  <Option value="body">Body</Option>
                  {/* <Option value="header">Header</Option> */}
                </Select>
                <Input
                  style={{ width: "170px", marginLeft: "10px" }}
                  placeholder="Property name"
                  onChange={(e) => handleData(e.target.value, index, "name")}
                  value={parameterData[index].name}
                />
                <Select
                  defaultValue={
                    parameterData[index].in == "body" ? "object" : "string"
                  }
                  style={{ width: "170px", marginLeft: "10px" }}
                  value={parameterData[index].type}
                  onChange={(e) => handleData(e, index, "type")}
                >
                  {parameterData[index].in == "body" ? (
                    <Option value="model">Model</Option>
                  ) : (
                    <>
                      <Option value="object">Object</Option>
                      <Option value="array">Array</Option>
                      <Option value="string">String</Option>
                      <Option value="boolean">Boolean</Option>
                      <Option value="integer">Integer</Option>
                      <Option value="number">Number</Option>
                    </>
                  )}
                </Select>
                {(parameterData[index].type == "integer" ||
                  parameterData[index].type == "number" ||
                  parameterData[index].type == "string") && (
                  <>
                    <AutoComplete
                      onChange={(e) => handleData(e, index, "format")}
                      style={{ width: "170px", marginLeft: "10px" }}
                      options={
                        parameterData[index].type == "integer"
                          ? [{ value: "int32" }, { value: "int64" }]
                          : parameterData[index].type == "number"
                          ? [{ value: "float" }, { value: "double" }]
                          : parameterData[index].type == "string" && [
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
                    <Select
                      placeholder="ENUM?"
                      style={{ width: "170px", marginLeft: "10px" }}
                      onChange={(e) => handleData(e, index, "enumCheck")}
                    >
                      <Option value="no">No</Option>
                      <Option value="yes">Yes</Option>
                    </Select>
                  </>
                )}
                {parameterData[index].enumCheck == "yes" && (
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
                {parameterData[index].type == "model" && (
                  <Select
                    style={{ width: "170px", marginLeft: "10px" }}
                    placeholder="Select Model"
                    value={parameterData[index].ref?.substring(14)}
                    onChange={(e) => handleData(e, index, "ref")}
                  >
                    {allModel.map((el) => {
                      return <Option value={el.name}>{el.name}</Option>;
                    })}
                  </Select>
                )}
                {parameterData[index].type == "array" && (
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
                    value={parameterData[index].arrayType}
                    onChange={(e) => handleData(e, index, "arrayType")}
                  >
                    <Option value="string">String</Option>
                    <Option value="integer">Integer</Option>
                    <Option value="number">Number</Option>
                    <Option value="model">Model</Option>
                  </Select>
                )}
                {parameterData[index].type == "array" &&
                  parameterData[index].arrayType == "model" && (
                    <Select
                      style={{ width: "170px", marginLeft: "10px" }}
                      placeholder="Select Model"
                      value={parameterData[index].arrayref}
                      onChange={(e) => handleData(e, index, "arrayref")}
                    >
                      {allModel.map((el) => {
                        return <Option value={el.name}>{el.name}</Option>;
                      })}
                    </Select>
                  )}
              </div>
            </Form.Item>
          </Form.Item>

          {parameterData.length > 1 && (
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
          setParameterData([
            ...parameterData,
            { in: "body", name: "", type: "model" },
          ])
        }
        style={{ width: "30%" }}
        icon={<PlusOutlined />}
      >
        Add Property
      </Button>
    </Form>
  );
}