const CourseInfo = ({ course }) => {
    return (
      <div>
        <b style={{color: '#A7C7E7'}}>{course.term} CS {course.number}</b> {" "}
        {course.title} | <em>{course.meets}</em>
      </div>
    );
  };
  
  const Schedule = ({ courses, selected }) => (
    <div>
      {selected.length === 0
        ? "No courses selected yet. Add to your schedule by selecting course cards."
        : selected.map((courseID) => (
            <CourseInfo key={courseID} course={courses[courseID]} />
          ))}
    </div>
  );
  
  export default Schedule;