import React, { useState, useEffect } from 'react';

// It takes a default context: and context is just our app or component white State.
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
}); // Often ir will be an object

// What we get back will be a component or an object that also contains components.

// AuthContext is not a component, it is an object that will contain a component.
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// To use our context in our app we need to do two things:
// 1 - Need to provide it (tells React that it is our Context) all components that are wrapped by it  should have access to it
// 2 - We need to consume it (hook into it / listen to it)
export default AuthContext;
