import { Form, Input, Button, Checkbox, Card, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
      <Spin spinning={false}>
        <Card
          title="Login"
          bordered
          class="shadow"
          style={{
            width: "350px",
            height: "330px",
            boxShadow: "0px 0px 20px 20px black;",
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                type="email"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
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
