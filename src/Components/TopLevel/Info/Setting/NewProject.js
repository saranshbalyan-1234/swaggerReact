import React, { useState } from "react";
import axios from "axios";
import { api_base_url } from "../../../../constants";
import { Button, Spin, message, Input, Form } from "antd";
export default function NewProject({
  setEditMode,
  setVisible,
  setLoadingImport,
  setAdmin,
  getAllProjectsByUser,
  setLoading,
}) {
  const [details, setDetails] = useState({
    name: "",
    description: "",
    version: "",
    title: "",
    host: "",
    basePath: "",
    schemes: ["http", "https"],
    project_id: null,
  });
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const handleDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let object = {};
    object[name] = value;

    setDetails({ ...details, ...object });
  };
  const importData = async () => {
    setLoadingImport(true);
    setLoading(true);
    const { data } = await axios.post(api_base_url + "/createProject", {
      admin: 1,
    });
    message.info("Processing");

    // setProjectName("");
    // setBasePath(projectName);

    await axios
      .post(api_base_url + "/addInfo", {
        ...details,
        project_id: data.id,
        schemes: JSON.stringify(details.schemes),
      })
      .then((res) => {
        message.success("Project Created");
        getAllProjectsByUser();
      })
      .catch((err) => {
        message.error("Something Went Wrong");
      });

    // getFromDataBase(data.id);
    localStorage.setItem(
      "project",
      JSON.stringify({ id: data.id, name: details.title, admin: 1 })
    );

    setAdmin(true);
    setEditMode(true);
    setVisible(false);
    setLoadingImport(false);
  };
  return (
    <Form
      {...formItemLayout}
      name="register"
      onFinish={importData}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: "Please enter Project Name",
          },
        ]}
      >
        <Input
          name="title"
          onChange={(e) => {
            handleDetails(e);
          }}
          placeholder="My Project"
        />
      </Form.Item>
      <Form.Item
        name="host"
        label="Host"
        rules={[
          {
            required: true,
            message: "Please enter API Host!",
          },
        ]}
      >
        <Input
          name="host"
          onChange={(e) => {
            handleDetails(e);
          }}
          placeholder="www.google.com"
        />
      </Form.Item>
      <Form.Item
        name="basePath"
        label="Base Path"
        rules={[
          {
            required: true,
            message: "Please enter API Base Path",
          },
        ]}
      >
        <Input
          name="basePath"
          onChange={(e) => {
            handleDetails(e);
          }}
          placeholder="/api"
        />
      </Form.Item>
      <Form.Item
        name="version"
        label="Version"
        rules={[
          {
            required: true,
            message: "Please enter Version",
          },
        ]}
      >
        <Input
          name="version"
          onChange={(e) => {
            handleDetails(e);
          }}
          placeholder="1.0"
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Please enter Description",
          },
        ]}
      >
        <Input.TextArea
          name="description"
          onChange={(e) => {
            handleDetails(e);
          }}
          placeholder="My Description"
        />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ marginRight: "20px" }}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}
