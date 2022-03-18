import React, { useState } from "react";
import SingleModel from "./singleModel";
import { Button, Input } from "antd";
import AddModel from "./AddModel";
const { Search } = Input;
export default function Model({ data, editMode, refresh, setRefresh }) {
  const [showModel, setShowModel] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [search, setSearch] = useState("");
  const onSearch = (value) => {
    setShowModel(true);
    setSearch(value.toLowerCase());
    console.log("search", value);
  };
  return (
    <div className="wrapper">
      <section className="models ">
        <h4>
          <button
            style={{ outline: "none" }}
            aria-expanded="true"
            className="models-control"
            onClick={() => setShowModel(!showModel)}
          >
            <span style={{ display: "flex" }}>
              <div style={{ marginRight: "10px" }}>Models</div>

              {editMode && (
                <Button type="primary" ghost onClick={() => setEditModal(true)}>
                  Add New
                </Button>
              )}
              <span></span>
            </span>
            <i
              style={{
                transform: showModel && "rotate(180deg)",
              }}
              className="fa-solid fa-angle-down"
            ></i>
          </button>{" "}
          <div
            style={{ width: "250px", position: "absolute", left: 110 }}
            onClick={() => setShowModel(true)}
          >
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </div>
        </h4>
        {showModel && (
          <div style={{ marginBottom: "20px" }}>
            {data &&
              Object.keys(data).map(function (key, index) {
                return (
                  key.toLowerCase().includes(search) && (
                    <SingleModel
                      data={key}
                      arrays={data[key]}
                      allData={data}
                      inside={false}
                      key={index}
                      editMode={editMode}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  )
                );
              })}
          </div>
        )}
      </section>

      {editModal && (
        <AddModel
          editModal={editModal}
          setEditModal={setEditModal}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}
