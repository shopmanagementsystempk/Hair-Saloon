import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaCut, FaPhone } from 'react-icons/fa';
import './Navigation.css';

const Navigation = () => {
    const [expanded, setExpanded] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" expanded={expanded} className="professional-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-logo">
                    <FaCut className="brand-icon" />
                    <span className="brand-text">SIGMA HAIR DRESSERS</span>
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-lg-center">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={isActive('/')}
                            onClick={() => setExpanded(false)}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/about"
                            className={isActive('/about')}
                            onClick={() => setExpanded(false)}
                        >
                            About Us
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/services"
                            className={isActive('/services')}
                            onClick={() => setExpanded(false)}
                        >
                            Services
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/gallery"
                            className={isActive('/gallery')}
                            onClick={() => setExpanded(false)}
                        >
                            Gallery
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/business-details"
                            className={isActive('/business-details')}
                            onClick={() => setExpanded(false)}
                        >
                            Business Details
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/testimonials"
                            className={isActive('/testimonials')}
                            onClick={() => setExpanded(false)}
                        >
                            Testimonials
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/contact"
                            className={isActive('/contact')}
                            onClick={() => setExpanded(false)}
                        >
                            Contact
                        </Nav.Link>
                        <Button
                            as={Link}
                            to="/appointment"
                            variant="warning"
                            className="ms-lg-3 mt-2 mt-lg-0 appointment-btn"
                            onClick={() => setExpanded(false)}
                        >
                            <FaPhone className="me-2" />
                            Book Appointment
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
