import React, { useState } from "react";
import {
  Button,
  Modal,
  Spin,
  message,
  Tabs,
  Input,
  Tag,
  Form,
  Popconfirm,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api_base_url } from "../../constants";
const { TabPane } = Tabs;
export default function Info({
  basePath,
  datas,
  setEditMode,
  editMode,
  canImport,
  getFromDataBase,
  setBasePath,
  scheme,
  getAllProjectsByUser,
  setLoading,
}) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [details, setDetails] = useState({
    name: "My Project",
    description: "My Description",
    version: "1",
    title: "Swagger",
    host: "www.google.com",
    basePath: "/api",
    schemes: ["http", "https"],
    project_id: 0,
  });

  const handleDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let object = {};
    object[name] = value;

    setDetails({ ...details, ...object });
  };

  const importData = async (type) => {
    setLoadingImport(true);
    setLoading(true);
    const { data } = await axios.post(api_base_url + "/createProject");
    message.info("Processing");
    // setProjectName("");
    // setBasePath(projectName);
    if (type == "import") {
      await axios
        .post(api_base_url + "/import", {
          ...datas,
          project_id: data.id,
        })
        .then((res) => {
          message.success("Project Imported");
          getAllProjectsByUser();
        })
        .catch((err) => {
          message.error("error");
          setLoading(false);
        });
    } else {
      axios
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
    }
    // getFromDataBase(data.id);
    localStorage.setItem(
      "project",
      JSON.stringify({ id: data.id, name: data.name })
    );
    setVisible(false);
    setLoadingImport(false);
  };
  const deleteProject = async () => {
    setLoadingImport(true);
    setLoading(true);
    await axios
      .post(api_base_url + "/deleteProjectById", {
        id: JSON.parse(localStorage.getItem("project"))?.id,
      })
      .then((res) => {
        getAllProjectsByUser();
        localStorage.removeItem("project");
        message.success("Project Deleted");
      })
      .catch((err) => {
        message.error("Something Went Wrong");
        setLoading(false);
      });
    setShowConfirm(false);
    setVisible(false);
    setLoadingImport(false);
  };
  const logout = () => {
    axios
      .post(api_base_url + "/logout")
      .then((res) => {
        navigate("/login");
        localStorage.clear();
        message.success("Logged Out SuccessFully");
      })
      .catch(() => {
        message.error("something Went Wrong");
      });
  };
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
  return (
    <>
      <div
        className="information-container wrapper"
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <section className="block col-12">
          <div>
            <div className="info">
              <hgroup className="main">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2
                    className="title"
                    style={{
                      position: "relative",
                      fontWeight: "bold",
                      fontSize: "45px",
                    }}
                  >
                    {datas.info && (
                      <>
                        {" "}
                        {datas?.info?.title}
                        <Tag
                          style={{
                            position: "absolute",
                            top: 0,
                            marginLeft: "10px",
                          }}
                          color="blue"
                        >
                          {datas?.info?.version}
                        </Tag>
                      </>
                    )}
                  </h2>

                  <div style={{ display: "flex" }}>
                    {localStorage.getItem("token") ? (
                      <>
                        {!canImport && (
                          <>
                            {editMode ? (
                              <Button
                                type="primary"
                                ghost
                                onClick={() => setEditMode(false)}
                              >
                                Save
                              </Button>
                            ) : (
                              <Button
                                type="primary"
                                ghost
                                onClick={() => setEditMode(true)}
                              >
                                Edit
                              </Button>
                            )}
                          </>
                        )}
                        <>
                          <Button
                            type="danger"
                            ghost
                            style={{ marginLeft: "10px" }}
                            onClick={() => setVisible(true)}
                          >
                            Settings
                          </Button>
                          <Button
                            type="danger"
                            ghost
                            style={{ marginLeft: "10px" }}
                            onClick={() => logout()}
                          >
                            Logout
                          </Button>
                        </>
                      </>
                    ) : (
                      <Link to="/login">
                        <Button
                          type="primary"
                          ghost
                          onClick={() => setEditMode(true)}
                        >
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                <a
                  target="_blank"
                  href={scheme + basePath}
                  rel="noopener noreferrer"
                  className="link"
                >
                  {basePath && (
                    <>
                      <Tag color="red">{basePath}</Tag>{" "}
                      <Tag color="green">By Saransh</Tag>{" "}
                    </>
                  )}
                </a>
              </hgroup>
              <div className="description">{datas?.info?.description}</div>
            </div>
          </div>
        </section>
      </div>

      <Modal
        title="Settings"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
        header={false}
      >
        <Spin spinning={loadingImport}>
          <Tabs
            style={{ marginTop: "-30px" }}
            defaultActiveKey="1"
            // onChange={callback}
          >
            <TabPane tab="Import Project" key="1">
              <Button
                disabled={!canImport}
                type="primary"
                onClick={() => importData("import")}
              >
                Import Current Swagger
              </Button>
            </TabPane>
            <TabPane tab="Delete Project" key="2">
              <Popconfirm
                title="Are you Sure? "
                placement="left"
                visible={showConfirm}
                onConfirm={deleteProject}
                okText="Yes"
                okButtonProps={{ loading: loadingImport }}
                onCancel={() => setShowConfirm(false)}
              >
                <Button
                  disabled={canImport}
                  type="danger"
                  onClick={() => setShowConfirm(true)}
                >
                  Delete Current Project
                </Button>
              </Popconfirm>
            </TabPane>
            <TabPane tab="New Project" key="3">
              <Form
                {...formItemLayout}
                name="register"
                onFinish={() => importData("new")}
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
            </TabPane>
          </Tabs>
        </Spin>
      </Modal>
    </>
  );
}
