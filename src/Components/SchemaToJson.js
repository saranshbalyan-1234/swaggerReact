import React, { useState, useEffect } from "react";
import ReactJson from "react-json-view";
export default function SchemaToJson({ models, schema, tryApi = false, type }) {
  const [data, setData] = useState();
  useEffect(() => {
    console.log("requestBody", data);
  }, [data]);

  let tempData = {};
  const formatSchema = (model) => {
    let temp1 = {};
    Object.keys(model.properties).map(function (key, index) {
      return (temp1[key] =
        model.properties[key].$ref != null
          ? formatSchema(model[key.charAt(0).toUpperCase() + key.substring(1)])
          : model.properties[key].type);
    });

    return temp1;
  };
  useEffect(() => {
    formatJson();
  }, []);
  const formatJson = () => {
    const temp = Object.keys(models).find(function (key, index) {
      return key.toLowerCase() == schema.toLowerCase().substring(14);
    });
    Object.keys(models[temp].properties).map(function (key1) {
      return (tempData[key1] =
        models[temp].properties[key1].$ref != null
          ? formatSchema(
              models[key1.charAt(0).toUpperCase() + key1.substring(1)]
            )
          : models[temp].properties[key1].type);
    });
    type == "array" ? setData([tempData]) : setData(tempData);
  };
  const check = () => {
    if (tryApi)
      return (update) => {
        console.log(update, "edit");
        setData(update.updated_src);
      };
  };
  return (
    <ReactJson
      style={{ padding: "20px" }}
      src={data}
      onEdit={check()}
      onDelete={check()}
      onAdd={check()}
      theme={"railscasts"}
      displayObjectSize={true}
      displayDataTypes={false}
      enableClipboard={true}
      name={null}
    />
  );
}
