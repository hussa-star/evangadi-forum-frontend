import React from "react";
import styles from "./about.module.css";
function About() {
  return (
    <section>
      <section className={styles.evangadi_questiona_answer}>
        <span>About</span>
        <div className={styles.question_paragraph}>
          <h1>Evangadi Networks Q&A</h1>
          <p>
            No matter what stage of life you are in whether you're just starting
            elementary school or being promoted to CEO of a Fortune 500 company,
            you have much to offer to those who are trying to follow in your
            footsteps.
          </p>
          <p>
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
        </div>
        <div className={styles.how_it_works}>
          <button>HOW IT WORKS</button>
        </div>
      </section>
    </section>
  );
}

export default About;
