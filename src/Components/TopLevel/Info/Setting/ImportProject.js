import React from "react";
import { Button, message } from "antd";
import axios from "axios";
import { api_base_url } from "../../../../constants";
export default function ImportProject({
  canImport,
  setLoadingImport,

  getAllProjectsByUser,
  datas,
  setAdmin,
  setVisible,
  setLoading,
  setEditMode,
}) {
  const importData = async () => {
    setLoadingImport(true);
    setLoading(true);
    const { data } = await axios.post(api_base_url + "/createProject", {
      admin: 1,
    });
    message.info("Processing");
    await axios
      .post(api_base_url + "/import", {
        ...datas,
        project_id: data.id,
      })
      .then((res) => {
        message.success("Project Imported");
        getAllProjectsByUser();
      })
      .catch((err) => {
        message.error("error");
        setLoading(false);
      });

    localStorage.setItem(
      "project",
      JSON.stringify({ id: data.id, name: datas?.info?.title, admin: 1 })
    );

    setAdmin(true);
    setEditMode(true);

    setVisible(false);
    setLoadingImport(false);
  };
  return (
    <Button disabled={!canImport} type="primary" onClick={importData}>
      Import Current Swagger
    </Button>
  );
}
