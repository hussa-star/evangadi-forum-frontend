import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { BsYoutube } from "react-icons/bs";
import styles from "./footer.module.css";
import logo from "../../assets/evangadi-logo-footer.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className={styles.outer_container}>
        <div className={styles.logo} size={1}>
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>

          <div className={styles.social}>
            <FaFacebook size={27} />
            <IoLogoInstagram size={27} />
            <BsYoutube size={27} />
          </div>
        </div>

        <div className={styles.links}>
          <ul>
            <li>
              <h3>Useful Link</h3>
            </li>
            <li>
              <a href="#">How it works</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className={styles.links}>
          <ul>
            <li>
              <h3>Contact Info</h3>
            </li>
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
