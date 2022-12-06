import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faPencil,
  faTrash,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../css/User.css";
import Grid from "@mui/material/Grid";
import { Button, Modal } from "antd";
import jsPDF from "jspdf";
import Pagination from "@mui/material/Pagination";

// Đã reponsive 2 màn hình 768 vs 425

export default function User() {
  return (
    <>
      <Paginate itemsPerPage={3} />
    </>
  );
}

function TableUser({ currentItems, users }) {
  const [lock, setLock] = useState(true);

  function handleLock(e) {
    setLock(!lock);
    console.log(e);
  }

  const userList = currentItems.map((user) => (
    <tr key={user.id}>
      <td className="td-user">{user.id}</td>
      <td className="td-user">{user.name}</td>
      <td className="td-user">{user.age}</td>
      <td className="td-user">{user.address}</td>
      <td className="td-user">{user.email}</td>
      <td className="td-user">
        <button className="btn btn-outline-primary">
          <FontAwesomeIcon className="customButton" icon={faPencil} />
        </button>
        <button className="btn btn-outline-danger nbsp">
          <FontAwesomeIcon className="customButton" icon={faTrash} />
        </button>
        <button className="btn btn-outline-warning nbsp" onClick={handleLock}>
          {lock ? (
            <FontAwesomeIcon className="customButton" icon={faLock} />
          ) : (
            <FontAwesomeIcon className="customButton" icon={faLockOpen} />
          )}
        </button>
      </td>
    </tr>
  ));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    console.log("show Modal");
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log("handleOk");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    console.log("handleCancel");
    setIsModalOpen(false);
  };

  const star = () => {
    return <span style={{ color: "red" }}>* </span>;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["#", "Name", "Age", "Address", "Email"]],
      body: users.map((user) => [
        user.id,
        user.name,
        user.age,
        user.address,
        user.email,
      ]),
    });
    // doc.setLanguage("vo")
    doc.save("user.pdf");
  };

  return (
    <>
      <div>
        <div>
          <h1 style={{ textAlign: "center" }}>Danh sách tài khoản</h1>
        </div>

        <div className="search">
          {/* Search */}
          <input
            className="rep-search"
            type="text"
            placeholder="Tìm thông tin"
          />
          <button
            className="btn btn-outline-primary height-btn"
            style={{ marginRight: "10px" }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="font-btn" />
          </button>

          <button
            onClick={showModal}
            className="btn btn-outline-primary height-btn"
            style={{ float: "right" }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button
            onClick={downloadPDF}
            className="btn custom-btn-outline-info font-btn"
            style={{ padding: 0 }}
          >
            <img
              src="https://www.iconpacks.net/icons/2/free-pdf-download-icon-2617-thumb.png"
              height={40}
              width={50}
              alt=""
            />
          </button>
        </div>

        {window.screen.width !== 425 ? (
          <div className="container-fluid">
            <Table
              striped
              bordered
              hover
              size="sm"
              style={{ marginTop: "auto", marginLeft: "auto" }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>#</th>
                  <th style={{ textAlign: "center" }}>Name</th>
                  <th style={{ textAlign: "center" }}>Age</th>
                  <th style={{ textAlign: "center" }}>Address</th>
                  <th style={{ textAlign: "center" }}>Email</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>{userList}</tbody>
            </Table>
          </div>
        ) : (
          <div>
            <Table
              striped
              bordered
              hover
              size="sm"
              style={{ marginTop: "auto", marginLeft: "auto" }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>#</th>
                  <th style={{ textAlign: "center" }}>Name</th>
                  <th style={{ textAlign: "center" }}>Age</th>
                  <th style={{ textAlign: "center" }}>Address</th>
                  <th style={{ textAlign: "center" }}>Email</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>{userList}</tbody>
            </Table>
          </div>
        )}
        <br />
      </div>
      <Modal
        title="Add new user"
        width={"800px"}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <Grid container>
          <Grid item xs={5.5}>
            <p>{star()}UserName</p>
            <input
              type={"text"}
              placeholder=" User"
              className="form-control"
            ></input>
            <p>{star()}Last Name</p>
            <input
              type={"text"}
              placeholder=" Last Name"
              className="form-control"
            ></input>

            <p>{star()}Role</p>
            <select name="" id="" typeof="button" className="form-control">
              <option value="" style={{ textAlign: "center" }}>
                ----------- Choose Role ----------
              </option>
              <option value="1">Admin</option>
              <option value="2">User</option>
            </select>
          </Grid>

          <Grid item xs={1}></Grid>

          <Grid item xs={5.5}>
            <p>{star()}Email</p>
            <input
              type={"text"}
              placeholder=" Email"
              className="form-control"
            ></input>
            <p>{star()}First name</p>
            <input
              type={"text"}
              placeholder=" First name"
              className="form-control"
            ></input>
            <p>{star()}Birthday</p>
            <input type={"date"} className="form-control"></input>
          </Grid>

          <Grid item xs={5}></Grid>

          <Grid item xs={1}>
            <Button
              style={{ marginTop: "20px" }}
              onClick={handleOk}
              type="primary"
            >
              OK
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button
              style={{
                marginTop: "20px",
                backgroundColor: "#E02525",
                color: "white",
              }}
              onClick={handleCancel}
            >
              CANCEL
            </Button>
          </Grid>
          <Grid item xs={5}></Grid>
        </Grid>
      </Modal>
    </>
  );
}

const Paginate = ({ itemsPerPage }) => {
  const users = [
    {
      id: 1,
      name: "Trường",
      age: 20,
      address: "Hàn Mặc Tử",
      email: "truong@gmail.com",
    },
    {
      id: 2,
      name: "Khoa",
      age: 22,
      address: "Thanh Thủy",
      email: "khoa@gmail.com",
    },
    {
      id: 3,
      name: "Thái",
      age: 19,
      address: "Phạm Ngọc Thạch",
      email: "thai@gmail.com",
    },
    {
      id: 4,
      name: "Tùng",
      age: 25,
      address: "Đống Đa",
      email: "tung@gmail.com",
    },
    {
      id: 5,
      name: "Đạt",
      age: 22,
      address: "Ông Ích Khiêm",
      email: "dat@gmail.com",
    },
  ];
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / itemsPerPage);
  // console.log(currentItems);
  const handlePageClick = (event, value) => {
    const newOffset = ((value - 1) * itemsPerPage) % users.length;
    console.log(event);
    console.log(value)
    setItemOffset(newOffset);
   
  };

  return (
    <>
      <div className="custom-bg-user center-bg" style={{backgroundColor: "#cfd3d7"}}>
        <TableUser currentItems={currentItems} users={users} />
        <Pagination
          style={{ marginLeft: "80%" }}
          count={pageCount}
          defaultPage={1}
          onChange={handlePageClick}
        />
        <br />
      </div>
    </>
  );
};
