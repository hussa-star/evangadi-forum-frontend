import React, { useState } from "react";
import styles from "./header.module.css";
import Logo from "../../assets/HeaderLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <Link to="/home">
        <img src={Logo} alt="logo" />
      </Link>

      <div className={styles.menuIcon} onClick={toggleMenu}>
        {isMobileMenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
      </div>

      <div
        className={`${styles.navbar} ${
          isMobileMenuOpen ? styles.navActive : ""
        }`}
      >
        <ul>
          <div className={styles.home}>
            <Link to={"/home"} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </div>
          <div>
            <Link to={"/HowItWorks"} onClick={() => setIsMobileMenuOpen(false)}>
              How it Works
            </Link>
          </div>

          <li className={styles.btn} onClick={logout}>
            {isLandingPage ? "Login" : "Logout"}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
