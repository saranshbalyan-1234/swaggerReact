import React, { useState, useEffect } from "react";
import { Button, Modal, message, Tabs, Tag, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api_base_url } from "../../../constants";
import Settings from "./Setting";
const { TabPane } = Tabs;
export default function Info({
  basePath,
  datas,
  setEditMode,
  editMode,
  canImport,
  scheme,
  getAllProjectsByUser,
  setLoading,
  setAdmin,
  admin,
  host,
  path,
}) {
  const { Option } = Select;
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [logoutLoading, setLogoutLoading] = useState(false);

  const logout = async () => {
    setLogoutLoading(true);
    await axios
      .post(api_base_url + "/logout")
      .then((res) => {
        navigate("/login");
        localStorage.clear();
        message.success("Logged Out SuccessFully");
      })
      .catch(() => {
        message.error("something Went Wrong");
      });
    setLogoutLoading(false);
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
                        {!canImport && admin && (
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
                            loading={logoutLoading}
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
                      <Tag color="green">By SaranCe</Tag>{" "}
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
        <Settings
          admin={admin}
          canImport={canImport}
          datas={datas}
          host={host}
          path={path}
          setVisible={setVisible}
          setLoading={setLoading}
          getAllProjectsByUser={getAllProjectsByUser}
          setEditMode={setEditMode}
          setAdmin={setAdmin}
          visible={visible}
        />
      </Modal>
    </>
  );
}
