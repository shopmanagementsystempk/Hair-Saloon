import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaCut, FaPaintBrush, FaSpa } from 'react-icons/fa';
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // Default services (will be used if Firebase is not configured yet)
    const defaultServices = [
        {
            id: 1,
            name: 'Men\'s Haircut',
            description: 'Professional haircut with modern styling techniques. Includes consultation, wash, cut, and styling.',
            price: 'PKR 500',
            icon: <FaCut />,
            category: 'Haircut'
        },
        {
            id: 2,
            name: 'Kids Haircut',
            description: 'Gentle and patient haircut service for children. We make sure kids feel comfortable and happy.',
            price: 'PKR 350',
            icon: <FaCut />,
            category: 'Haircut'
        },
        {
            id: 3,
            name: 'Beard Trim & Styling',
            description: 'Expert beard trimming and shaping to complement your face structure and personal style.',
            price: 'PKR 300',
            icon: <FaCut />,
            category: 'Beard'
        },
        {
            id: 4,
            name: 'Hair Styling',
            description: 'Professional hair styling for special occasions or everyday looks using premium products.',
            price: 'PKR 400',
            icon: <FaPaintBrush />,
            category: 'Styling'
        },
        {
            id: 5,
            name: 'Facial & Skin Care',
            description: 'Rejuvenating facial treatment to cleanse, exfoliate, and nourish your skin.',
            price: 'PKR 800',
            icon: <FaSpa />,
            category: 'Grooming'
        },
        {
            id: 6,
            name: 'Hair Coloring',
            description: 'Professional hair coloring service using high-quality, safe products for natural-looking results.',
            price: 'PKR 1500',
            icon: <FaPaintBrush />,
            category: 'Coloring'
        },
        {
            id: 7,
            name: 'Basic Grooming Package',
            description: 'Haircut + Beard Trim - Complete grooming solution for the modern gentleman.',
            price: 'PKR 700',
            icon: <FaCut />,
            category: 'Package'
        },
        {
            id: 8,
            name: 'Premium Grooming Package',
            description: 'Haircut + Beard Trim + Facial - Ultimate grooming experience with all essential services.',
            price: 'PKR 1400',
            icon: <FaSpa />,
            category: 'Package'
        },
        {
            id: 9,
            name: 'Deluxe Grooming Package',
            description: 'Haircut + Beard Trim + Facial + Hair Styling - Complete transformation package.',
            price: 'PKR 1800',
            icon: <FaSpa />,
            category: 'Package'
        }
    ];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const servicesCollection = collection(db, 'services');
            const servicesSnapshot = await getDocs(servicesCollection);
            const servicesList = servicesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (servicesList.length > 0) {
                setServices(servicesList);
            } else {
                setServices(defaultServices);
            }
        } catch (error) {
            console.log('Using default services');
            setServices(defaultServices);
        } finally {
            setLoading(false);
        }
    };

    const getIconForCategory = (category) => {
        switch (category) {
            case 'Haircut':
                return <FaCut />;
            case 'Beard':
                return <FaCut />;
            case 'Styling':
            case 'Coloring':
                return <FaPaintBrush />;
            case 'Grooming':
            case 'Package':
                return <FaSpa />;
            default:
                return <FaCut />;
        }
    };

    return (
        <div className="services-page">
            {/* Page Header */}
            <section className="page-header">
                <Container>
                    <h1 className="page-title">Our Services</h1>
                    <p className="page-subtitle">Professional Grooming Services with Transparent Pricing</p>
                </Container>
            </section>

            {/* Services Section */}
            <section className="services-section py-5">
                <Container>
                    <div className="text-center mb-5">
                        <div className="section-label">What We Offer</div>
                        <h2 className="section-title">Premium Barber Services</h2>
                        <p className="section-description mx-auto" style={{ maxWidth: '700px' }}>
                            At SIGMA HAIR DRESSERS, we offer a comprehensive range of professional grooming services.
                            All prices are transparent and competitive, ensuring you receive excellent value for premium quality.
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <Row>
                            {services.map((service) => (
                                <Col lg={4} md={6} className="mb-4" key={service.id}>
                                    <Card className="service-card h-100">
                                        <Card.Body>
                                            <div className="service-icon-wrapper">
                                                {service.icon || getIconForCategory(service.category)}
                                            </div>
                                            <Badge bg="warning" text="dark" className="category-badge mb-3">
                                                {service.category}
                                            </Badge>
                                            <h4 className="service-name">{service.name}</h4>
                                            <p className="service-description">{service.description}</p>
                                            <div className="service-price">{service.price}</div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            </section>

            {/* Additional Info */}
            <section className="service-info py-5 bg-light">
                <Container>
                    <Row>
                        <Col lg={4} md={6} className="mb-4">
                            <Card className="info-card h-100">
                                <Card.Body className="text-center">
                                    <FaCut className="info-icon" />
                                    <h5>Professional Equipment</h5>
                                    <p>We use only professional-grade tools and equipment for all our services.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={6} className="mb-4">
                            <Card className="info-card h-100">
                                <Card.Body className="text-center">
                                    <FaSpa className="info-icon" />
                                    <h5>Premium Products</h5>
                                    <p>All services include the use of high-quality, branded grooming products.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4} md={6} className="mb-4">
                            <Card className="info-card h-100">
                                <Card.Body className="text-center">
                                    <FaCut className="info-icon" />
                                    <h5>Skilled Professionals</h5>
                                    <p>Our barbers are trained professionals with years of experience.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Services;
