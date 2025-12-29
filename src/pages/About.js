import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaAward, FaUsers, FaCut, FaStar, FaHandshake, FaHeart } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './About.css';

const About = () => {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState({
        established: '2019',
        income: 'PKR 1,000,000+',
        happyCustomers: '5000+',
        experience: '5+'
    });

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const infoDoc = await getDoc(doc(db, 'settings', 'businessInfo'));
                if (infoDoc.exists()) {
                    setInfo(infoDoc.data());
                }
            } catch (error) {
                console.error('Error fetching info:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    }

    return (
        <div className="about-page">
            {/* Page Header */}
            <section className="page-header">
                <Container>
                    <h1 className="page-title">About SIGMA HAIR EXPERTS</h1>
                    <p className="page-subtitle">Professional Barber Services in Pakistan</p>
                </Container>
            </section>

            {/* Business Overview */}
            <section className="business-overview py-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <img
                                src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=700&fit=crop"
                                alt="SIGMA HAIR EXPERTS Shop"
                                className="img-fluid rounded shadow-lg"
                            />
                        </Col>
                        <Col lg={6}>
                            <div className="section-label">Our Story</div>
                            <h2 className="section-title">Established Barber Shop in Pakistan</h2>
                            <p className="section-description">
                                SIGMA HAIR EXPERTS is a registered and fully operational barber shop located in Pakistan.
                                We have been serving our community with professional grooming services since {info.established}, building
                                a reputation for excellence and reliability.
                            </p>
                            <p className="section-description">
                                Our business is legally registered and operates in compliance with all local regulations.
                                We maintain professional standards that meet international expectations, making us a trusted
                                choice for customers seeking quality grooming services.
                            </p>
                            <p className="section-description">
                                With over {info.experience} years of experience in the barbering industry, we have served thousands of
                                satisfied customers who trust us for their grooming needs. Our commitment to quality and
                                professionalism has made us a well-known establishment in our area.
                            </p>

                            <Row className="mt-4">
                                <Col md={4} className="mb-3">
                                    <div className="stat-box">
                                        <h3 className="stat-number">{info.experience}</h3>
                                        <p className="stat-label">Years Experience</p>
                                    </div>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <div className="stat-box">
                                        <h3 className="stat-number">{info.income.split(' ')[1] || '1M+'}</h3>
                                        <p className="stat-label">Monthly Income (PKR)</p>
                                    </div>
                                </Col>
                                <Col md={4} className="mb-3">
                                    <div className="stat-box">
                                        <h3 className="stat-number">{info.happyCustomers || '5000+'}</h3>
                                        <p className="stat-label">Happy Customers</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Owner Profile */}
            <section className="owner-profile py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <div className="section-label">Meet Our Owners</div>
                        <h2 className="section-title">{info.ownersSectionTitle || 'Professional Barber & Business Owners'}</h2>
                    </div>

                    <Row className="justify-content-center">
                        <Col lg={6} className="mb-4">
                            <Card className="owner-card h-100">
                                <Card.Body className="p-4 p-md-5">
                                    <Row className="align-items-center">
                                        <Col md={12} className="text-center mb-4">
                                            <div className="owner-image-wrapper mx-auto">
                                                <img
                                                    src={info.owner1Image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"}
                                                    alt={`Owner ${info.owner1Name || 'Abdul Razaq'}`}
                                                    className="owner-image"
                                                />
                                                <div className="owner-badge">
                                                    <FaAward />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12} className="text-center">
                                            <h3 className="owner-name">{info.owner1Name || 'Abdul Razaq'}</h3>
                                            <p className="owner-title">{info.owner1Title || 'Owner & Professional Barber'}</p>
                                            <div className="owner-experience mb-3 justify-content-center d-flex align-items-center">
                                                <FaCut className="me-2" />
                                                <span>{info.owner1Experience || '5+ Years of Professional Experience'}</span>
                                            </div>
                                            <p className="owner-bio">
                                                {info.owner1Bio || "As the owner and lead barber of SIGMA HAIR EXPERTS, I bring over 5 years of professional experience in men's grooming and styling. I am committed to providing the highest quality services to every customer who walks through our doors."}
                                            </p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6} className="mb-4">
                            <Card className="owner-card h-100">
                                <Card.Body className="p-4 p-md-5">
                                    <Row className="align-items-center">
                                        <Col md={12} className="text-center mb-4">
                                            <div className="owner-image-wrapper mx-auto">
                                                <img
                                                    src={info.owner2Image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"}
                                                    alt={`Partner ${info.owner2Name || 'Raja Ahsan Haider'}`}
                                                    className="owner-image"
                                                />
                                                <div className="owner-badge">
                                                    <FaAward />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={12} className="text-center">
                                            <h3 className="owner-name">{info.owner2Name || 'Raja Ahsan Haider'}</h3>
                                            <p className="owner-title">{info.owner2Title || 'Partner & Business Owner'}</p>
                                            <div className="owner-experience mb-3 justify-content-center d-flex align-items-center">
                                                <FaAward className="me-2" />
                                                <span>{info.owner2Experience || '5+ Years of Professional Business Management'}</span>
                                            </div>
                                            <p className="owner-bio">
                                                {info.owner2Bio || 'As the owner at SIGMA HAIR EXPERTS, I focus on operational excellence and customer satisfaction. Our goal is to maintain the highest standards of professional grooming services in Pakistan and ensure every client receives premium care.'}
                                            </p>
                                            {(info.owner2Bio2 || !info.owner2Bio) && (
                                                <p className="owner-bio">
                                                    {info.owner2Bio2 || 'We work together to ensure that our business remains a trusted name in the industry, providing legitimate and high-quality services to our valued community.'}
                                                </p>
                                            )}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Mission & Values */}
            <section className="mission-values py-5">
                <Container>
                    <div className="text-center mb-5">
                        <div className="section-label">Our Values</div>
                        <h2 className="section-title">Mission & Core Values</h2>
                        <p className="section-description mx-auto" style={{ maxWidth: '700px' }}>
                            At SIGMA HAIR EXPERTS, we are guided by principles that ensure quality,
                            professionalism, and customer satisfaction.
                        </p>
                    </div>

                    <Row>
                        <Col lg={4} md={6} className="mb-4">
                            <Card className="value-card h-100">
                                <Card.Body className="text-center">
                                    <div className="value-icon-wrapper">
                                        <FaStar className="value-icon" />
                                    </div>
                                    <h4>Excellence</h4>
                                    <p>
                                        We strive for excellence in every service we provide, ensuring that each
                                        customer receives the best possible grooming experience.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4} md={6} className="mb-4">
                            <Card className="value-card h-100">
                                <Card.Body className="text-center">
                                    <div className="value-icon-wrapper">
                                        <FaHandshake className="value-icon" />
                                    </div>
                                    <h4>Professionalism</h4>
                                    <p>
                                        We maintain the highest standards of professionalism in our business operations,
                                        customer service, and grooming techniques.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4} md={6} className="mb-4">
                            <Card className="value-card h-100">
                                <Card.Body className="text-center">
                                    <div className="value-icon-wrapper">
                                        <FaHeart className="value-icon" />
                                    </div>
                                    <h4>Customer Care</h4>
                                    <p>
                                        Our customers are at the heart of everything we do. We are committed to
                                        providing personalized service and building lasting relationships.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4} md={6} className="mb-4">
                            <Card className="value-card h-100">
                                <Card.Body className="text-center">
                                    <div className="value-icon-wrapper">
                                        <FaAward className="value-icon" />
                                    </div>
                                    <h4>Quality</h4>
                                    <p>
                                        We use only premium products and maintain high-quality standards in all
                                        our services to ensure customer satisfaction.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4} md={6} className="mb-4">
                            <Card className="value-card h-100">
                                <Card.Body className="text-center">
                                    <div className="value-icon-wrapper">
                                        <FaUsers className="value-icon" />
                                    </div>
                                    <h4>Community</h4>
                                    <p>
                                        We are proud to serve our local community and contribute to the grooming
                                        industry in Pakistan with integrity and dedication.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4} md={6} className="mb-4">
                            <Card className="value-card h-100">
                                <Card.Body className="text-center">
                                    <div className="value-icon-wrapper">
                                        <FaCut className="value-icon" />
                                    </div>
                                    <h4>Expertise</h4>
                                    <p>
                                        Our team consists of skilled professionals with extensive training and
                                        experience in modern barbering techniques.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Why Trust Us */}
            <section className="why-trust py-5 bg-dark text-white">
                <Container>
                    <div className="text-center mb-5">
                        <div className="section-label" style={{ color: '#ffc107' }}>Credibility</div>
                        <h2 className="section-title text-white">Why Customers Trust SIGMA HAIR EXPERTS</h2>
                    </div>

                    <Row>
                        <Col lg={6} className="mb-4">
                            <div className="trust-item">
                                <div className="trust-number">01</div>
                                <h4>Registered Business</h4>
                                <p>
                                    SIGMA HAIR EXPERTS is a legally registered business operating in full compliance
                                    with Pakistani business regulations. Our registration details are available for
                                    verification.
                                </p>
                            </div>
                        </Col>

                        <Col lg={6} className="mb-4">
                            <div className="trust-item">
                                <div className="trust-number">02</div>
                                <h4>Proven Track Record</h4>
                                <p>
                                    With over 5 years of continuous operation, we have built a solid reputation in
                                    our community. Our long-standing presence demonstrates our reliability and commitment.
                                </p>
                            </div>
                        </Col>

                        <Col lg={6} className="mb-4">
                            <div className="trust-item">
                                <div className="trust-number">03</div>
                                <h4>Professional Credentials</h4>
                                <p>
                                    Our owner and staff have professional training and certifications in barbering.
                                    We maintain high standards of skill and expertise in all our services.
                                </p>
                            </div>
                        </Col>

                        <Col lg={6} className="mb-4">
                            <div className="trust-item">
                                <div className="trust-number">04</div>
                                <h4>Transparent Operations</h4>
                                <p>
                                    We operate with complete transparency, providing clear information about our
                                    business, services, and pricing. Our business details are publicly available.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default About;
