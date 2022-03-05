import React from "react";

export default function RequestBody({ models, el }) {
  const test = (model) => {
    // console.log("requestBodyModel", model.properties);

    const temp = Object.keys(model.properties).map(function (key, index) {
      return `${key}:${model.properties[key].$ref != null ? test(model[key.charAt(0).toUpperCase() + key.substring(1)]) : model.properties[key].type}`;
    });
    console.log("requestBodyModel", temp[0]);
    return temp;
  };
  return (
    <>
      {Object.keys(models).map(function (key, index) {
        console.log("definitions", el);
        return (
          key.toLowerCase() == el.schema.$ref.toLowerCase().substring(14) &&
          Object.keys(models[key].properties).map(function (key1, index) {
            return (
              <>
                {`${key1}:${
                  models[key].properties[key1].$ref != null
                    ? test(
                        models[key1.charAt(0).toUpperCase() + key1.substring(1)]
                      )
                    : models[key].properties[key1].type
                }`}
                <br />
              </>
            );
          })
        );
      })}
    </>
  );
}
