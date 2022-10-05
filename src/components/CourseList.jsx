import './CourseList.css';

const CourseList = ({courses}) => {
    let courseKeys = Object.keys(courses)
    return <div className='cardGroup'>
        {courseKeys.map((course) => <div key={course} className='card'>
            <div className='top'>
                <h5>{courses[course].term} CS {courses[course].number}</h5>
                <p>{courses[course].title}</p>
            </div>
            <hr></hr>
            <p>{courses[course].meets}</p>
            </div>)}
    </div>
};

export default CourseList;

