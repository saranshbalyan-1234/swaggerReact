import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Info from "./Info";
import Settings from "./Settings";
import "antd/dist/antd.css";
import Tag from "./Tag";
import Model from "./Model";
export default function Swagger({ basePath }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(basePath).then((res) => {
      console.log("json", res.data);
      setData(res.data);
    });
  }, []);

  return (
    <div id="swagger-ui">
      <section
        className="swagger-ui swagger-container"
        style={{ marginBottom: "100px" }}
      >
        <Header basePath={basePath} />
        <Info basePath={basePath} />
        <Settings servers={data.servers} />
        {data.tags &&
          data.tags.map((el) => {
            return <Tag key={el} tag={el} paths={data.paths} />;
          })}
        <Model data={data.definitions} />
        <div style={{ height: "10px" }}></div>
      </section>
    </div>
  );
}
