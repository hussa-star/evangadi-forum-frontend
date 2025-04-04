import { Link } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaGreaterThan } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns"; // You can use date-fns for formatting the time
import style from "./card.module.css";

const QuestionCard = ({ question }) => {
  console.log(question);

  // Format the created_at time (assuming it's a timestamp or ISO string)
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

          <Link
            to={`/questions/${question.questionid}`}
            className={style.question_title}
          >
            {question.title}
            {/* Displaying the formatted time below the question title */}
            <div className={style.timeAgo}>{formattedTime}</div>
          </Link>
        </div>
        <div>
          <Link
            to={`/questions/${question.questionid}`}
            className={style.expand_icon}
          >
            <FaGreaterThan />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
