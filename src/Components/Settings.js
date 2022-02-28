import React, { useState } from "react";
import { Modal, Button } from "antd";
export default function Settings({ servers }) {
  const [visible, setVisible] = useState(false);
  const handleAuth = () => {};
  return (
    <>
      <div class="scheme-container" style={{ marginTop: "-50px" }}>
        <section class="schemes wrapper block col-12">
          <div>
            <span class="servers-title">Servers</span>
            <div class="servers">
              <label for="servers">
                <select>
                  {servers &&
                    servers.map((el) => {
                      return <option value={el.url}>{el.description}</option>;
                    })}
                </select>
              </label>
            </div>
          </div>
          <div class="auth-wrapper">
            <button
              style={{ display: "flex", alignItems: "center" }}
              class="btn authorize unlocked"
              onClick={() => setVisible(true)}
            >
              <span>Authorize</span>

              <i class="fa fa-unlock"></i>
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
              class="btn authorize unlocked"
              onClick={{ handleAuth }}
            >
              <span>Authorize</span>

              <i class="fa fa-unlock"></i>
            </button>
            <button
              class="btn modal-btn auth btn-done button"
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
            <div class="wrapper">
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
