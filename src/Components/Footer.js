import React, { useState } from "react";
import "./Footer.css";
import { MdEmail } from "react-icons/md";
import {
  AiFillTwitterSquare,
  AiFillLinkedin,
  AiFillGithub,
  AiFillPhone,
} from "react-icons/ai";
import dataScienceLogo from "./images/dataScienceLogo.png";

const Footer = () => {
  const [logoHeight, setLogoHeight] = useState(window.innerHeight / 14);
  const [logoWidth, setLogoWidth] = useState(window.innerWidth / 4);
  window.onresize = function () {
    var widthWin = window.innerWidth;
    var heightWin = window.innerHeight;
    setLogoHeight(heightWin / 14);
    setLogoWidth(widthWin / 4);
  };
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="list-unstyled">
              <li>
                Questions? Contact Heman Shakeri, Assistant Professor, School of
                Data Science | University of Virginia
              </li>
              <li>
                <MdEmail size={20} />
                <a
                  style={{ margin: 10, color: "grey" }}
                  href={"mailto:" + "hs9hd@virginia.edu"}
                >
                  Email
                </a>
              </li>
              <li>
                <AiFillTwitterSquare size={20} />
                <a
                  target="_blank"
                  style={{ margin: 10, color: "grey" }}
                  href={"https://twitter.com/HemanShakeri"}
                >
                  Twitter
                </a>
              </li>
              <li>
                <AiFillLinkedin size={20} />
                <a
                  target="_blank"
                  style={{ margin: 10, color: "grey" }}
                  href={"https://www.linkedin.com/in/heman-shakeri-61ba603a/"}
                >
                  LinkedIn
                </a>
              </li>
              <li style={{ marginTop: 30 }}>Site built by Noah Beamon</li>
              <li>
                <AiFillLinkedin size={20} />
                <a
                  target="_blank"
                  style={{ margin: 10, color: "grey" }}
                  href={"https://www.linkedin.com/in/noahbeamon/"}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="col">
            <ul className="list-unstyled">
              <li>School of Data Science</li>
              <li>P.O. Box 400249</li>
              <li>Charlottesville, VA 22904 USA</li>
              <li>
                <a
                  target="_blank"
                  style={{ color: "grey" }}
                  href={
                    "https://www.google.com/maps/place/Dell+1,+Charlottesville,+VA+22903/@38.0344626,-78.5108793,17z"
                  }
                >
                  View on Map
                </a>
              </li>
              <li>
                <MdEmail size={20} />
                <a
                  style={{ margin: 10, color: "grey" }}
                  href={"mailto:" + "datascience@virginia.edu"}
                >
                  Email
                </a>
              </li>
              <li>
                <AiFillPhone size={20} style={{ marginRight: 10 }} />
                (434) 982-2600
              </li>
            </ul>
          </div>
          <div className="col">
            <ul className="list-unstyled">
              <li>
                <img
                  style={{ width: logoWidth, height: logoHeight }}
                  src={dataScienceLogo}
                />
              </li>
            </ul>
          </div>
        </div>
        <hr style={{ backgroundColor: "white" }} />
        <div className="row">
          <p style={{ color: "grey" }} className="col-sm">
            &copy; {new Date().getFullYear()} Shakeri Research Group
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
