import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Card, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api_base_url } from "../../constants";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onLogin = () => {
    setLoading(true);
    axios
      .post(api_base_url + "/login", details)
      .then((res) => {
        if (res.data.status == "failure") {
          message.error("Invalid Email or Password");
        } else {
          message.success("Logged In Successfully");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", res.data.id);
          navigate("/");
        }
        setLoading(false);
      })
      .catch((err) => {
        message.error("Invalid Email or Password");
        setLoading(false);
      });
  };
  const handleDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let object = {};
    object[name] = value;

    setDetails({ ...details, ...object });
  };
  return (
    <div className="outsideApp">
      <Spin spinning={loading}>
        <Card title="Login" bordered class="shadow">
          <img
            src="/logo2.svg"
            style={{ height: "50px", marginBottom: "10px" }}
          />
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onLogin}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                type="email"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  handleDetails(e);
                }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  handleDetails(e);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginRight: "20px" }}
              >
                Log in
              </Button>
              Or <Link to="/register">Register now!</Link>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </div>
  );
};
export default Login;
