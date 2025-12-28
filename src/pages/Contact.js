import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [info, setInfo] = useState({
        name: 'SIGMA HAIR DRESSERS',
        address: 'Shop No. 15, Main Boulevard, Lahore, Punjab, Pakistan',
        phone: '+92 300 1234567',
        whatsapp: '+92 300 1234567',
        email: 'info@sigmahairdressers.com',
        hoursMonFri: '9:00 AM - 9:00 PM',
        hoursSat: '9:00 AM - 10:00 PM',
        hoursSun: '10:00 AM - 8:00 PM',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.176!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890'
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [sendLoading, setSendLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBusinessInfo();
    }, []);

    const fetchBusinessInfo = async () => {
        try {
            const infoDoc = await getDoc(doc(db, 'settings', 'businessInfo'));
            if (infoDoc.exists()) {
                setInfo(infoDoc.data());
            }
        } catch (error) {
            console.error('Error fetching business info:', error);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[\d\s-]{10,}$/;

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 3) {
            errors.name = 'Name must be at least 3 characters';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            errors.phone = 'Please enter a valid phone number';
        }

        if (!formData.subject.trim()) {
            errors.subject = 'Subject is required';
        } else if (formData.subject.trim().length < 5) {
            errors.subject = 'Subject must be at least 5 characters';
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSendLoading(true);
        setError('');
        setSuccess(false);

        try {
            await addDoc(collection(db, 'contacts'), {
                ...formData,
                createdAt: serverTimestamp()
            });

            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setFormErrors({});

            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try calling us directly.');
        } finally {
            setSendLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    }

    return (
        <div className="contact-page">
            <section className="page-header">
                <Container>
                    <h1 className="page-title">Contact Us</h1>
                    <p className="page-subtitle">Get in Touch With {info.name}</p>
                </Container>
            </section>

            <section className="contact-section py-5">
                <Container>
                    <Row>
                        <Col lg={4} className="mb-4 mb-lg-0">
                            <Card className="contact-info-card h-100">
                                <Card.Body className="p-4">
                                    <h3 className="mb-4">Contact Information</h3>

                                    <div className="contact-item">
                                        <div className="contact-icon-wrapper">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <h5>Address</h5>
                                            <p>{info.address}</p>
                                        </div>
                                    </div>

                                    <div className="contact-item">
                                        <div className="contact-icon-wrapper">
                                            <FaPhone />
                                        </div>
                                        <div>
                                            <h5>Phone</h5>
                                            <p>{info.phone}</p>
                                        </div>
                                    </div>

                                    <div className="contact-item">
                                        <div className="contact-icon-wrapper">
                                            <FaWhatsapp />
                                        </div>
                                        <div>
                                            <h5>WhatsApp</h5>
                                            <p>
                                                <a href={`https://wa.me/${info.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                                                    Chat with us on WhatsApp
                                                </a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="contact-item">
                                        <div className="contact-icon-wrapper">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <h5>Email</h5>
                                            <p>{info.email}</p>
                                        </div>
                                    </div>

                                    <div className="contact-item">
                                        <div className="contact-icon-wrapper">
                                            <FaClock />
                                        </div>
                                        <div>
                                            <h5>Working Hours</h5>
                                            <p>
                                                Mon - Fri: {info.hoursMonFri}<br />
                                                Sat: {info.hoursSat}<br />
                                                Sun: {info.hoursSun}
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={8}>
                            <Card className="contact-form-card">
                                <Card.Body className="p-5">
                                    <h3 className="mb-4">Send Us a Message</h3>

                                    {success && (
                                        <Alert variant="success">
                                            <strong>Success!</strong> Your message has been sent. We'll get back to you soon.
                                        </Alert>
                                    )}

                                    {error && (
                                        <Alert variant="danger">
                                            {error}
                                        </Alert>
                                    )}

                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label>Full Name *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter your name"
                                                        isInvalid={!!formErrors.name}
                                                        className="custom-input"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formErrors.name}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label>Email Address *</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="your@email.com"
                                                        isInvalid={!!formErrors.email}
                                                        className="custom-input"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formErrors.email}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label>Phone Number *</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="+92 300 1234567"
                                                        isInvalid={!!formErrors.phone}
                                                        className="custom-input"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formErrors.phone}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label>Subject *</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        placeholder="Message subject"
                                                        isInvalid={!!formErrors.subject}
                                                        className="custom-input"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formErrors.subject}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <Form.Group>
                                                    <Form.Label>Message *</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={5}
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        placeholder="Write your message here..."
                                                        isInvalid={!!formErrors.message}
                                                        className="custom-input"
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formErrors.message}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                <Button
                                                    type="submit"
                                                    variant="warning"
                                                    size="lg"
                                                    className="w-100 submit-btn"
                                                    disabled={sendLoading}
                                                >
                                                    {sendLoading ? (
                                                        <>
                                                            <Spinner animation="border" size="sm" className="me-2" />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaPaperPlane className="me-2" />
                                                            Send Message
                                                        </>
                                                    )}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="map-section py-5 bg-light">
                <Container>
                    <div className="text-center mb-4">
                        <h2 className="section-title">Visit Our Shop</h2>
                        <p className="section-description">Find us on the map</p>
                    </div>

                    <Card className="map-card">
                        <Card.Body className="p-0">
                            <iframe
                                title={`${info.name} Location`}
                                src={info.mapUrl}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </div>
    );
};

export default Contact;
