import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCut } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="professional-footer">
            <Container>
                <Row className="py-5">
                    <Col lg={4} md={6} className="mb-4 mb-lg-0">
                        <div className="footer-brand">
                            <FaCut className="footer-brand-icon" />
                            <h4>SIGMA HAIR EXPERTS</h4>
                        </div>
                        <p className="footer-description">
                            Professional barber services in Pakistan. We provide premium grooming experiences with skilled professionals dedicated to excellence.
                        </p>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaFacebook />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaInstagram />
                            </a>
                            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </Col>

                    <Col lg={2} md={6} className="mb-4 mb-lg-0">
                        <h5 className="footer-heading">Quick Links</h5>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/testimonials">Testimonials</Link></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6} className="mb-4 mb-lg-0">
                        <h5 className="footer-heading">Important</h5>
                        <ul className="footer-links">
                            <li><Link to="/business-details">Business Details</Link></li>
                            <li><Link to="/appointment">Book Appointment</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6}>
                        <h5 className="footer-heading">Contact Info</h5>
                        <ul className="footer-contact">
                            <li>
                                <FaMapMarkerAlt className="contact-icon" />
                                <span>Opposite best price super store Jinnahabad road mandian Abbottabad, Pakistan</span>
                            </li>
                            <li>
                                <FaPhone className="contact-icon" />
                                <span>+92 334-9549280 <br /> +92 333-5040799</span>
                            </li>
                            <li>
                                <FaEnvelope className="contact-icon" />
                                <span>sigmahairexperts@gmail.com</span>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <div className="footer-bottom">
                    <Row>
                        <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
                            <p>&copy; 2019 SIGMA HAIR EXPERTS. All Rights Reserved.</p>
                        </Col>
                        <Col md={6} className="text-center text-md-end">
                            <p className="footer-tagline">Professional Barber Services – Pakistan</p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
