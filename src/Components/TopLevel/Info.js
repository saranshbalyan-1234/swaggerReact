import React, { useState } from "react";
import { Button, Modal, Spin, message, Tabs, Input, Tag } from "antd";
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
}) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);
  const [projectName, setProjectName] = useState("");

  const importData = async () => {
    setLoadingImport(true);
    const { data } = await axios.post(api_base_url + "/createProject", {
      projectName: projectName,
    });
    setProjectName("");
    await axios
      .post(api_base_url + "/import", {
        ...datas,
        project_id: data.id,
      })
      .then((res) => {
        message.success("success");
      })
      .catch((err) => {
        message.error("error");
      });
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
                  <h2 className="title" style={{ position: "relative" }}>
                    Swagger
                    <Tag
                      style={{
                        position: "absolute",
                        top: 0,
                        marginLeft: "10px",
                      }}
                      color="blue"
                    >
                      v1
                    </Tag>
                    <Tag
                      style={{
                        position: "absolute",
                        top: 0,
                        marginLeft: "45px",
                      }}
                      color="green"
                    >
                      By Saransh
                    </Tag>
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
                  href={basePath}
                  rel="noopener noreferrer"
                  className="link"
                >
                  {basePath && <Tag color="red">{basePath}</Tag>}
                </a>
              </hgroup>
              <div className="description"></div>
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
            <TabPane tab="Import" key="1">
              <div style={{ display: "flex" }}>
                <Input
                  disabled={!canImport}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter Project Name"
                  style={{ width: "250px", marginRight: "10px" }}
                />
                <Button
                  disabled={!canImport}
                  type="primary"
                  onClick={importData}
                >
                  Import Current Swagger
                </Button>
              </div>
            </TabPane>
            <TabPane tab="More" key="2">
              More
            </TabPane>
          </Tabs>
        </Spin>
      </Modal>
    </>
  );
}
