// AuthContext.js

import React, { createContext, useState } from 'react';

// Create the AuthContext object
const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});

// Create the AuthContext provider component
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
