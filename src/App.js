import Header from "./component/Header";
import Footer from "./component/Footer";
import Content from "./component/Content";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Login from "./component/login/Login";

// Dùng để thực hiện lazy load nhưng màn hình này chưa thực hiện được
// Sẽ thử thực hiện với màn hình khác
// const Login = React.lazy(() => import("./component/login/Login"));
function App() {
  return (
    <>
      {window.location.href.endsWith("/") ? (
        // <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Routes>
              {/* <Route path="/" element={Login} /> */}
              <Route path="/" element={<Login />} />
            </Routes>
          </Router>
        // </Suspense>
      ) : (
        <Router>
          <Header />
          <Content />
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
