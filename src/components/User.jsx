import { useAuthState, addNewUser, useDbData } from "../utilities/firebase";
import { Link } from 'react-router-dom';

const AddUserDB = (user) => {
  if (user) {
    const newUser = {
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber
    };

    addNewUser(newUser, user.uid);
  }
};

export const getUser = () => {
  const [users, error] = useDbData("/users");
  const [user] = useAuthState();
  const [isAdmin, isLoading, errorAdmin] =  useDbData(`/admins/${user?.uid || 'guest'}`);

  if (user) {
    if (error) return error.toString();
    if (errorAdmin) return errorAdmin.toString();
    if (users === undefined) return "Loading...";
    if (isLoading) return "Loading...";
    if (!users) return "No user found";

    if (user.uid in users) {
      return [users[user.uid], isAdmin];
    } else {
      AddUserDB(user);
      return [users[user.uid], isAdmin];
    }
  }
};