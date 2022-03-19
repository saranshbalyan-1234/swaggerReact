import React, { useState, useEffect } from "react";
import { Modal, Tooltip, Input, Form, Button, message } from "antd";
export default function Settings({ servers, schemes }) {
  const [visible, setVisible] = useState(false);
  const [currentServer, setCurrentServer] = useState("");
  const [token, setToken] = useState({ value: "", status: "unauthorized" });
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
  return (
    <>
      <div className="scheme-container" style={{ marginTop: "-50px" }}>
        <section className="schemes wrapper block col-12">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <span className="servers-title">Servers</span>
              <div className="servers">
                <label for="servers">
                  <Tooltip placement="right" title={currentServer + "sa"}>
                    {" "}
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
              </div>
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "700" }} className="">
                Schemes
              </div>
              <div>Schemes</div>
              <div className="schemes">
                <label for="schemes">
                  <select>
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
          </div>
          <div className="auth-wrapper">
            <button
              style={{ display: "flex", alignItems: "center" }}
              className="btn authorize unlocked"
              onClick={() => setVisible(true)}
            >
              <span>Authorize</span>

              <i className="fa fa-unlock"></i>
            </button>
          </div>
        </section>
      </div>

      <Modal
        title="Available authorizations"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
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
          // onFinishFailed={onFinishFailed}
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
                onClick={() => setVisible(false)}
              >
                Close
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}
