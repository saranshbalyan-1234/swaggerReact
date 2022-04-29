import React, { useState, useEffect } from "react";
import { Modal, Tooltip, Input, Form, Button, message, Spin } from "antd";
import axios from "axios";
import { api_base_url } from "../../constants";
export default function Additional({
  servers,
  schemes,
  editMode,
  refresh,
  setRefresh,
  setTagSearch,
  setScheme,
  admin,
  setTags,
  tags,
}) {
  const [authVisible, setAuthVisible] = useState(false);
  const [addTagVisible, setAddTagVisible] = useState(false);
  const [currentServer, setCurrentServer] = useState("");
  const [token, setToken] = useState({ value: "", status: "unauthorized" });
  const [addTagDetails, setAddTagDetails] = useState({});
  const [addTagLoading, setAddTagLoading] = useState(false);

  const onSearch = (e) => {
    setTagSearch(e.target.value.toLowerCase());
  };
  useEffect(() => {
    servers && setCurrentServer(servers[0].url);
  }, [servers]);
  useEffect(() => {
    localStorage.getItem("appToken") &&
      setToken(JSON.parse(localStorage.getItem("appToken")));
  }, [localStorage.getItem("appToken")]);
  const handleInput = (value) => {
    if (token.value.includes("Bearer")) {
      setToken({ ...token, value: value });
    } else {
      setToken({ ...token, value: "Bearer " + value });
    }
  };
  const handleDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let object = {};
    object[name] = value;

    setAddTagDetails({ ...addTagDetails, ...object });
  };
  const addTag = () => {
    setAddTagLoading(true);
    let data = {
      ...addTagDetails,
      project_id: JSON.parse(localStorage.getItem("project")).id,
    };
    axios
      .post(api_base_url + "/addTag", data)
      .then((res) => {
        setTags([...tags, res.data]);
        message.success("Tag Added SuccessFully");
        setAddTagLoading(false);
        setAddTagVisible(false);
      })
      .catch((err) => {
        setAddTagLoading(false);
        message.error("Somwthing Went Wronf");
      });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 0 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 0 },
      sm: { span: 18 },
    },
  };
  return (
    <>
      <div className="scheme-container" style={{ marginTop: "-50px" }}>
        <section className="schemes wrapper block col-12">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Input.Search
              placeholder="Search Tags"
              onChange={(e) => onSearch(e)}
              // enterButton
              style={{
                marginRight: "20px",
                marginTop: "14px",
                width: "250px",
                // marginBottom: "-20px",
              }}
            />
            <div>
              {/* <span className="servers-title">Servers</span> */}
              {/* <div className="servers">
                <label for="servers">
                  <Tooltip placement="right" title={currentServer}>
                    <select
                      value={currentServer}
                      onChange={(e) => {
                        setCurrentServer(e.target.value);
                      }}
                    >
                      {servers ? (
                        servers.map((el, index) => {
                          return (
                            <option key={index} value={el.url}>
                              {el.description}
                            </option>
                          );
                        })
                      ) : (
                        <option>Default Server</option>
                      )}
                    </select>{" "}
                  </Tooltip>
                </label>
              </div> */}
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "700" }} className="">
                Schemes
              </div>
              <div>Schemes</div>
              <div className="schemes">
                <label for="schemes">
                  <select
                    onChange={(e) => {
                      setScheme(e.target.value + "://");
                    }}
                  >
                    {schemes ? (
                      schemes.map((el, index) => {
                        return (
                          <option key={index} value={el}>
                            {el}
                          </option>
                        );
                      })
                    ) : (
                      <option>Default Scheme</option>
                    )}
                  </select>
                </label>
              </div>
            </div>
            {editMode && admin && (
              <>
                <Button
                  style={{
                    marginTop: "20px",
                    marginLeft: "20px",
                    marginBottom: "-10px",
                  }}
                  type="primary"
                  ghost
                  onClick={() => setAddTagVisible(true)}
                >
                  New Tag
                </Button>
              </>
            )}
          </div>
          <div className="auth-wrapper">
            <button
              style={{ display: "flex", alignItems: "center" }}
              className="btn authorize unlocked"
              onClick={() => setAuthVisible(true)}
            >
              <span>Authorize</span>

              <i className="fa fa-unlock"></i>
            </button>
          </div>
        </section>
        {/* 
        {editMode && admin&&(
          <>
            <Button
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                marginBottom: "-10px",
              }}
              type="primary"
              ghost
              onClick={() => setAddTagVisible(true)}
            >
              New Tag
            </Button>
      <Button
              style={{
                marginTop: "20px",
                marginLeft: "20px",
                marginBottom: "-10px",
              }}
              type="primary"
              ghost
              onClick={() => setAddTagVisible(true)}
            >
              New Server
            </Button> 
          </>
        )} */}
      </div>

      <Modal
        title="Available authorizations"
        centered
        visible={authVisible}
        onCancel={() => setAuthVisible(false)}
        footer={false}
      >
        <Form
          name="basic"
          onFinish={() => {
            setToken({ ...token, status: "authorized" });
            message.success("Authhorized");
            localStorage.setItem(
              "appToken",
              JSON.stringify({ ...token, status: "authorized" })
            );
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Bearer"
            name="Bearer Token"
            rules={[{ required: true, message: "Please Enter Bearer Token!" }]}
          >
            <Input
              onChange={(e) => {
                handleInput(e.target.value);
              }}
              defaultValue={token.value}
              disabled={token.status == "authorized"}
            />
          </Form.Item>
          <div
            className="swagger-ui"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "-20px",
            }}
          >
            <Form.Item>
              {token.status == "unauthorized" ? (
                <Button
                  htmlType="submit"
                  style={{ display: "flex", alignItems: "center" }}
                  className="btn authorize unlocked"
                >
                  Authorize
                  <i
                    style={{ marginLeft: "-10px" }}
                    className="fa fa-unlock"
                  ></i>
                </Button>
              ) : (
                <button
                  onClick={() => {
                    setToken({ ...token, status: "unauthorized" });
                    message.success("Unauthorized");
                    localStorage.setItem(
                      "appToken",
                      JSON.stringify({ ...token, status: "unauthorized" })
                    );
                  }}
                  style={{ display: "flex", alignItems: "center" }}
                  className="btn authorize unlocked"
                >
                  UnAuthorize
                  <i
                    style={{ marginLeft: "10px" }}
                    className="fa fa-unlock"
                  ></i>
                </button>
              )}
            </Form.Item>

            <Form.Item>
              <Button
                className="btn modal-btn auth btn-done button"
                style={{ marginLeft: "10px" }}
                onClick={() => setAuthVisible(false)}
              >
                Close
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Add New Tag"
        centered
        visible={addTagVisible}
        onCancel={() => setAddTagVisible(false)}
        footer={false}
      >
        <Spin spinning={addTagLoading}>
          <Form
            {...formItemLayout}
            name="register"
            onFinish={addTag}
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

            <Form.Item name="description" label="Description">
              <Input
                name="description"
                onChange={(e) => {
                  handleDetails(e);
                }}
              />
            </Form.Item>
            <Form.Item name="external_desc" label="External Desc">
              <Input
                name="external_desc"
                onChange={(e) => {
                  handleDetails(e);
                }}
              />
            </Form.Item>
            <Form.Item name="external_url" label="External URL">
              <Input
                name="external_url"
                onChange={(e) => {
                  handleDetails(e);
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginLeft: "100px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </>
  );
}
