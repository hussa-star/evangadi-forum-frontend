import React, { useState } from "react";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import styles from "./landing.module.css";
import homeBg from "./../../assets/home-backgraund.png";
import Layout from "../../components/Layout/Layout";
import About from "../../components/About/About";
// import { useSpring, animated } from 'react-spring';
function Landing() {
  const [showLogin, setShowLogin] = useState(true);
  const [slideDirection, setSlideDirection] = useState("");
   const handleSwitch = () => {
     setSlideDirection(showLogin ? styles.slideOutLeft : styles.slideOutRight);
     setTimeout(() => {
       setShowLogin((prev) => !prev);
       setSlideDirection(showLogin ? styles.slideInRight : styles.slideInLeft);
     }, 20);
   };
  return (
    <Layout>
      <section
        className={styles.landing_container}
        style={{
          backgroundImage: `url(${homeBg})`,
        }}
      >
        <div className={`${styles.formWrapper} ${slideDirection}`}>
          {showLogin ? (
            <Login setShowLogin={handleSwitch} />
          ) : (
            <Register setShowLogin={handleSwitch} />
          )}
        </div>
        <div className={styles.landing_about_container}>
          <About />
        </div>
      </section>
    </Layout>
  );
}

export default Landing;
