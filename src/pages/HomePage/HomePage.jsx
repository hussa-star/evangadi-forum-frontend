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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const questionsPerPage = 6;

  useEffect(() => {
    fetchQuestions();
  }, [currentPage]);

  const fetchQuestions = async () => {
    try {
      const response = await axiosConfig.get(
        `/question?page=${currentPage}&limit=${questionsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setQuestions(response.data.questions);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const filteredQuestions = questions.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? style.activePage : ""}
        >
          {i}
        </button>
      );
    }
    return pages;
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

        <div className={style.pagination}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
