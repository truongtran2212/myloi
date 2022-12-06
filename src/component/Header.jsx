import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "antd";

// Đã reponsive xong với 2 màn hình là 768 và 425
export default function Header() {
  const testTooltip = <span style={{ fontSize: "20px" }}>{localStorage.getItem("username") !== "" ? "Đăng xuất" : "Đăng nhập"}</span>;
  return (
    // Cách lấy được width của màn hình
    console.log(window.screen.width),
    (
      <>
          <header
            className="header-img"
            style={{ display: "flex", backgroundColor: "#4DD6CD"}}
          >
            <div className="col-2">
              {/* verticalLine */}
              <a href="/homepage" 
              target="blank">
                <img
                  className="marginImage"
                  src="https://logos-world.net/wp-content/uploads/2022/01/TXT-Logo.png"
                  alt="Logo"
                  
                />
              </a>
            </div>
            <div className="col-8" style={{ position: "relative" }}>
              <h3 className="title">HỆ THỐNG QUẢN LÝ ĐƠN HÀNG</h3>
            </div>
            <div className="col-md-2" style={{ position: "relative" }}>
              <a href="/">
                <Tooltip placement="bottomRight" title={testTooltip}>
                  <button className="btn btn-outline-primary login">
                    <FontAwesomeIcon
                      icon={window.screen.width !== 425 ? faUser : ""}
                    />
                    {localStorage.getItem("username") !== "" ? "Đăng xuất" : "Đăng nhập"}
                    
                  </button>
                </Tooltip>
              </a>
            </div>
          </header>
      </>
    )
  );
}
