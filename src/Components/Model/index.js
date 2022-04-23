import React, { useState } from "react";
import SingleModel from "./singleModel";
import { Button, Input, Empty } from "antd";
import AddModel from "./AddModel";
const { Search } = Input;
export default function Model({ data, editMode, refresh, setRefresh, admin }) {
  const [showModel, setShowModel] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [search, setSearch] = useState("");
  const onSearch = (e) => {
    setShowModel(true);
    setSearch(e.target.value.toLowerCase());
  };
  return (
    <div className="wrapper">
      <section className="models ">
        <h4>
          <div
            style={{ outline: "none" }}
            aria-expanded="true"
            className="models-control"
            onClick={() => setShowModel(!showModel)}
          >
            <span style={{ display: "flex" }}>
              <div style={{ marginRight: "10px" }}>Models</div>

              {editMode && admin && (
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
          </div>{" "}
          <div
            style={{
              width: "250px",
              position: "absolute",
              left: editMode ? 200 : 110,
            }}
            onClick={() => setShowModel(true)}
          >
            <Search
              placeholder="Search Model"
              onChange={(e) => onSearch(e)}
              // enterButton
            />
          </div>
        </h4>
        {showModel && (
          <div style={{ marginBottom: "20px" }}>
            {Object.keys(data).length > 0 ? (
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
                      admin={admin}
                    />
                  )
                );
              })
            ) : (
              <Empty />
            )}
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
