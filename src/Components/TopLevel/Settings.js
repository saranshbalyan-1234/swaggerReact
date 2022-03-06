import React, { useState } from "react";
import { Modal, Button } from "antd";
export default function Settings({ servers, schemes }) {
  const [visible, setVisible] = useState(false);
  const handleAuth = () => {};
  return (
    <>
      <div className="scheme-container" style={{ marginTop: "-50px" }}>
        <section className="schemes wrapper block col-12">
          <div>
            <span className="servers-title">Servers</span>
            <div className="servers">
              <label for="servers">
                <select>
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
                </select>
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
        footer={[
          <div
            className="swagger-ui"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              style={{ display: "flex", alignItems: "center" }}
              className="btn authorize unlocked"
              onClick={{ handleAuth }}
            >
              <span>Authorize</span>

              <i className="fa fa-unlock"></i>
            </button>
            <button
              className="btn modal-btn auth btn-done button"
              style={{ marginLeft: "10px" }}
              onClick={() => setVisible(false)}
            >
              Close
            </button>
          </div>,
        ]}
      >
        <div className="swagger-ui">
          <div>
            <div className="wrapper">
              <h3 style={{ fontWeight: "bold" }}>JWT (apiKey)</h3>

              <div>
                <p>
                  Name:<code>Authorization</code>
                </p>

                <p>
                  In:<code>header</code>
                </p>

                <label style={{ marginRight: "10px" }}>Value:</label>

                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
