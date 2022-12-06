import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import moment, { now } from "moment/moment";

function AddNewCustomer({
  checkAddnew,
  handleCancel,
  handleOk,
  getListCustomer,
}) {
  const [form] = Form.useForm();

  const addNewCustomer = (values) => {
    const customer = {
      name: values.name,
      age: values.age,
      gender: values.gender,
      address: values.address,
      phoneNumber: values.phone_number,
      createDate: moment(values.create_date).format("YYYY-MM-DD"),
    };
    axios
      .post(`http://localhost:8080/customer/create`, customer)
      .then((res) => {
        form.resetFields();
        getListCustomer();
        handleOk();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validateMessages = {
    required: "${label} không được để trống",
    number: {
      range: "'${name}' must be between ${min} and ${max}",
      min: "'${name}' must be between ${min}",
    },
  };

  const cancel = () => {
    handleOk();
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const disabledDate = (current) => {
    console.log(moment().startOf("day"));
    return current && current > moment().endOf("day");
  };

  return (
    <div>
      <Modal
        title="ADD NEW CUSTOMER"
        width={"800px"}
        open={checkAddnew}
        footer={false}
        onCancel={cancel}
        style={{ textAlign: "center" }}
      >
        <Form
          layout="vertical"
          form={form}
          className="container"
          onFinishFailed={onFinishFailed}
          onFinish={(values) => addNewCustomer(values)}
          validateMessages={validateMessages}
        >
          <div className="d-flex container">
            <div item className="col">
              <Form.Item
                name="name"
                rules={[{ required: true }]}
                label=" Tên:"
                style={{ fontWeight: "bold" }}
              >
                <Input
                  pattern="^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$"
                  type={"text"}
                  placeholder=" Tên"
                  className="form-control"
                  onBlur={(e) => {
                    form.setFieldsValue({ name: e.target.value.trim() });
                  }}
                />
              </Form.Item>

              <Form.Item
                name="age"
                rules={[{ required: true }]}
                label=" Tuổi:"
                style={{ fontWeight: "bold" }}
              >
                <Input
                  type={"number"}
                  placeholder=" Tuổi"
                  className="form-control"
                  min={18}
                  max={55}
                />
              </Form.Item>

              <Form.Item
                name="gender"
                rules={[{ required: true }]}
                label=" Giới tính:"
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

            <div item className="col">
              <Form.Item
                rules={[{ required: true }]}
                label=" Địa chỉ:"
                style={{ fontWeight: "bold" }}
                name="address"
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
                rules={[{ required: true }]}
                label=" Số điện thoại:"
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
                rules={[{ required: true }]}
                label=" Ngày tạo:"
                style={{ fontWeight: "bold" }}
              >
                <DatePicker
                  placeholder=" Ngày tạo"
                  className="form-control"
                  disabledDate={disabledDate}
                />
              </Form.Item>
            </div>
          </div>
          <div
            className="form-group d-flex"
            style={{ justifyContent: "center" }}
          >
            <Form.Item>
              <button
                // onClick={addNewCustomer}
                style={{
                  width: 82,
                  backgroundColor: "#3474EB",
                  color: "white",
                }}
                htmlType="submit"
              >
                OK
              </button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{
                  backgroundColor: "#E02525",
                  color: "white",
                  marginLeft: 20,
                }}
                onClick={cancel}
              >
                CANCEL
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AddNewCustomer;
