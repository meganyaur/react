import "./Course.css";
import { PencilSquare} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Course = ({ id, course, selected, toggleSelected, conflicts, profile }) => {
  return (
    <div
      className={`card m-1 p-2 ${selected.includes(id) ? "selected" : ""}${
        conflicts.includes(id) ? "conflict" : ""
      }`}
      onClick={() => !conflicts.includes(id) && toggleSelected(id)}
    >
      <div className="top">
        <h5>
          {course.term} CS {course.number}
        </h5>
        <p>{course.title}</p>
      </div>
      <hr></hr>
      <div className="card-body">
        <p>{course.meets}</p>
        {profile?.isAdmin && (<Link to={"/edit/" + id}><PencilSquare/></Link>)}
      </div>
    </div>
  );
};

export default Course;
