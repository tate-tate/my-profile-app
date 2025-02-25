import './App.css';
import React, { useEffect, useContext } from 'react';
import Navbar from "./components/Navbar";
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import AddProfile from "./pages/AddProfile";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfileLayoutPage from "./pages/ProfileLayoutPage";
import { ModeContext, ModeProvider } from "./contexts/ModeContext";

const App = () => {
  return (
    <ModeProvider>
      <ModeContent /> {/* Wrap everything inside ModeProvider */}
    </ModeProvider>
  );
};

const ModeContent = () => {
  const { darkMode } = useContext(ModeContext); // ✅ Now inside ModeProvider

  // Apply class to <body> whenever darkMode changes
  useEffect(() => {
    document.body.className = darkMode === "light" ? "light" : "dark";
  }, [darkMode]); 

  return (
    <HashRouter>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/profile/:id" element={<ProfileLayoutPage />}>
            <Route index element={<ProfileDetailPage />} />
            <Route path="edit" element={<ProfileEditPage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </HashRouter>
  );
};

export default App;
