import React, { useState } from "react";
import { Button, Modal } from "antd";
export default function Info({ basePath }) {
  const [editMode, setEditMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleSave = () => {};
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
              onClick={{ handleSave }}
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
