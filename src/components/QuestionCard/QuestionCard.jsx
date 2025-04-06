import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import style from "./card.module.css";

const QuestionCard = ({ question }) => {
  const formattedTime = question.created_at
    ? formatDistanceToNow(new Date(question.created_at)) + " ago"
    : "Unknown time";

  return (
    <div className={style.question_container}>
      <div className={style.question_line}>
        <div className={style.qn_title}>
          <div className={style.user}>
            <IoPersonCircleOutline size={"70px"} />
            <small>{question.username}</small>
          </div>

          <div className={style.title_time_wrapper}>
            <Link
              to={`/questions/${question.questionid}`}
              className={style.question_title}
            >
              {question.title}
            </Link>
            <div className={style.timeAgo}>{formattedTime}</div>
          </div>
        </div>

        <Link
          to={`/questions/${question.questionid}`}
          className={style.expand_icon}
        >
          <FaGreaterThan />
        </Link>
      </div>
    </div>
  );
};

export default QuestionCard;
