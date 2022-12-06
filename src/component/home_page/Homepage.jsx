import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faMagnifyingGlass,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import "../css/Homepage.css"
// Đã reponsive xong 2 màn hình 768 vs 425
export default function Homepage(notification) {
  return (
    <>
      <div className="container-fluid">
        {/* Mới tạo */}
        {window.screen.width !== 768 && window.screen.width !== 425 ? (
          <div>
            <div style={{ display: "flex" }}>
              <div className="col-4" style={{ display: "flex" }}>
                <div className="col-4">
                  <button className="btn btn-warning form-control">
                    Mới Tạo
                  </button>
                </div>
                <div className="col-4">
                  <button className="btn btn-danger form-control">
                    Đã Duyệt
                  </button>
                </div>
                <div className="col-4">
                  <button className="btn btn-success form-control">
                    Không Duyệt
                  </button>
                </div>
              </div>
              <div className="col-4">
                &nbsp; &nbsp;
                <button className="btn btn-info">Tạo đơn hàng</button>
                <button className="btn btn-info" style={{ marginLeft: "10px" }}>
                  In toa đơn hàng
                </button>
                <button className="btn btn-info" style={{ marginLeft: "10px" }}>
                  <FontAwesomeIcon icon={faFilter} />
                </button>
              </div>
              <div className="col-4">3</div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className="col-12" style={{ display: "flex" }}>
                <div className="col-4">
                  <button className="btn btn-warning form-control">
                    Mới Tạo
                  </button>
                </div>
                <div className="col-4">
                  <button className="btn btn-danger form-control">
                    Đã Duyệt
                  </button>
                </div>
                <div className="col-4">
                  <button className="btn btn-success form-control">
                    Không Duyệt
                  </button>
                </div>
              </div>
              <br></br>

              {/* Tạo đơn hàng */}
              {/* <div className="col-12 d-flex">
                <div className="col-3">
                  <button className="btn btn-info">Tạo đơn hàng</button>
                </div>

                <div className="col-3">
                  <button
                    className="btn btn-info"
   
                  >
                    In toa đơn hàng
                  </button>
                </div>
                <div className="col-3">
                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "10px" }}
                  >
                    <FontAwesomeIcon icon={faFilter} />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        )}

        <div className="custom-bg-homepage">
          {/* Search */}
          <div className="search" style={{marginRight: 2}}>
            <input
              style={
                window.screen.width === 425
                  ? { width: "260px", marginRight: "10px", height: "38px" }
                  : { width: "350px", marginRight: "10px", height: "38px" }
              }
              type="text"
              placeholder="Tìm thông tin"
            />
            <button
              className="btn btn-outline-primary"
              style={{ height: "39px", marginBottom: "7px" }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            <Dropdown style={{ marginLeft: "8px"}}>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                <FontAwesomeIcon icon={faGears} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <li>
                  <input type="checkbox" /> Mã đơn hàng
                </li>
                <li>
                  <input type="checkbox" /> Chợ
                </li>
                <li>
                  <input type="checkbox" /> Khách hàng
                </li>
                <li>
                  <input type="checkbox" /> Tổng tiền
                </li>
                <li>
                  <input type="checkbox" /> Nhân viên
                </li>
                <li>
                  <input type="checkbox" /> Trạng thái
                </li>
                <li>
                  <input type="checkbox" /> In toa
                </li>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Table */}
          <div>
            <table className="table">
              <thead>
                <tr style={{ backgroundColor: "gray" }}>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>

                <tr>
                  <th scope="row">4</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>

                <tr>
                  <th scope="row">5</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
