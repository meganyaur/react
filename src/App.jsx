import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import CourseFormPage from './components/CourseFormPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { addConflicts, removeConflicts } from "./utilities/conflict";
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

const queryClient = new QueryClient();

const Main = () => {
  const [selection, setSelection] = useState("Fall");
  const [selected, setSelected] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  
  const toggleSelected = (course) => {
    if (selected.includes(course)) {
      let newSelected = selected.filter((x) => x !== course);
      setConflicts(() =>
        removeConflicts(conflicts, newSelected, course, schedule.courses)
      );
      setSelected(newSelected);
    } else {
      setConflicts(() =>
        addConflicts(conflicts, course, selected, schedule.courses)
      );
      setSelected([...selected, course]);
    }
  };
  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!schedule) return <h1>No user data found</h1>;

  return  <div className="container">
            <Banner title={schedule.title}/>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<TermPage courses={schedule.courses} selection={selection} setSelection={setSelection} selected={selected} toggleSelected={toggleSelected} conflicts={conflicts} />}/>
                <Route path='/edit/:id' element={<CourseFormPage courses={schedule.courses} />}></Route>
              </Routes>
            </BrowserRouter>
          </div>;
}

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
  );
};

export default App;