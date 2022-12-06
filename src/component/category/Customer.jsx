import React, { useState, useEffect } from "react";
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
import "../css/Customer.css";
import { CSVLink } from "react-csv";
import { SmileOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  DatePicker,
  Select,
  Input,
  Popconfirm,
  message,
  notification,
} from "antd";
import jsPDF from "jspdf";
import axios from "axios";
import AddNewCustomer from "./AddNewCustomer";
import moment, { now } from "moment/moment";
import { useTranslation } from "react-i18next";

// Đã xong reponsive 2 màn hình 425 vs 768

const Customer = () => {
  const [customers, setCustomer] = useState([]);
  const [lock, setLock] = useState(true);
  const [elementPerPage, setElementPerPage] = useState(5);
  const [isModalUpdate, setModalUpdate] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalElement, setTotalElement] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [nameSearch, setNameSearch] = useState("")

  const getCustomerList = () => {
    axios
      .get(
        `http://localhost:8080/customer/list?limit=${elementPerPage}&page=${page}&name=${nameSearch}`
      )
      .then((res) => {
        setTotalPage(res.data.totalPages);
        setTotalElement(res.data.totalElements);
        const customer = res.data.content;
        setCustomer(customer);
        
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCustomerList();
  }, [elementPerPage]);

  useEffect(() => {
    // if(customers.length === 0) {
    //   <h1>Không có gì</h1>
    //   console.log(123);
    // }
    console.log(customers.length)
    getCustomerList(nameSearch);
  }, [nameSearch]);

  function handleLock(e) {
    setLock(!lock);
  }

  var index = 0;

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({});

  const showModalDetail = () => {
    setIsModalOpenDetail(true);
  };

  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
  };

  const onShowDetail = (customer) => {
    axios
      .get(`http://localhost:8080/customer/${customer.id}`)
      .then((res) => {
        setCustomerInfo(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ShowDetailCustomer = ({ customerInfo }) => {
    const [form] = Form.useForm();
    useEffect(() => {
      if (isModalOpenDetail) {
        form.setFieldsValue({
          name: customerInfo.name,
          age: customerInfo.age,
          gender: customerInfo.gender,
          address: customerInfo.address,
          phone_number: customerInfo.phoneNumber,
          create_date: customerInfo.createDate,
        });
      }
    }, [isModalOpenDetail]);

    return (
      <Modal
        title="DETAIL CUSTOMER"
        width={"800px"}
        open={isModalOpenDetail}
        footer={false}
        onCancel={handleCancelDetail}
        style={{ textAlign: "center" }}
      >
        <Form layout="vertical" form={form} className="container d-flex">
          <div item className="col">
            <Form.Item name="name" label=" Tên:" style={{ fontWeight: "bold" }}>
              <Input
                type={"text"}
                placeholder=" Tên"
                className="form-control"
                readOnly="true"
              />
            </Form.Item>
            <Form.Item name="age" label=" Tuổi:" style={{ fontWeight: "bold" }}>
              <Input
                type={"text"}
                placeholder=" Tuổi"
                className="form-control"
                style={{ marginTop: 19, margin: 0 }}
                readOnly="true"
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label=" Giới tính:"
              style={{ fontWeight: "bold" }}
            >
              <select className="form-control" disabled="true">
                <option value="">------- Chọn giới tính -------</option>
                <option value="0">Nữ</option>
                <option value="1">Nam</option>
              </select>
            </Form.Item>
          </div>

          <div className="col-1"></div>

          <div item className="col">
            <Form.Item
              name="address"
              label=" Địa chỉ:"
              style={{ fontWeight: "bold" }}
            >
              <Input
                type={"text"}
                placeholder=" Địa chỉ"
                className="form-control"
                readOnly="true"
              />
            </Form.Item>
            <Form.Item
              name="phone_number"
              label=" Số điện thoại:"
              style={{ fontWeight: "bold" }}
            >
              <Input
                type={"text"}
                placeholder=" Số điện thoại"
                className="form-control"
                readOnly="true"
              />
            </Form.Item>
            <Form.Item
              name="create_date"
              label=" Ngày tạo:"
              style={{ fontWeight: "bold" }}
            >
              <Input
                type={"date"}
                placeholder=" Số điện thoại"
                className="form-control"
                readOnly="true"
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    );
  };

  const [dataUpdate, setDataUpdate] = useState({});

  const showModalUpdate = (customer) => {
    axios
      .get(`http://localhost:8080/customer/${customer.id}`)
      .then((res) => {
        setDataUpdate(customer);
        setModalUpdate(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCustomer = (customer) => {
    axios
      .delete(`http://localhost:8080/customer/${customer.id}`)
      .then((res) => {
        getCustomerList();
        api.open({
          message: "Xóa khách hàng",
          description: `Bạn đã tiến hành xóa khách hàng ${customer.name} thành công`,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const customerList = 
    customers.map((customer) => (
      <tr
        key={customer.id}
        className="td-customer"
        style={{ cursor: "pointer" }}
      >
        <td
          style={{ textAlign: "center" }}
          onClick={() => [onShowDetail(customer), showModalDetail()]}
        >
          {(index += 1)}
        </td>
        <td
          style={{ textAlign: "center" }}
          onClick={() => [onShowDetail(customer), showModalDetail()]}
        >
          {customer.name}
        </td>
        <td
          style={{ textAlign: "center" }}
          onClick={() => [onShowDetail(customer), showModalDetail()]}
        >
          {customer.age}
        </td>
        <td
          style={{ textAlign: "center" }}
          onClick={() => [onShowDetail(customer), showModalDetail()]}
        >
          {customer.address}
        </td>
        <td
          style={{ textAlign: "center" }}
          onClick={() => [onShowDetail(customer), showModalDetail()]}
        >
          {customer.phoneNumber}
        </td>
        <td
          style={{ textAlign: "center" }}
          onClick={() => [onShowDetail(customer), showModalDetail()]}
        >
          {customer.gender === 0 ? "Nữ" : "Nam"}
        </td>
        <td
          style={{ textAlign: "center" }}
          onClick={() => [onShowDetail(customer), showModalDetail()]}
        >
          {moment(customer.createDate).format("DD-MM-YYYY")}
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            className="btn btn-outline-primary"
            onClick={() => showModalUpdate(customer)}
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <Popconfirm
            placement="top"
            title={"Bạn có muốn xóa khách hàng " + customer.name + " không ?"}
            onConfirm={() => deleteCustomer(customer)}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-outline-danger nbsp">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </Popconfirm>
          <button className="btn btn-outline-warning nbsp" onClick={handleLock}>
            {lock ? (
              <FontAwesomeIcon icon={faLock} />
            ) : (
              <FontAwesomeIcon icon={faLockOpen} />
            )}
          </button>
        </td>
      </tr>
    ));

  const handleChange = (e) => {
    // e đại diện cho value ở option
    setElementPerPage(e);
  };

  const cancleModalUpdate = () => {
    setModalUpdate(false);
  };

  const okModalUpdate = () => {
    setModalUpdate(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["#", "Name", "Age", "Address", "Phone number", "Gender"]],
      body: customers.map((customer) => [
        customer.id,
        customer.name,
        customer.age,
        customer.address,
        customer.phoneNumber,
        customer.gender,
      ]),
    });
    doc.save("customer.pdf");
  };

  const { t, i18n } = useTranslation();

  const search = (e) => {
    const he = e.target.value
    setNameSearch(he)
    console.log(he)
    
  }

  return (
    <>
      {contextHolder}
      <div className="custom-bg" style={{ backgroundColor: "#cfd3d7" }}>
        <div>
          <h1 style={{ textAlign: "center" }}>Danh sách khách hàng</h1>
        </div>

        <div className="search">
          {/* Search */}
          <input
            className="repSearch"
            type="text"
            placeholder="Tìm thông tin"
            onChange={search}
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
            className="btn custom-btn-outline-info font-btn"
            style={{ float: "right", margin: 0 }}
          >
            <CSVLink
              data={customers !== [] ? customers : []}
              filename={"customer"}
            >
              <img
                src="https://iconarchive.com/download/i77903/carlosjj/microsoft-office-2013/Excel.ico"
                width={29}
                alt=""
              />
            </CSVLink>
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

        <div className="container-fluid ">
          <Table
            striped
            bordered
            hover
            size="sm"
            style={{ marginTop: "auto", marginLeft: "auto" }}
            dataSource={customers}
          >
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>#</th>
                <th style={{ textAlign: "center" }}>Tên</th>
                <th style={{ textAlign: "center" }}>Tuổi</th>
                <th style={{ textAlign: "center" }}>Địa Chỉ</th>
                <th style={{ textAlign: "center" }}>Số điện thoại</th>
                <th style={{ textAlign: "center" }}>Giới tính</th>
                <th style={{ textAlign: "center" }}>Ngày tạo</th>
                <th style={{ textAlign: "center" }}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {/* <PaginatedItems itemsPerPage={elementPerPage} /> */}
              {customerList}
            </tbody>
          </Table>
          <div className="d-flex">
            <Select
              defaultValue={elementPerPage}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                {
                  value: 1,
                  label: 1,
                },
                {
                  value: 5,
                  label: 5,
                },
                {
                  value: 10,
                  label: 10,
                },
                {
                  value: 15,
                  label: 15,
                },
              ]}
            />
          </div>
        </div>
        <br />
      </div>

      <AddNewCustomer
        checkAddnew={isModalOpen}
        handleCancel={() => handleCancel}
        handleOk={() => handleOk()}
        getListCustomer={() => getCustomerList()}
      />

      <ShowDetailCustomer customerInfo={customerInfo} />
      <ModalUpdate
        open={isModalUpdate}
        dataUpdate={dataUpdate}
        onCancel={cancleModalUpdate}
        onOk={() => okModalUpdate()}
        getListCustomer={() => getCustomerList()}
      />
    </>
  );
};

const ModalUpdate = ({
  open,
  data,
  onCancel,
  onOk,
  dataUpdate,
  getListCustomer,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    if (open) {
      form.setFieldsValue({
        name: dataUpdate.name,
        age: dataUpdate.age,
        gender: dataUpdate.gender,
        address: dataUpdate.address,
        phone_number: dataUpdate.phoneNumber,
        create_date: moment(dataUpdate.createDate).format("YYYY-MM-DD"),
      });
    }
  }, [open]);

  const onFinish = (values) => {
    const customer = {
      name: values.name,
      age: values.age,
      gender: values.gender,
      address: values.address,
      phoneNumber: values.phone_number,
      createDate: values.create_date,
      statusDelete: 0,
      id: dataUpdate.id,
    };

    axios
      .put(`http://localhost:8080/customer/${dataUpdate.id}`, customer)
      .then((res) => {
        console.log(res);
        getListCustomer();
        onOk();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const disabledDate = (current) => {
    console.log(moment().startOf("day"));
    return current && current > moment().endOf("day");
  };

  const validateMessages = {
    required: "${label} không được để trống",
    number: {
      range: "'${name}' must be between ${min} and ${max}",
      min: "'${name}' must be between ${min}",
    },
  };
  return (
    <>
      <Modal
        footer={false}
        open={open}
        width={"800px"}
        onCancel={onCancel}
        title="UPDATE CUSTOMER"
        style={{ textAlign: "center" }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) => onFinish(values)}
          onFinishFailed={onFinishFailed}
          className="container"
          validateMessages={validateMessages}
        >
          <div className="container d-flex">
            <div className="col">
              <Form.Item
                name="name"
                label=" Tên:"
                rules={[{ required: true }]}
                style={{ fontWeight: "bold" }}
              >
                <Input
                  type={"text"}
                  pattern="^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$"
                  placeholder=" Tên"
                  className="form-control"
                  onBlur={(e) => {
                    form.setFieldsValue({ name: e.target.value.trim() });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="age"
                label=" Tuổi:"
                rules={[{ required: true }]}
                style={{ fontWeight: "bold" }}
              >
                <Input
                  type={"text"}
                  placeholder=" Tuổi"
                  className="form-control"
                />
              </Form.Item>

              <Form.Item
                name="gender"
                label=" Giới tính:"
                rules={[{ required: true }]}
                style={{ fontWeight: "bold" }}
              >
                <select className="form-control">
                  <option value="">------- Chọn giới tính -------</option>
                  <option value="0">Nữ</option>
                  <option value="1">Nam</option>
                </select>
              </Form.Item>
            </div>
            <div className="col-1"></div>

            <div className="col">
              <Form.Item
                name="address"
                label=" Địa chỉ:"
                rules={[{ required: true }]}
                style={{ fontWeight: "bold" }}
              >
                <Input
                  type={"text"}
                  placeholder=" Địa chỉ"
                  className="form-control"
                  onBlur={(e) => {
                    form.setFieldsValue({ address: e.target.value.trim() });
                  }}
                />
              </Form.Item>

              <Form.Item
                name="phone_number"
                label=" Số điện thoại:"
                rules={[{ required: true }]}
                style={{ fontWeight: "bold" }}
              >
                <Input
                  type={"text"}
                  placeholder=" Số điện thoại"
                  className="form-control"
                  onBlur={(e) => {
                    form.setFieldsValue({
                      phone_number: e.target.value.trim(),
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                name="create_date"
                label=" Ngày tạo:"
                rules={[{ required: true }]}
                style={{ fontWeight: "bold" }}
              >
                <Input
                  type="date"
                  placeholder="Ngày tạo"
                  className="form-control"
                />
              </Form.Item>
            </div>
          </div>

          <div className="d-flex" style={{ justifyContent: "center" }}>
            <Form.Item>
              <Button
                style={{
                  width: 82,
                  backgroundColor: "#3474EB",
                  color: "white",
                }}
                // Phải sử dụng htmlType
                htmlType="submit"
              >
                UPDATE
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{
                  backgroundColor: "#E02525",
                  color: "white",
                  marginLeft: 20,
                }}
                onClick={onCancel}
              >
                CANCEL
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Customer;
