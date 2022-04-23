import React, { useState, useEffect } from "react";
import {
  Button,
  Tag,
  Spin,
  Divider,
  Select,
  Popconfirm,
  Switch,
  Input,
  message,
} from "antd";
import axios from "axios";
import { api_base_url } from "../../../../constants";
export default function CurrentProject({
  admin,
  canImport,
  loadingImport,
  setLoadingImport,
  setLoading,
  path,
  host,
  datas,
  visible,
  setVisible,
  getAllProjectsByUser,
}) {
  const { Option } = Select;

  const [currentProjectLoading, setCurrentProjectLoading] = useState(true);
  const [projectUser, setProjectUser] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [leaveConfirm, setLeaveConfirm] = useState(false);
  const [addUser, setAddUser] = useState({ id: 0, admin: 1 });
  const [allUser, setAllUser] = useState([]);
  const color = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];

  useEffect(() => {
    if (visible) {
      axios
        .post(api_base_url + "/getAllUser", {
          project_id: JSON.parse(localStorage.getItem("project"))?.id,
        })
        .then((res) => {
          setCurrentProjectLoading(false);
          setAllUser(res.data.allUser);
          setProjectUser(res.data.projectUser);
        })
        .catch((err) => {
          setCurrentProjectLoading(false);
          message.error("Cannot Get User List");
        });
    }
  }, [visible]);

  const changeAdmin = (value) => {
    value
      ? setAddUser({ ...addUser, admin: 1 })
      : setAddUser({ ...addUser, admin: 0 });
  };

  const handleChange = (e) => {
    setAddUser({
      ...addUser,
      id: e,
      name: document.getElementById(`${e}option`).title,
    });
  };

  const addUserToProject = () => {
    setCurrentProjectLoading(true);
    axios
      .post(api_base_url + "/addUserToProject", {
        user_id: addUser.id,
        project_id: JSON.parse(localStorage.getItem("project")).id,
        admin: addUser.admin,
      })
      .then((res) => {
        setProjectUser([
          ...projectUser,
          {
            user_id: addUser.id,
            user: {
              name: addUser.name,
            },
          },
        ]);
        setAllUser([
          ...allUser.filter((el) => {
            return el.id != addUser.id;
          }),
        ]);
        message.success("User Added Successfully");
        setCurrentProjectLoading(false);
      })
      .catch((err) => {
        setCurrentProjectLoading(false);
        message.error("Something Went Wrong");
      });
  };

  const deleteProject = async () => {
    setLoadingImport(true);
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
    setLoadingImport(false);
  };

  const leaveProject = async () => {
    setLoadingImport(true);
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
    setLoadingImport(false);
  };
  return (
    <Spin spinning={currentProjectLoading}>
      <div>
        <Divider style={{ marginTop: "-5px" }} plain>
          Manage Details
        </Divider>
        <Input placeholder="Project Name" value={datas?.info?.title} />
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Input placeholder="Host" style={{ width: 240 }} value={host} />
          <Input
            placeholder="Base Path"
            style={{
              width: 230,
              marginLeft: "10px",
            }}
            value={path}
          />
        </div>
        <Input.TextArea
          name="description"
          placeholder="Project Description"
          value={datas?.info?.description}
        />
        <Button type="primary" ghost style={{ marginTop: "10px" }}>
          Save Details
        </Button>
        <Divider plain>Manage User</Divider>
        <div style={{ display: "flex" }}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search Name"
            onSelect={(e) => handleChange(e)}
          >
            {allUser.map((user) => {
              return (
                <Option id={user.id + "option"} value={user.id}>
                  {user.name}
                </Option>
              );
            })}
          </Select>

          <Switch
            style={{ marginTop: "5px", marginLeft: "10px" }}
            defaultChecked
            checkedChildren="Admin"
            unCheckedChildren="Admin"
            onChange={changeAdmin}
          />
          <div style={{ marginLeft: "10px" }}>
            <Button
              disabled={canImport && !admin}
              onClick={addUserToProject}
              type="primary"
            >
              Add User To Project
            </Button>
          </div>
        </div>

        <div style={{ marginTop: "20px", display: "flex" }}>
          <div style={{ marginRight: "10px" }}> Users:</div>
          {projectUser.map((user) => {
            return (
              <Tag color={color[Math.floor(Math.random() * 11)]}>
                {user.user.name}
              </Tag>
            );
          })}
        </div>
      </div>
      <Divider></Divider>
      <div style={{ marginTop: "20px", display: "flex" }}>
        <div>
          <Popconfirm
            title="Are you Sure To Leave?"
            placement="left"
            visible={leaveConfirm}
            onConfirm={leaveProject}
            okText="Yes"
            okButtonProps={{ loading: loadingImport }}
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
            okButtonProps={{ loading: loadingImport }}
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
    </Spin>
  );
}
