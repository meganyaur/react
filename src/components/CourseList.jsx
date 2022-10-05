import './CourseList.css';

const CourseList = ({courses, term}) => {
    return (
        <div className="CardGroup"> {
            Object.entries(courses).filter(course => course[1].term === term).map(([id, course]) =>
            <div key={id} className='card m-1 p-2'>
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
            }
        </div>
    )
};

export default CourseList;