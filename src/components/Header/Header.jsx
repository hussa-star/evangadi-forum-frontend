import React from "react";
import styles from "./header.module.css";
import Logo from "../../assets/HeaderLogo.png";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // Using useLocation hook to get current path
  const isLandingPage = location.pathname === "/"; // Check if it's the landing page

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to landing page
  };

  return (
    <header className={styles.header}>
      <Link to="/home">
        <img src={Logo} alt="logo" />
      </Link>

      <div className={styles.navbar}>
        <ul>
          <div className={styles.home}>
            <Link to={"/home"}>Home</Link>
          </div>
          <div>
            <Link to={"/HowItWorks"}>How it Works</Link>
          </div>

          <li className={styles.btn} onClick={logout}>
            {isLandingPage ? "Login" : "Logout"} {/* Dynamic button text */}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
