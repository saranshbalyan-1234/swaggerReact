import React, { useState } from "react";
import { AutoComplete, message } from "antd";
export default function Header({
  basePath,
  setBasePath,
  projects,
  getFromDataBase,
  getFromJson,
  setAdmin,
  admin,
  setEditMode,
}) {
  const [tempBasePath, setTempBasePath] = useState("basePath");
  const validateURL = () => {
    var re = new RegExp(
      "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
    );
    if (re.test(tempBasePath)) {
      getFromJson(tempBasePath);
    } else {
      message.error("Please Enter Valid URL");
    }
  };
  const onSelect = (value, option) => {
    getFromDataBase(option.key);
    localStorage.setItem(
      "project",
      JSON.stringify({
        id: option.key,
        name: option.value,
        admin: option.admin,
      })
    );
    if (option.admin) {
      setAdmin(true);
      setEditMode(true);
    } else {
      setAdmin(false);
      setEditMode(true);
    }
  };
  return (
    <div className="topbar">
      <div className="wrapper">
        <div
          className="topbar-wrapper"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <a rel="noopener noreferrer" className="link">
            <img
              height="40"
              src="/logo.png"
              alt="Swagger UI"
              style={{
                minWidth: "200px",
                marginRight: "20px",
                marginBottom: "7px",
              }}
            />
          </a>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setBasePath(tempBasePath);
            }}
            className="download-url-wrapper"
          >
            <AutoComplete
              onSelect={(val, option) => onSelect(val, option)}
              defaultValue={basePath}
              defaultActiveFirstOption={true}
              allowClear
              onChange={(e) => {
                setTempBasePath(e);
              }}
              style={{ marginLeft: "10px", minWidth: "250px", width: "100%" }}
              options={projects}
              placeholder="Select Project or Enter JSON URL"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />

            <button
              onClick={() => {
                validateURL();
                // ("path", tempBasePath);
              }}
              type="button"
              className="download-url-button button"
            >
              Explore
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
