import React, { useState, useEffect } from "react";

import ApiUrl from "./Api/ApiUrl";
import { Input, Select, Popconfirm, message, Empty } from "antd";
import AddApi from "./Api/AddApi/AddApi";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { api_base_url } from "../constants";
export default function Tag({
  tag,
  paths,
  models,
  basePath,
  editMode,
  tags,
  refresh,
  setRefresh,
  scheme,
}) {
  const [data, setData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmLoading, setCofirmLoading] = useState(false);
  const [api, showApi] = useState(false);
  const [addApi, setAddApi] = useState(false);
  const [search, setSearch] = useState("");

  const onSearch = (e) => {
    showApi(true);
    setSearch(e.target.value.toLowerCase());
  };

  const { Search } = Input;

  useEffect(() => {
    for (const [key, value] of Object.entries(paths)) {
      data[key] = {};
      for (const [key1, value1] of Object.entries(value)) {
        value1.tags.forEach((el) => {
          if (el == tag.name) {
            data[key][key1] = value1;
          }
        });
      }
    }
  }, [paths]);
  const deleteTag = (id) => {
    setCofirmLoading(true);
    axios
      .post(api_base_url + "/deleteTag", { id: tag.id })
      .then((res) => {
        message.success("Tag Deleted Successfully");
        setRefresh(!refresh);
        setCofirmLoading(false);
        setShowConfirm(false);
      })
      .catch((err) => {
        message.error("something Went Wrong");
        setCofirmLoading(false);
        setShowConfirm(false);
      });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 0 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 0 },
      sm: { span: 18 },
    },
  };
  return (
    <>
      <h3
        className="opblock-tag-section"
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        <div
          className="opblock-tag"
          id="operations-tag-Cloud_App"
          data-tag="Cloud App"
          data-is-open="false"
        >
          <div className="nostyle" onClick={() => showApi(!api)}>
            <span>{tag && tag.name}</span>
          </div>

          <small onClick={() => showApi(!api)}>
            <div className="markdown">
              <p>{tag && tag.description}</p>
            </div>
          </small>
          <div></div>
          <button
            aria-expanded="false"
            className="expand-operation"
            title="Expand operation"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Search
              placeholder="Search API"
              onChange={(e) => onSearch(e)}
              onFocus={() => {
                showApi(true);
              }}
              // enterButton
              style={{ marginRight: "10px" }}
            />
            {editMode && (
              <>
                <PlusCircleOutlined
                  onClick={() => {
                    setAddApi(true);
                  }}
                  style={{ marginRight: "5px" }}
                />
                <Popconfirm
                  title="All Related Api Will Be Deleted too! Are you Sure? "
                  placement="left"
                  visible={showConfirm}
                  onConfirm={() => {
                    deleteTag();
                  }}
                  okText="Yes"
                  okButtonProps={{ loading: confirmLoading }}
                  onCancel={() => setShowConfirm(false)}
                >
                  {" "}
                  <DeleteOutlined
                    onClick={() => {
                      setShowConfirm(true);
                    }}
                    style={{ marginRight: "10px" }}
                  />
                </Popconfirm>
              </>
            )}
            <i
              onClick={() => showApi(!api)}
              className="fa-solid fa-angle-down"
              style={{
                transform: api && "rotate(180deg)",
              }}
            ></i>
          </button>
        </div>
      </h3>

      {api &&
        (data && Object.keys(data).length > 0 ? (
          Object.keys(data).map(function (key, index) {
            return (
              key.toLowerCase().includes(search) && (
                <ApiUrl
                  key={index}
                  basePath={basePath}
                  data={data[key]}
                  url={key}
                  models={models}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  editMode={editMode}
                  scheme={scheme}
                />
              )
            );
          })
        ) : (
          <Empty />
        ))}
      {addApi && (
        <AddApi
          refresh={refresh}
          setRefresh={setRefresh}
          addApi={addApi}
          setAddApi={setAddApi}
          tags={tags}
          tag={tag}
        />
      )}
    </>
  );
}
