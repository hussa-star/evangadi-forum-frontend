import React, { useState } from "react";
import { useRef } from "react";
import Instance from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { ClipLoader } from "react-spinners";

function Login({ setShowLogin }) {
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const [showPass, setShowPass] = useState(true);
  const [textpass, setTextPass] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
    setLoading(true);
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (!emailValue || !passwordValue) {
      alert("please provide all required information");
      setLoading(false);
      return;
    }

    try {
      const { data } = await Instance.post("/user/login", {
        email: emailValue,
        password: passwordValue,
      });
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      setError(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className={styles.input_container}>
      <section className={styles.input_form}>
        <h2>Join the network</h2>
        <p
          className={styles.create_account}
          onClick={() => setShowLogin(false)}
        >
          Don't have an account?
          <span className={styles.sign_in}> Create a new account</span>
        </p>
        <span style={{ color: "red", fontSize: "18px", marginLeft: "10px" }}>
          {error}
        </span>
        <form action="" onSubmit={handlesubmit}>
          <div className={styles.email_container}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={emailDom}
              autocomplete="email"
              required
            />
          </div>
          <br />
          <div className={styles.password_container}>
            <input type={textpass} placeholder="password" ref={passwordDom} />
            <span onClick={passToggler}>
              {showPass ? <FaRegEyeSlash /> : <GoEye color="ff8000" />}
            </span>
          </div>
          <button type="submit" className={styles.login}>
            {loading ? <ClipLoader color="white" size={20} /> : "Login"}
          </button>
        </form>
      </section>
    </section>
  );
}

export default Login;
