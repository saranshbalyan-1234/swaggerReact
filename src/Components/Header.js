import React from "react";

export default function Header({ basePath }) {
  return (
    <div class="topbar">
      <div class="wrapper">
        <div class="topbar-wrapper">
          <a rel="noopener noreferrer" class="link">
            <img
              height="40"
              src="https://rcteambuilder.com/img/rc-logo-1.png"
              alt="Swagger UI"
            />
          </a>
          <form class="download-url-wrapper">
            <input
              type="text"
              class="download-url-input"
              defaultValue={basePath}
            />
            <button class="download-url-button button">Explore</button>
          </form>
        </div>
      </div>
    </div>
  );
}
