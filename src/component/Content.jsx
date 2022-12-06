import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Homepage from "./home_page/Homepage";
import Customer from "./category/Customer";
import Product from "./category/Product";
import DiscountProduct from "./category/DiscountProduct";
import DiscountPrice from "./category/DiscountPrice";
import ReportCustomer from "./report_statistic/ReportCustomer";
import ReportEmployee from "./report_statistic/ReportEmployee";
import ReportMarket from "./report_statistic/ReportMarket";
import ReportProduct from "./report_statistic/ReportProduct";
import User from "./system/User";
import Notification from "./system/Notification";
import Sidebar from "./menu/Sidebar";
import "../component/css/Sidebar.css"


const Content = () => {
  
    return (
    <>
      <div >
        <div className="custom-sidebar">
          <Sidebar />
        </div>
          <Routes>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/product" element={<Product />} />
            <Route path="/discountProduct" element={<DiscountProduct />} />
            <Route path="/discountPrice" element={<DiscountPrice />} />
            <Route path="/reportCustomer" element={<ReportCustomer />} />
            <Route path="/reportEmployee" element={<ReportEmployee />} />
            <Route path="/reportProduct" element={<ReportProduct />} />
            <Route path="/reportMarket" element={<ReportMarket />} />
            <Route path="/user" element={<User itemPerPage={2}/>} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
      </div>
    </>
  );
};

export default Content;
