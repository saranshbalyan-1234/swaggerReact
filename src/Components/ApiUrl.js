import React from "react";
import Api from "./Api";
export default function ApiUrl({ url, data }) {
  console.log("data", data);
  return (
    <>
      {Object.keys(data).map(function (key, index) {
        return <Api key={index} data={data[key]} type={key} url={url} />;
      })}
    </>
  );
}
