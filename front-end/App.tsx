import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { Portfolio } from './components/sections/Portfolio';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { Theme } from './types';
import { brandTheme } from './utils/theme';

function App() {
  const [adminPassword, setAdminPassword] = useState<string | null>(() => {
    return localStorage.getItem('admin_password');
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      return savedTheme || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', brandTheme.primary);
    document.documentElement.style.setProperty('--brand-secondary', brandTheme.secondary);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (password: string) => {
    localStorage.setItem('admin_password', password);
    setAdminPassword(password);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_password');
    setAdminPassword(null);
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'}`}>
        <Routes>
          {/* Main Website Route */}
          <Route path="/" element={
            <>
              <Header theme={theme} toggleTheme={toggleTheme} />
              <main>
                <Hero theme={theme} />
                <About theme={theme} />
                <Services theme={theme} />
                <Process theme={theme} />
                <Portfolio theme={theme} />
                {/* <Testimonials theme={theme} /> */}
                <FAQ theme={theme} />
                <Contact theme={theme} />
              </main>
              <Footer theme={theme} />
            </>
          } />

          {/* Admin Dashboard Route with Auth Check */}
          <Route path="/admin" element={
            !adminPassword ? (
              <AdminLogin theme={theme} onLogin={handleLogin} />
            ) : (
              <AdminDashboard theme={theme} token={adminPassword} onLogout={handleLogout} />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
