import React, { useState } from "react";
import { Button, Modal, Spin, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api_base_url } from "../../constants";
export default function Info({ basePath, datas, setEditMode, editMode }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loadingImport, setLoadingImport] = useState(false);

  const importData = async () => {
    setLoadingImport(true);
    const { data } = await axios.post(api_base_url + "/createProject");

    await axios
      .post(api_base_url + "/import", {
        ...datas,
        project_id: data.id,
      })
      .then((res) => {
        console.log(res.data);
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
                  <h2 className="title">
                    Swagger
                    <span>
                      <small>
                        <pre className="version">v1</pre>
                      </small>
                      <small className="version-stamp">
                        <pre className="version">By Saransh</pre>
                      </small>
                    </span>
                  </h2>
                  <div style={{ display: "flex" }}>
                    {localStorage.getItem("token") ? (
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
                  <span className="url">{basePath}</span>
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
      >
        <Spin spinning={loadingImport}>
          <Button type="primary" onClick={importData}>
            Import
          </Button>
        </Spin>
      </Modal>
    </>
  );
}
