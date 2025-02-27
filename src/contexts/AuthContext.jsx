import { createContext } from 'react';
import { useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true" ? true : false);
  const login = () => {
    setIsLogin(true);
    localStorage.setItem("isLogin", true);
  }
  const logout = () => {
    fetch("https://web.ics.purdue.edu/~severg/profile-app/logout.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        setIsLogin(false);
      localStorage.setItem("isLogin", false);
      }
      else {alert(data.message);}
    })
    .catch(error => console.log(error));
    };
  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};