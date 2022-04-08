import React, { useState, useEffect } from "react";
import ReactJson from "react-json-view";
export default function SchemaToJson({
  models,
  schema,
  tryApi = false,
  type,
  theme = "railscasts",
  requestBodyParam,
  editable = true,
  setJsonBody,
}) {
  const [data, setData] = useState();

  let tempData = {};
  const formatSchema = (model) => {
    let temp1 = {};
    model &&
      model.properties &&
      Object.keys(model.properties).map(function (key, index) {
        return (temp1[key] =
          model.properties[key].$ref != null
            ? formatSchema(models[model.properties[key].$ref.substring(14)])
            : model.properties[key].type == "array"
            ? model.properties[key].items
              ? model.properties[key].items.$ref
                ? [
                    formatSchema(
                      models[model.properties[key].items.$ref.substring(14)]
                    ),
                  ]
                : [model.properties[key].items.type]
              : [model.properties[key].type]
            : model.properties[key].type == "object"
            ? model.properties[key].example
              ? model.properties[key].example
              : model.properties[key].type
            : model.properties[key].enum
            ? model.properties[key].type == "number" ||
              model.properties[key].type == "integer"
              ? Number(model.properties[key].enum[0])
              : model.properties[key].enum[0]
            : model.properties[key].type == "integer" ||
              model.properties[key].type == "number"
            ? 0
            : model.properties[key].type == "boolean"
            ? true
            : model.properties[key].example
            ? model.properties[key].example
            : model.properties[key].type);
      });

    return temp1;
  };

  useEffect(() => {
    if (models) {
      if (requestBodyParam) {
        setData(formatSchema(requestBodyParam));
      } else {
        formatJson();
      }
    }
  }, []);
  useEffect(() => {
    editable && setJsonBody(data);
  }, [data]);

  const formatJson2 = (key1, temp) => {
    if (models[temp].properties[key1].$ref) {
      tempData[key1] = formatSchema(
        models[models[temp].properties[key1].$ref.substring(14)]
      );
    } else if (models[temp].properties[key1].type == "array") {
      if (models[temp].properties[key1].items) {
        if (models[temp].properties[key1].items.$ref) {
          tempData[key1] = [
            formatSchema(
              models[models[temp].properties[key1].items.$ref.substring(14)]
            ),
          ];
        } else tempData[key1] = [models[temp].properties[key1].items.type];
      } else tempData[key1] = [models[temp].properties[key1].type];
    } else if (models[temp].properties[key1].type == "object") {
      if (models[temp].properties[key1].example)
        tempData[key1] = models[temp].properties[key1].example;
      else tempData[key1] = {};
    } else if (models[temp].properties[key1].enum) {
      if (
        models[temp].properties[key1].type == "number" ||
        models[temp].properties[key1].type == "integer"
      ) {
        tempData[key1] = Number(models[temp].properties[key1].enum[0]);
      } else {
        tempData[key1] = models[temp].properties[key1].enum[0];
      }
    } else {
      if (
        models[temp].properties[key1].type == "integer" ||
        models[temp].properties[key1].type == "number"
      )
        tempData[key1] = 0;
      else if (models[temp].properties[key1].type == "boolean")
        tempData[key1] = true;
      else if (models[temp].properties[key1].example)
        tempData[key1] = models[temp].properties[key1].example;
      else tempData[key1] = models[temp].properties[key1].type;
    }
  };
  const formatJson = () => {
    const temp = Object.keys(models).find(function (key, index) {
      return key.toLowerCase() == schema.toLowerCase().substring(14);
    });
    temp &&
      models[temp].properties &&
      Object.keys(models[temp].properties).map(function (key1) {
        return formatJson2(key1, temp);
      });
    type == "array" ? setData([tempData]) : setData(tempData);
  };
  const check = () => {
    if (tryApi && editable)
      return (update) => {
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
      theme={theme}
      displayObjectSize={true}
      displayDataTypes={false}
      enableClipboard={true}
      name={null}
    />
  );
}
