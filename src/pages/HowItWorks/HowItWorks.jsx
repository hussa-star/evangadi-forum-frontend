import React from "react";
import styles from "./HowItWorks.module.css"; // Create this CSS module file
import Layout from "../../components/Layout/Layout";

const HowItWorks = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>How Evangadi Networks Works</h1>

          <section className={styles.section}>
            <h2>1. Join the Network</h2>
            <p>Create an account to become part of our community.</p>
          </section>

          <section className={styles.section}>
            <h2>2. Share Your Knowledge</h2>
            <p>Offer your expertise and insights to help others.</p>
          </section>

          <section className={styles.section}>
            <h2>3. Find Mentors</h2>
            <p>Connect with experienced individuals who can guide you.</p>
          </section>

          <section className={styles.section}>
            <h2>4. Learn and Grow</h2>
            <p>Benefit from the collective wisdom of the community.</p>
          </section>

          <p>
            Whether you're starting your journey or looking to advance your
            career, Evangadi Networks provides a platform for meaningful
            connections and growth.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
