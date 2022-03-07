import React, { useState, Fragment } from 'react';
import AddUser from './components/Users/AddUser';
import UserLists from './components/Users/UserLists';

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  return (
    <Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UserLists users={usersList} />
    </Fragment>
  );
}

export default App;
