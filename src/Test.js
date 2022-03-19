import React, { useEffect, useState } from "react";
import axios from "axios";
import { isElementType } from "@testing-library/user-event/dist/utils";
export default function Test() {
  const [alteredData, setAlteredData] = useState({});

  useEffect(() => {
    let pathTemp = {};
    let modelTemp = {};
    axios.get("http://127.0.0.1:8000/api/get").then((res) => {
      res.data.path.forEach((el) => {
        let object = {};
        object[el.type] = {
          ...el,
          consumes: JSON.parse(el.consumes),
          parameters: JSON.parse(el.parameters),
          produces: JSON.parse(el.produces),
          responses: JSON.parse(el.responses),
          security: JSON.parse(el.security),
          tags: JSON.parse(el.tags),
        };
        pathTemp[el.path] = { ...pathTemp[el.path], ...object };
      });
      res.data.models.forEach((el) => {
        let object = {};

        object[el.name] = { ...el, properties: JSON.parse(el.properties) };
        modelTemp = { ...modelTemp, ...object };
      });
      setAlteredData({
        ...res.data,
        paths: pathTemp,
        definitions: modelTemp,
      });
    });
  }, []);

  return <div>Test</div>;
}
