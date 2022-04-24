import React, { useState } from "react";
import { Button, Popconfirm, message } from "antd";
import axios from "axios";
import { api_base_url } from "../../../../../constants";
export default function More({
  admin,
  canImport,
  setLoading,
  getAllProjectsByUser,
  setVisible,
}) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [leaveConfirm, setLeaveConfirm] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);
  const deleteProject = async () => {
    setBtnLoading(true);
    setLoading(true);
    await axios
      .post(api_base_url + "/deleteProjectById", {
        id: JSON.parse(localStorage.getItem("project"))?.id,
      })
      .then((res) => {
        getAllProjectsByUser();
        localStorage.removeItem("project");
        message.success("Project Deleted");
      })
      .catch((err) => {
        message.error("Something Went Wrong");
        setLoading(false);
      });
    setDeleteConfirm(false);
    setVisible(false);
    setBtnLoading(false);
  };

  const leaveProject = async () => {
    setBtnLoading(true);
    setLoading(true);
    await axios
      .post(api_base_url + "/deleteProjectById", {
        id: JSON.parse(localStorage.getItem("project"))?.id,
      })
      .then((res) => {
        getAllProjectsByUser();
        localStorage.removeItem("project");
        message.success("Project Removed");
      })
      .catch((err) => {
        message.error("Something Went Wrong");
        setLoading(false);
      });
    setLeaveConfirm(false);
    setVisible(false);
    setBtnLoading(false);
  };
  return (
    <div style={{ marginTop: "20px", display: "flex" }}>
      <div>
        <Popconfirm
          title="Are you Sure To Leave?"
          placement="left"
          visible={leaveConfirm}
          onConfirm={leaveProject}
          okText="Yes"
          okButtonProps={{ loading: btnLoading }}
          onCancel={() => setLeaveConfirm(false)}
        >
          <Button
            disabled={canImport && !admin}
            type="danger"
            onClick={() => setLeaveConfirm(true)}
            ghost
          >
            Leave Project
          </Button>
        </Popconfirm>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <Popconfirm
          title="Are you Sure To Delete? "
          placement="left"
          visible={deleteConfirm}
          onConfirm={deleteProject}
          okText="Yes"
          okButtonProps={{ loading: btnLoading }}
          onCancel={() => setDeleteConfirm(false)}
        >
          <Button
            disabled={canImport && !admin}
            type="danger"
            onClick={() => setDeleteConfirm(true)}
            ghost
          >
            Delete Project
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}
