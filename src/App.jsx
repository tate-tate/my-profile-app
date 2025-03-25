import './App.css';
import React, { useEffect, useContext, Suspense, useCallback, useMemo, lazy } from 'react';
import Navbar from "./components/Navbar";
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import AddProfile from "./pages/AddProfile";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfileLayoutPage from "./pages/ProfileLayoutPage";
import { ModeContext, ModeProvider } from "./contexts/ModeContext";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const LazyComponent = lazy(() => import("./pages/ProfileDetailPage"));

const App = () => {
  return (
    <ModeProvider>
      <ModeContent />
    </ModeProvider>
  );
};

const ModeContent = React.memo(() => {
  const { darkMode } = useContext(ModeContext);

  useEffect(() => {
    document.body.className = darkMode === "light" ? "light" : "dark";
  }, [darkMode]);

  const renderLazyComponent = useCallback(() => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  ), []);

  const routes = useMemo(() => (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add-profile" element={<ProtectedRoute><AddProfile /></ProtectedRoute>} />
      <Route path="/profile/:id" element={<ProfileLayoutPage />}>
        <Route index element={renderLazyComponent()} />
        <Route path="edit" element={<ProtectedRoute><ProfileEditPage /></ProtectedRoute>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  ), [renderLazyComponent]);

  return (
    <AuthProvider>
      <HashRouter>
        <header>
          <Navbar />
        </header>
        <main>
          {routes}
        </main>
      </HashRouter>
    </AuthProvider>
  );
});

export default App;