import './App.css';
import style from "./styles/card.module.css";
import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import AddProfile from "./pages/AddProfile";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfileLayoutPage from "./pages/ProfileLayoutPage";

const App = () => {
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

