import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./TopLevel/Header";
import Info from "./TopLevel/Info";
import Settings from "./TopLevel/Settings";
import "antd/dist/antd.css";
import Tag from "./Tag";
import Model from "./Model/Model";
export default function Swagger({ basePath, setBasePath }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    // axios.get(basePath).then((res) => {
    //   setData(res.data);
    // });
    let pathTemp = {};
    let modelTemp = {};
    axios.get("http://127.0.0.1:8000/api/get").then((res) => {
      console.log("test", res.data);

      res.data.path.forEach((el) => {
        let object = {};
        object[el.type] = {
          ...el,
          consumes: JSON.parse(el.consumes ? el.consumes : null),
          parameters: JSON.parse(el.parameters ? el.parameters : null),
          produces: JSON.parse(el.produces ? el.produces : null),
          responses: JSON.parse(el.responses ? el.responses : null),
          security: JSON.parse(el.security ? el.security : null),
          tags: JSON.parse(el.tags ? el.tags : null),
          requestBody: JSON.parse(el.requestBody ? el.requestBody : null),
        };
        pathTemp[el.path] = { ...pathTemp[el.path], ...object };
      });
      console.log("pathTemp", pathTemp);
      res.data.models.forEach((el) => {
        let object = {};

        object[el.name] = { ...el, properties: JSON.parse(el.properties) };
        modelTemp = { ...modelTemp, ...object };
      });
      console.log("modelTemp", modelTemp);
      setData({
        ...res.data,
        paths: pathTemp,
        definitions: modelTemp,
      });
    });

    console.log("definitions", data.definitions);
  }, [basePath]);

  return (
    <div id="swagger-ui">
      <section
        className="swagger-ui swagger-container"
        style={{ marginBottom: "100px" }}
      >
        <Header basePath={basePath} setBasePath={setBasePath} />
        <Info basePath={basePath} datas={data} />
        <Settings servers={data.servers} schemes={data.schemes} />
        {data.tags &&
          data.tags.map((el) => {
            return (
              <Tag
                key={el}
                tag={el}
                paths={data.paths}
                models={data.definitions}
                basePath={basePath}
              />
            );
          })}
        <Model data={data.definitions} />
        <div style={{ height: "10px" }}></div>
      </section>
    </div>
  );
}
