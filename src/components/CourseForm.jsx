import { useFormData } from './useFormData';
import { useNavigate } from 'react-router-dom';

const validateCourseData = (key, val) => {
//   switch (key) {
//     case 'title': case 'lastName':
//       return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
//     case 'email':
//       return /^\w+@\w+[.]\w+/.test(val) ? '' : 'must contain name@domain.top-level-domain';
//     default: return '';
//   }
    return '';
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const CourseForm = ({course}) => {
//   const [update, result] = useDbUpdate(`/courses/${course.id}`);
  const [state, change] = useFormData(null, course);
  const submit = (evt) => {
    // evt.preventDefault();
    // if (!state.errors) {
    //   update(state.values);
    // }
  };

  return (
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
        <h1> Edit Course</h1>
      <InputField name="title" text="Title" state={state} change={change} />
      <InputField name="meets" text="Time" state={state} change={change} />
      <ButtonBar message={""} />
    </form>
  )
};

export default CourseForm;