import "./CourseList.css";
import Course from "./Course";

const CourseList = ({ courses, term, selected, toggleSelected, conflicts, profile}) => {
  return (
    <div className="CourseList">
      {" "}
      {Object.entries(courses)
        .filter((course) => course[1].term === term)
        .map(([id, course]) => (
          <Course
            key={id}
            id={id}cd
            course={course}
            selected={selected}
            toggleSelected={toggleSelected}
            conflicts={conflicts}
            profile={profile}
          />
        ))}
    </div>
  );
};

export default CourseList;
