import React, { useState } from "react";

export default function Header({ basePath, setBasePath }) {
  const [tempBasePath, setTempBasePath] = useState("");
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
              src="https://rcteambuilder.com/img/rc-logo-1.png"
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
            <input
              type="text"
              className="download-url-input"
              defaultValue={basePath}
              onChange={(e) => {
                e.preventDefault();
                setTempBasePath(e.target.value);
              }}
              style={{ minWidth: "250px" }}
            />
            <button
              onClick={() => {
                setBasePath(tempBasePath);
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
