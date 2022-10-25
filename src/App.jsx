import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import TermPage from "./components/TermPage";
import { addConflicts, removeConflicts } from "./utilities/conflict";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CourseForm from "./components/CourseForm";
import {
  signInWithGoogle,
  signOut,
  useAuthState,
  useDbData,
} from "./utilities/firebase";
import { getUser } from "./components/User";
import { useProfile } from "./utilities/profile";

const SignInButton = () => (
  <button
    className="ms-auto btn btn-dark"
    onClick={signInWithGoogle}
    style={{ fontSize: 30 }}
  >
    Sign in
  </button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>
    Sign out
  </button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

export default function App() {
  const [data, dataError] = useDbData("/");
  const [profile, profileLoading, profileError] = useProfile();

  const [selection, setSelection] = useState("Fall");
  const [selected, setSelected] = useState([]);
  const [conflicts, setConflicts] = useState([]);

  const toggleSelected = (course) => {
    if (selected.includes(course)) {
      let newSelected = selected.filter((x) => x !== course);
      setConflicts(() =>
        removeConflicts(conflicts, newSelected, course, data.courses)
      );
      setSelected(newSelected);
    } else {
      setConflicts(() =>
        addConflicts(conflicts, course, selected, data.courses)
      );
      setSelected([...selected, course]);
    }
  };

  if (dataError) return <h1>Error loading data: {dataError.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

  return (
    <div className="container">
      <AuthButton />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <TermPage
                title={data.title}
                courses={data.courses}
                selection={selection}
                setSelection={setSelection}
                selected={selected}
                toggleSelected={toggleSelected}
                conflicts={conflicts}
                profile={profile}
              />
            }
          />
          <Route path="/edit/:id" element={<CourseForm data={data} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
