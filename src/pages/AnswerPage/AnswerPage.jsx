// AnswerPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import styles from "./AnswerPage.module.css";
import Layout from "../../components/Layout/Layout";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function AnswerPage() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const [userVotes, setUserVotes] = useState({});

  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [questionid]);

  async function fetchQuestionAndAnswers() {
    try {
      const questionResponse = await axios.get(`/question/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestion(questionResponse.data.question);

      const answersResponse = await axios.get(`/answer/${questionid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sortedAnswers = answersResponse.data.answer.sort(
        (a, b) => b.votes - a.votes
      );
      setAnswers(sortedAnswers);

      const userVotesResponse = await axios.get(
        `/answer/userVotes/${questionid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserVotes(userVotesResponse.data.votes);
    } catch (error) {
      if (error.response) {
        setError(error?.response?.data?.message);
      }
    }
  }

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (newAnswer.trim() === "") {
      setError("Please fill in the answer field.");
      return;
    }

    try {
      await axios.post(
        "/answer",
        { questionid: questionid, answer: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAnswer("");
      setError("");
      fetchQuestionAndAnswers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit answer.");
    }
  };

  async function handleVote(answerId, type) {
    try {
      await axios.post(
        "/answer/vote",
        { answerId, voteType: type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQuestionAndAnswers();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      } else {
        console.error("Error voting:", error);
      }
    }
  }

  return (
    <Layout>
      <div className={styles.answerPageContainer}>
        <div className={styles.questionSection}>
          <h1>QUESTION</h1>
          <h2 className={styles.question_title}>{question?.title}</h2>
          <p>{question?.content}</p>
        </div>

       <div className={styles.answersSection}>
  <h3>Answer From The Community</h3>
  <hr />
  {answers.length > 0 ? (
    answers.map((answer) => (
      <article
        key={answer.answerid}
        className={styles.question_avatar_title}
      >
        <div className={styles.avator_container}>
          <IoPersonCircleOutline size={50} />
          <small>{answer?.user_name}</small>
        </div>
        <div className={styles.title_container}>
          <p>{answer?.content}</p>
          <div className={styles.voteContainer}>
            <button
              onClick={() => handleVote(answer.answerid, "up")}
              disabled={userVotes[answer.answerid] === "up"}
              className={
                userVotes[answer.answerid] === "up"
                  ? styles["voted-up"]
                  : ""
              }
            >
              <div className={styles["vote-icon-container"]}>
                <FaThumbsUp size={20} />
              </div>
            </button>
            <span>{answer.votes}</span>
            <button
              onClick={() => handleVote(answer.answerid, "down")}
              disabled={userVotes[answer.answerid] === "down"}
              className={
                userVotes[answer.answerid] === "down"
                  ? styles["voted-down"]
                  : ""
              }
            >
              <div className={styles["vote-icon-container"]}>
                <FaThumbsDown size={20} />
              </div>
            </button>
          </div>
        </div>
      </article>
    ))
  ) : (
    <span>
      <p style={{ color: "red" }}>{error}</p>
      <p>No answers yet. Be the first to answer!</p>
    </span>
  )}
</div>


        <form onSubmit={handleSubmitAnswer} className={styles.answerForm}>
          <h3>Post Answer</h3>
          {error === "Please fill in the answer field." && (
            <div className={styles.formError}>{error}</div>
          )}
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Your answer..."
            className={styles.answerInput}
          />

          <button type="submit" className={styles.answerButton}>
            Post Answer
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default AnswerPage;
