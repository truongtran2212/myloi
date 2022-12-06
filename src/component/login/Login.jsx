import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUnlockKeyhole,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Checkbox, Form, Input, notification } from "antd";

export default function Login() {
  const [messageError, setMessageError] = useState("");
  localStorage.setItem("username", "truong");
  localStorage.setItem("password", "123456");

  const onFinish = (values) => {
    if (
      values.username !== localStorage.getItem("username") ||
      values.password !== localStorage.getItem("password")
    ) {
      setMessageError("Tài khoản hoặc mật khẩu không chính xác");
      const form = document.querySelector("#login");
      form.reset();
    } else {
      setMessageError("");

      window.location.href = window.location.href + "homepage";
      
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        className="section"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2017/08/24/03/41/starry-sky-2675322_960_720.jpg')",
        }}
      >
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3" style={{ color: "white" }}>
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="myInput"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3" style={{ color: "white" }}>
                            Log In
                          </h4>
                          <Form
                            id="login"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <div className="form-group">
                              <Form.Item
                                name="username"
                                style={{ marginLeft: 50, width: 400 }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your username!",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>

                              <FontAwesomeIcon
                                className="input-icon"
                                icon={faUser}
                              />
                            </div>
                            <div className="form-group mt-2">
                              <Form.Item
                                style={{ marginLeft: 50, width: 400 }}
                                name="password"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your password!",
                                  },
                                ]}
                              >
                                <Input.Password />
                              </Form.Item>
                              <FontAwesomeIcon
                                className="input-icon"
                                icon={faUnlockKeyhole}
                              />
                              <text style={{ color: "red" }}>
                                {messageError}
                              </text>
                            </div>

                            <Button className="btn1 mt-4" htmlType="submit">
                              Submit
                            </Button>

                            <p className="mb-0 mt-4 text-center">
                              <a href="#0" className="link">
                                Forgot your password?
                              </a>
                            </p>
                          </Form>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3" style={{ color: "white" }}>
                            Sign Up
                          </h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="logname"
                              className="form-style"
                              placeholder="Your Full Name"
                              id="logname"
                              autoComplete="off"
                            />
                            <FontAwesomeIcon
                              className="input-icon"
                              style={{ marginTop: "10px" }}
                              icon={faUser}
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                            />
                            <FontAwesomeIcon
                              className="input-icon"
                              style={{ marginTop: "10px" }}
                              icon={faEnvelope}
                            />
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                            />
                            <FontAwesomeIcon
                              className="input-icon"
                              style={{ marginTop: "10px" }}
                              icon={faUnlockKeyhole}
                            />
                          </div>
                          <a href="/homepage" className="btn1 mt-4">
                            submit
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
