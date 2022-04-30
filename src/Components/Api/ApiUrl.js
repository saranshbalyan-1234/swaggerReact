import React from "react";
import Api from ".";
export default function ApiUrl({
  url,
  data,
  basePath,
  models,
  refresh,
  setRefresh,
  editMode,
  scheme,
  admin,
}) {
  return (
    <>
      {Object.keys(data).map(function (key, index) {
        return (
          <Api
            key={index}
            data={data[key]}
            allApi={data}
            type={key}
            url={url}
            models={models}
            basePath={basePath}
            refresh={refresh}
            setRefresh={setRefresh}
            editMode={editMode}
            scheme={scheme}
            admin={admin}
          />
        );
      })}
    </>
  );
}
