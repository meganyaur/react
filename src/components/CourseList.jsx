import './CourseList.css';
import Course from "./Course"

const CourseList = ({courses, term, selected, toggleSelected}) => {
    return (
        <div className="CourseList"> {
            Object.entries(courses).filter(course => course[1].term === term).map(([id, course]) =>
            <Course key={id} id={id} course={course} selected={selected} toggleSelected={toggleSelected}
            />
        )}
        </div>
    )
};

export default CourseList;