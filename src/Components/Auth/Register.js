import React, { useState } from "react";
import { Form, Input, Checkbox, Button, Card, Spin, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { api_base_url } from "../../constants";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let object = {};
    object[name] = value;

    setDetails({ ...details, ...object });
  };
  const onRegister = () => {
    setLoading(true);
    axios
      .post(api_base_url + "/register", details)
      .then((res) => {
        message.success("Registered Successfully");
        navigate("/login");
        setLoading(false);
      })
      .catch((err) => {
        message.error("Something Went Wrong");
        setLoading(false);
      });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 28 },
      sm: { span: 9 },
    },
    wrapperCol: {
      xs: { span: 28 },
      sm: { span: 18 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 28,
        offset: 0,
      },
      sm: {
        span: 20,
        offset: 9,
      },
    },
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "10%",
        backgroundColor: "rgba(101,108,133,.8)",
        height: "100vh",
      }}
    >
      <Spin spinning={loading}>
        <Card title="Register" bordered>
          <Form
            // style={{ minWidth: "450px" }}
            {...formItemLayout}
            name="register"
            onFinish={onRegister}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input
                name="name"
                onChange={(e) => {
                  handleDetails(e);
                }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                name="email"
                onChange={(e) => {
                  handleDetails(e);
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                name="password"
                onChange={(e) => {
                  handleDetails(e);
                }}
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginRight: "20px" }}
              >
                Register
              </Button>
              Or <Link to="/login">Login now!</Link>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </div>
  );
};
export default Register;
