import React, { useEffect } from "react";
import "./css/Footer.css";

export default function Footer() {
  return (
    console.log(window.scrollY + " Y"),
    (
      <>
        {window.screen.availHeight > 864 ? (
          <footer className="footer3" style={{ backgroundColor: "#4DD6CD" }}>
            <div>
              <h5
                style={{
                  color: "black",
                  textAlign: "center",
                  height: "50px",
                  marginTop: "10px",
                }}
              >
                Copyright © 2020 HeThongDatHang. All rights reserved
              </h5>
            </div>
          </footer>
        ) : (
          <footer className="footer" style={{ backgroundColor: "#4DD6CD" }}>
            <div>
              <p
                style={{
                  color: "black",
                  textAlign: "center",
                  height: "50px",
                }}
              >
                Copyright © 2020 HeThongDatHang. All rights reserved
              </p>
            </div>
          </footer>
        )}
      </>
    )
  );
}
