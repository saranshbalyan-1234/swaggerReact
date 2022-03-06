import React from "react";

export default function Header({ basePath }) {
  return (
    <div className="topbar">
      <div className="wrapper">
        <div className="topbar-wrapper">
          <a rel="noopener noreferrer" className="link">
            <img
              height="40"
              src="https://rcteambuilder.com/img/rc-logo-1.png"
              alt="Swagger UI"
            />
          </a>
          <form className="download-url-wrapper">
            <input
              type="text"
              className="download-url-input"
              defaultValue={basePath}
            />
            <button className="download-url-button button">Explore</button>
          </form>
        </div>
      </div>
    </div>
  );
}
