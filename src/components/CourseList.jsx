const CourseList = ({courses}) => {
    let courseKeys = Object.keys(courses)
    return <div>
        {courseKeys.map((course) => <div key={course}>{courses[course].term} CS {courses[course].number}: {courses[course].title}</div>)}
    </div>
};

export default CourseList;