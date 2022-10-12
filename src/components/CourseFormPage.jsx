import CourseForm from "./CourseForm";
import { useParams } from "react-router-dom";

const FormPage = ({courses}) => {
    const params = useParams();

    return <CourseForm course={courses[params.id]} />;
};

export default FormPage;