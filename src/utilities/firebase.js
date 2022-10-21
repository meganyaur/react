// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  child,
  getDatabase,
  onValue,
  push,
  ref,
  update,
  set
} from "firebase/database";
import { useCallback, useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVN6tnrkdas6If5U1zm8VdWf3_dyAY3bM",
  authDomain: "react-741b8.firebaseapp.com",
  databaseURL: "https://react-741b8-default-rtdb.firebaseio.com",
  projectId: "react-741b8",
  storageBucket: "react-741b8.appspot.com",
  messagingSenderId: "699533677348",
  appId: "1:699533677348:web:02d9e7b79d5268d1a219b1",
  measurementId: "G-P08FNVTS1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

// AUTHENTICATION FUNCTIONS
export const signInWithGoogle = () => {
  signInWithPopup(getAuth(app), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(app));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(app), setUser));

  return [user];
};

//Add new user
export const addNewUser = (newUser, uid) => {
  set(ref(database, "users/" + uid), newUser);

};
