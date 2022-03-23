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
  Switch,
} from "antd";
import axios from "axios";
import { api_base_url } from "../../../constants";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function AddResponse({ responseData, setResponseData }) {
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
    console.log("response", value);
    let temp = [...responseData];
    temp[index][type] = value;
    setResponseData(temp);
  };
  const deleteRow = (index) => {
    let temp = [...responseData];
    temp.splice(index, 1);
    setResponseData(temp);
  };
  return (
    <Form name="names" style={{ overflow: "scroll", maxHeight: "40vh" }}>
      {responseData.map((data, index) => (
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
              <Input
                placeholder="Status Code"
                style={{ width: "170px" }}
                name="statusCode"
                onChange={(e) =>
                  handleData(e.target.value, index, "statusCode")
                }
              />
              <Input
                placeholder="Description"
                name="description"
                style={{ width: "300px", marginLeft: "10px" }}
                onChange={(e) =>
                  handleData(e.target.value, index, "description")
                }
              />
              <Select
                style={{ width: "170px", marginLeft: "10px" }}
                placeholder="Select Model"
                onChange={(e) => handleData(e, index, "model")}
              >
                {allModel.map((el) => {
                  return <Option value={el.name}>{el.name}</Option>;
                })}
              </Select>
              <Switch
                style={{ marginLeft: "10px" }}
                onChange={(e) => handleData(e, index, "array")}
              />
            </Form.Item>
          </Form.Item>

          {responseData.length > 1 && (
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
          setResponseData([
            ...responseData,
            { statusCode: "", description: "" },
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
