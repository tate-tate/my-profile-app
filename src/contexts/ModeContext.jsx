import { createContext } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
 
export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [darkMode, setMode] = useState('light');
  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  return (
    <ModeContext.Provider value={{ darkMode, handleModeChange }}>
      {children}
    </ModeContext.Provider>
  );
};
export const useMode = () => useContext(ModeContext);