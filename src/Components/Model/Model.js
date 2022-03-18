import React, { useState } from "react";
import SingleModel from "./singleModel";
import { Button } from "antd";

import AddModel from "./AddModel";
export default function Model({ data, editMode, refresh, setRefresh }) {
  const [showModel, setShowModel] = useState(false);
  const [editModal, setEditModal] = useState(false);

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
          </button>
        </h4>
        {showModel && (
          <div style={{ marginBottom: "20px" }}>
            {data &&
              Object.keys(data).map(function (key, index) {
                return (
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
