import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import BusinessDetails from './pages/BusinessDetails';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Public Routes with Navigation and Footer */}
            <Route
              path="/*"
              element={
                <>
                  <Navigation />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/business-details" element={<BusinessDetails />} />
                      <Route path="/testimonials" element={<Testimonials />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/appointment" element={<Appointment />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
