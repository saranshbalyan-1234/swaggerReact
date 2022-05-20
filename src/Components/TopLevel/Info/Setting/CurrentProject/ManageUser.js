import React, { useEffect, useState } from "react";
import axios from "axios";
import { api_base_url } from "../../../../../constants";
import { Button, Tag, Spin, Select, Switch, message } from "antd";
export default function ManageUser({ visible, admin, canImport }) {
  const { Option } = Select;
  const [allUser, setAllUser] = useState([]);
  const [addUser, setAddUser] = useState({ id: 0, admin: 1 });
  const [projectUser, setProjectUser] = useState([]);
  const [manageUserLoading, setManageUserLoading] = useState(true);

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
    setManageUserLoading(true);
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
        setManageUserLoading(false);
      })
      .catch((err) => {
        setManageUserLoading(false);
        message.error("Something Went Wrong");
      });
  };
  useEffect(() => {
    if (visible) {
      axios
        .post(api_base_url + "/getAllUser", {
          project_id: JSON.parse(localStorage.getItem("project"))?.id,
        })
        .then((res) => {
          setManageUserLoading(false);
          setAllUser(res.data.allUser);
          setProjectUser(res.data.projectUser);
        })
        .catch((err) => {
          setManageUserLoading(false);
          message.error("Cannot Get User List");
        });
    }
  }, [visible]);

  return (
    <Spin spinning={manageUserLoading}>
      <div style={{ display: "flex" }}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search Name"
          onSelect={(e) => handleChange(e)}
        >
          {allUser.map((user, index) => {
            return (
              <Option key={index} id={user.id + "option"} value={user.id}>
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
        {projectUser.map((user, index) => {
          return (
            <Tag key={index} color={color[Math.floor(Math.random() * 11)]}>
              {user.user.name}
            </Tag>
          );
        })}
      </div>
    </Spin>
  );
}
