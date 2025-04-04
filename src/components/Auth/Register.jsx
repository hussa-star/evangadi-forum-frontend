import React, { use, useRef, useState } from "react";
import Instance from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import styles from "./auth.module.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { GoEye } from "react-icons/go";
function Register({ setShowLogin }) {
  const userNameDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(true);
  const [textpass, setTextPass] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");

  function passToggler() {
    setShowPass(!showPass);
    if (passwordDom.current.type === "password") {
      setTextPass("text");
    } else {
      setTextPass("password");
    }
  }
  async function handlesubmit(e) {
    e.preventDefault();

    setErrorMessage("");
    const userNameValue = userNameDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !userNameValue ||
      !firstNameValue ||
      !lastNameValue ||
      !emailValue ||
      !passwordValue
    ) {
      setErrorMessage("please provide all required information");
      return;
    }
    if (passwordValue.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }
    try {
      const response = await Instance.post("/user/register", {
        username: userNameValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        password: passwordValue,
      });
      setShowLogin(true);
    } catch (error) {
      setErrorMessage(error.response.data.msg);
    }
  }

  return (
    <section
      className={`${styles.input_container} ${styles.rigister_container}`}
    >
      <section className={styles.input_form}>
        <h2>Join the network</h2>
        <p className={styles.create_account}>
          Already have an account?
          <span className={styles.sign_in} onClick={() => setShowLogin(true)}>
            {" "}
            Sign in
          </span>
        </p>
        <span style={{ color: "red", fontSize: "18px", marginLeft: "10px" }}>
          {errorMessage}{" "}
        </span>
        <form action="" onSubmit={handlesubmit}>
          <div>
            <input ref={userNameDom} type="text" placeholder="username" />
          </div>
          <div className={styles.names}>
            <input type="text" placeholder="first name" ref={firstNameDom} />
            <input type="text" placeholder="last name" ref={lastNameDom} />
          </div>

          <div>
            <input
              type="email"
              placeholder="email"
              ref={emailDom}
              name="email"
              autoComplete="email"
            />
          </div>

          <div className={styles.password_container}>
            <input type={textpass} placeholder="password" ref={passwordDom} />
            <span onClick={passToggler}>
              {showPass ? <FaRegEyeSlash /> : <GoEye color="ff8000" />}
            </span>
          </div>
          <div className={styles.bottom_form}>
            <div className={styles.register_bottom_center}>
              <p className={` ${styles.center}`}>
                <span>
                  I agree to the{" "}
                  <Link className={styles.sign_in} to={"/about"}>
                    Privacy Policy
                  </Link>{" "}
                  and
                  <Link className={styles.sign_in} to={"/about"}>
                    &nbsp; terms of service
                  </Link>
                  <Link className={styles.sign_in} to={"/about"}>
                    &nbsp; terms of service
                  </Link>{" "}
                </span>
              </p>
              <button
                className={`${styles.login} ${styles.register_btn}`}
                type="submit"
              >
                Agree and Join
              </button>{" "}
              <Link className={`${styles.sign_in} ${styles.center}`}>
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
}

export default Register;
