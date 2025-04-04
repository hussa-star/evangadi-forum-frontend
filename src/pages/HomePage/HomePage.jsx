import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import style from "./homePage.module.css";
import { AppState } from "../../components/protectedRoute/ProtectedRoute";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Layout from "../../components/Layout/Layout";
import axiosConfig from "./../../axiosConfig";

const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const { user } = useContext(AppState);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleQuestions, setVisibleQuestions] = useState([]);
  const [nextIndex, setNextIndex] = useState(6); // Start with the first 6
  const questionsPerPage = 6;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosConfig.get("/question", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    // Initial display of the first 6 questions
    setVisibleQuestions(questions.slice(0, questionsPerPage));
  }, [questions]);

  const filteredQuestions = visibleQuestions.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = () => {
    const newVisibleQuestions = questions.slice(
      0,
      nextIndex + questionsPerPage
    );
    setVisibleQuestions(newVisibleQuestions);
    setNextIndex(nextIndex + questionsPerPage);
  };

  return (
    <Layout>
      <section className={style.homepage}>
        <div className={style.container}>
          <Link to="/ask">
            <button className={style.askButton}>Ask Question</button>
          </Link>

          <div className={style.welcome}>
            <p>Welcome: {user?.username}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className={style.searchContainer}>
          <input
            type="text"
            placeholder="Search questions..."
            className={style.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={style.questions}>
          <hr />
        </div>

        {filteredQuestions.map((data, index) => (
          <div key={index} className={style.questionCard}>
            <QuestionCard question={data} />
          </div>
        ))}

        {visibleQuestions.length < questions.length && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className={style.showMoreButton} onClick={handleShowMore}>
              Show More
            </button>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default HomePage;
