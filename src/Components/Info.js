import React, { useState } from "react";
import { Button, Modal } from "antd";
export default function Info({ basePath }) {
  const [editMode, setEditMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleSave = () => {};
  return (
    <>
      <div
        class="information-container wrapper"
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <section class="block col-12">
          <div>
            <div class="info">
              <hgroup class="main">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 class="title">
                    Swagger
                    <span>
                      <small>
                        <pre class="version">v1</pre>
                      </small>
                      <small class="version-stamp">
                        <pre class="version">By Saransh</pre>
                      </small>
                    </span>
                  </h2>
                  <div style={{ display: "flex" }}>
                    {editMode && (
                      <Button
                        type="danger"
                        ghost
                        style={{ marginRight: "10px" }}
                        onClick={() => setVisible(true)}
                      >
                        Settings
                      </Button>
                    )}
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
                  </div>
                </div>
                <a
                  target="_blank"
                  href={basePath}
                  rel="noopener noreferrer"
                  class="link"
                >
                  <span class="url">{basePath}</span>
                </a>
              </hgroup>
              <div class="description"></div>
            </div>
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
              onClick={{ handleSave }}
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
