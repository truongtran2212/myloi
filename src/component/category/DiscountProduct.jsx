import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "../css/Product.css";
import { CSVLink } from "react-csv";
export default function DiscountProduct() {
  const [products, setProduct] = useState([
    {
      id: 1,
      nameProduct: "Coca-Cola",
      company: "Coca-cola",
      image:
        "https://khothietke.net/wp-content/uploads/2021/04/PNGKhothietke.net-02372.png",
      price: "10000",
    },
    {
      id: 2,
      nameProduct: "7-UP",
      company: "Dr Pepper Snapple Group",
      image: "https://www.pngmart.com/files/21/7up-PNG-Image.png",
      price: "10000",
    },
    {
      id: 3,
      nameProduct: "Nutriboost",
      company: "Coca-cola",
      image:
        "https://en.cocacolavietnam.com/content/dam/journey/vn/en/brands/nutriboost/vietnam-nutriboost-strawberry-image-2.png",
      price: "10000",
    },
    {
      id: 4,
      nameProduct: "Sting dâu",
      company: "Suntory PepsiCo",
      image:
        "http://iwater.vn/Image/Picture/Nuoc_ngot/sting%20chai%20330ml.png",
      price: "7000",
    },
    {
      id: 5,
      nameProduct: "Sting dâu",
      company: "Suntory PepsiCo",
      image:
        "http://iwater.vn/Image/Picture/Nuoc_ngot/sting%20chai%20330ml.png",
      price: "7000",
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [validate, setValidate] = useState("");
  const handleEnter = (e) => {
    const limit = 2;
    console.log(e);
    if (
      e.key === "Enter" &&
      (document.getElementById("test").value.length == 2 ||
        document.getElementById("test").value.length == 1)
    ) {
      setDiscount(e.target.value);
      document.getElementById("test").value = "";
      setValidate("");
    }
    if (document.getElementById("test").value.length > 2) {
      setValidate("Chỉ được nhập 2 chữ số");
      document.getElementById("test").value = "";
    }
    console.log(document.getElementById("test").value.length);
  };

  const productList = products.map((product) => (
    <tr key={product.id}>
      <td style={{ verticalAlign: "middle" }}>{product.id}</td>
      <td style={{ verticalAlign: "middle" }}>{product.nameProduct}</td>
      <td style={{ verticalAlign: "middle" }}>{product.company}</td>
      <td style={{ verticalAlign: "middle" }}>
        <img src={product.image} alt="" height={60} width={50} />
      </td>
      <td style={{ verticalAlign: "middle" }}>{product.price}</td>

      <td style={{ verticalAlign: "middle" }}>{discount}%</td>
      <td style={{ verticalAlign: "middle" }}>
        {product.price - (product.price * discount) / 100}
      </td>
    </tr>
  ));

  return (
    <>
      <div className="custom-bg">
        <div>
          <h1 style={{ textAlign: "center" }}>Danh sách sản phẩm giảm giá</h1>
        </div>
        <div style={{float: "right"}}>
          <div className="d-flex container-fluid">
            <input
              style={{ width: "200px" }}
              type="number"
              id="test"
              onKeyDown={handleEnter}
              placeholder={"Input Discount (%)"}
            />
            <button className="btn btn-outline-info">
              <CSVLink data={products} filename={"product"}>
                Export
              </CSVLink>
            </button>
          </div>
          <span style={{ color: "red", marginLeft: "23px" }}>{validate}</span>
        </div>
        <br />
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
                <th style={{ textAlign: "center" }}>Name Product</th>
                <th style={{ textAlign: "center" }}>Company</th>
                <th style={{ textAlign: "center" }}>Image</th>
                <th style={{ textAlign: "center" }}>Price</th>
                <th style={{ textAlign: "center" }}>Discount</th>
                <th style={{ textAlign: "center" }}>After Discount</th>
              </tr>
            </thead>
            <tbody>{productList}</tbody>
          </Table>
        </div>
        <br />
      </div>
    </>
  );
}
