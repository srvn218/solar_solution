import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Projects from './pages/Projects';
import Consultant from './pages/Consultant';
import Quote from './pages/Quote';
import Calculator from './pages/Calculator';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-900">
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={
          <>
            <Navbar />
            {/* The key prop triggers a re-render/animation when the path changes */}
            <main className="flex-grow animate-fade-in-page" key={location.pathname}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/consultant" element={<Consultant />} />
                <Route path="/quote" element={<Quote />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
};

export default App;