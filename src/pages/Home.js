import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCut, FaStar, FaCalendarAlt, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <Container className="hero-content">
                    <Row className="align-items-center min-vh-100">
                        <Col lg={8} className="text-white">
                            <div className="hero-badge">
                                <FaStar className="me-2" />
                                Professional Grooming Services
                            </div>
                            <h1 className="hero-title">
                                SIGMA HAIR EXPERTS
                            </h1>
                            <h2 className="hero-subtitle">
                                Premium Barber Services in Pakistan
                            </h2>
                            <p className="hero-description">
                                Experience world-class grooming with our skilled professionals.
                                We bring international standards to Pakistan with over 5+ years of excellence
                                in men's grooming and styling.
                            </p>
                            <div className="hero-buttons">
                                <Button as={Link} to="/appointment" variant="warning" size="lg" className="me-3 mb-3">
                                    <FaCalendarAlt className="me-2" />
                                    Book Appointment
                                </Button>
                                <Button as={Link} to="/services" variant="outline-light" size="lg" className="mb-3">
                                    <FaCut className="me-2" />
                                    View Services
                                </Button>
                                <Button as={Link} to="/contact" variant="outline-light" size="lg" className="ms-lg-3 mb-3">
                                    <FaPhone className="me-2" />
                                    Contact Us
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Introduction Section */}
            <section className="intro-section py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <div className="intro-image-wrapper">
                                <div className="intro-badge">
                                    <FaCut className="me-2" />
                                    Since 2025
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=700&fit=crop"
                                    alt="Professional Barber Shop"
                                    className="img-fluid rounded shadow-lg intro-image"
                                />
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="section-label">About Our Business</div>
                            <h2 className="section-title">Welcome to SIGMA HAIR EXPERTS</h2>
                            <p className="section-description">
                                SIGMA HAIR EXPERTS is a well-established, professional barber shop operating in Pakistan.
                                We are committed to providing premium grooming services that meet international standards.
                            </p>
                            <p className="section-description">
                                Our business is registered and fully operational, serving hundreds of satisfied customers
                                who trust us for their grooming needs. We specialize in modern haircuts, traditional styling,
                                beard grooming, and complete men's grooming packages.
                            </p>

                            <Row className="mt-4">
                                <Col md={6} className="mb-3">
                                    <Card className="feature-card">
                                        <Card.Body>
                                            <FaCut className="feature-icon" />
                                            <h5>Expert Barbers</h5>
                                            <p>Skilled professionals with years of experience</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Card className="feature-card">
                                        <Card.Body>
                                            <FaStar className="feature-icon" />
                                            <h5>Premium Quality</h5>
                                            <p>International standards in grooming services</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <Button as={Link} to="/about" variant="dark" size="lg" className="mt-3">
                                Learn More About Us
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-section py-5">
                <Container>
                    <div className="text-center mb-5">
                        <div className="section-label">Why Choose Us</div>
                        <h2 className="section-title">Professional Barber Services You Can Trust</h2>
                        <p className="section-description mx-auto" style={{ maxWidth: '700px' }}>
                            SIGMA HAIR EXPERTS is a legitimate, operating business in Pakistan,
                            providing professional grooming services with verified credentials.
                        </p>
                    </div>

                    <Row>
                        <Col lg={3} md={6} className="mb-4">
                            <Card className="benefit-card text-center h-100">
                                <Card.Body>
                                    <div className="benefit-icon-wrapper">
                                        <FaCut className="benefit-icon" />
                                    </div>
                                    <h5>5+ Years Experience</h5>
                                    <p>Established barber shop with proven track record</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} md={6} className="mb-4">
                            <Card className="benefit-card text-center h-100">
                                <Card.Body>
                                    <div className="benefit-icon-wrapper">
                                        <FaStar className="benefit-icon" />
                                    </div>
                                    <h5>Professional Team</h5>
                                    <p>Certified and skilled barber professionals</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} md={6} className="mb-4">
                            <Card className="benefit-card text-center h-100">
                                <Card.Body>
                                    <div className="benefit-icon-wrapper">
                                        <FaMapMarkerAlt className="benefit-icon" />
                                    </div>
                                    <h5>Prime Location</h5>
                                    <p>Conveniently located in Pakistan</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} md={6} className="mb-4">
                            <Card className="benefit-card text-center h-100">
                                <Card.Body>
                                    <div className="benefit-icon-wrapper">
                                        <FaCalendarAlt className="benefit-icon" />
                                    </div>
                                    <h5>Easy Booking</h5>
                                    <p>Simple online appointment system</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={8} className="text-center text-lg-start mb-3 mb-lg-0">
                            <h2 className="text-white mb-2">Ready for a Premium Grooming Experience?</h2>
                            <p className="text-white-50 mb-0">Book your appointment today and experience professional barber services</p>
                        </Col>
                        <Col lg={4} className="text-center text-lg-end">
                            <Button as={Link} to="/appointment" variant="warning" size="lg">
                                <FaCalendarAlt className="me-2" />
                                Book Now
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;
