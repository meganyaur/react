import './Course.css';

const Course = ({id, course, selected, toggleSelected, conflicts}) => {
    return (
        <div className={`card m-1 p-2 ${selected.includes(id) ? "selected" : ""}${
            conflicts.includes(id) ? "conflict" : ""
          }`}
          onClick={() => !conflicts.includes(id) && toggleSelected(id)}>
            <div className='top'>
                <h5>{course.term} CS {course.number}</h5>
                <p>{course.title}</p>
            </div>
            <hr></hr>
            <div className="card-body">
                <p>{course.meets}</p>
            </div>
        </div>
        )
};

export default Course;