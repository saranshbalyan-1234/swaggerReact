import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./TopLevel/Header";
import Info from "./TopLevel/Info";
import Settings from "./TopLevel/Settings";
import "antd/dist/antd.css";
import Tag from "./Tag";
import { Spin, message, Button, Input } from "antd";
import Model from "./Model/Model";
import { LoadingOutlined } from "@ant-design/icons";
import { api_base_url } from "../constants";
export default function Swagger({ basePath, setBasePath }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [canImport, setCanImport] = useState(true);
  const [projects, setProjects] = useState([]);
  const [tagSearch, setTagSearch] = useState("");
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  useEffect(() => {
    setLoading(true);
    setCanImport(true);
    getAllProjectsByUser();
  }, []);
  const getAllProjectsByUser = async () => {
    await axios
      .get(api_base_url + "/getAllProjectByUser")
      .then((res) => {
        // console.log("check", projects);
        setProjects(
          res.data.map((el) => {
            return { value: el.name, key: el.id };
          })
        );
        if (res.data.length > 0) {
          getData(res.data[0]);
        } else {
          getFromJson("/swagger.json");
        }
      })
      .catch((err) => {
        getFromJson("/swagger.json");
      });
  };
  const getData = (project) => {
    console.log("check", projects);

    if (localStorage.getItem("project")) {
      getFromDataBase(JSON.parse(localStorage.getItem("project")).id);
      setBasePath(JSON.parse(localStorage.getItem("project")).name);
    } else {
      getFromDataBase(project.id);
      localStorage.setItem(
        "project",
        JSON.stringify({ id: project.id, name: project.name })
      );
      setBasePath(projects[0].value);
    }

    setCanImport(false);
  };
  useEffect(() => {
    projects.length > 0 && getData();
  }, [refresh]);

  const getFromJson = (basePath) => {
    setLoading(true);
    setBasePath(basePath);
    axios
      .get(basePath)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Something Went Wrong");
      });
  };
  const getFromDataBase = async (id) => {
    setLoading(true);
    let pathTemp = {};
    let modelTemp = {};
    await axios
      .post(api_base_url + "/get", { project_id: id })
      .then((res) => {
        res.data.path.forEach((el) => {
          let object = {};
          object[el.type] = {
            ...el,
            consumes: JSON.parse(el.consumes ? el.consumes : null),
            parameters: JSON.parse(el.parameters ? el.parameters : null),
            produces: JSON.parse(el.produces ? el.produces : null),
            responses: JSON.parse(el.responses ? el.responses : null),
            security: JSON.parse(el.security ? el.security : null),
            tags: JSON.parse(el.tags ? el.tags : null),
            requestBody: JSON.parse(el.requestBody ? el.requestBody : null),
          };
          pathTemp[el.path] = { ...pathTemp[el.path], ...object };
        });
        res.data.models.forEach((el) => {
          let object = {};

          object[el.name] = { ...el, properties: JSON.parse(el.properties) };
          modelTemp = { ...modelTemp, ...object };
        });
        setData({
          ...res.data,
          paths: pathTemp,
          definitions: modelTemp,
        });
      })
      .catch((err) => {
        message.error("Something Went Wrong");
        setLoading(false);
      });

    setLoading(false);
  };
  return (
    <div id="swagger-ui">
      <section
        className="swagger-ui swagger-container"
        style={{ marginBottom: "100px" }}
      >
        <Header
          basePath={basePath}
          setBasePath={setBasePath}
          projects={projects}
          getFromDataBase={getFromDataBase}
          getFromJson={getFromJson}
          setLoading={setLoading}
        />

        <Info
          basePath={basePath}
          datas={data}
          setEditMode={setEditMode}
          editMode={editMode}
          canImport={canImport}
        />

        <Spin indicator={antIcon} spinning={loading}>
          <Settings
            servers={data.servers}
            schemes={data.schemes}
            editMode={editMode}
            refresh={refresh}
            setRefresh={setRefresh}
            setTagSearch={setTagSearch}
          />

          {data.tags &&
            data.tags.map((el, index) => {
              return (
                el.name.toLowerCase().includes(tagSearch) && (
                  <Tag
                    key={index}
                    tag={el}
                    paths={data.paths}
                    models={data.definitions}
                    tags={data.tags}
                    basePath={basePath}
                    editMode={editMode}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                )
              );
            })}
          <Model
            data={data.definitions}
            editMode={editMode}
            refresh={refresh}
            setRefresh={setRefresh}
            editMode={editMode}
          />
          <div style={{ height: "10px" }}></div>
        </Spin>
      </section>
    </div>
  );
}
