import './CourseList.css';

const CourseList = ({courses}) => {
    let courseKeys = Object.keys(courses)
    return <div className="CardGroup">
        {courseKeys.map((course) => <div key={course} className='card m-1 p-2'>
            <div className='top'>
                <h5>{courses[course].term} CS {courses[course].number}</h5>
                <p>{courses[course].title}</p>
            </div>
            <hr></hr>
            <div className="card-body">
                <p>{courses[course].meets}</p>
            </div>
        </div>)}
    </div>
};

export default CourseList;

