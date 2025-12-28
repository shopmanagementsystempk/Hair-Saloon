import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { FaCalendarAlt, FaUser, FaPhone, FaCut, FaClock, FaCheckCircle } from 'react-icons/fa';
import './Appointment.css';

const Appointment = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        notes: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const services = [
        'Men\'s Haircut',
        'Kids Haircut',
        'Beard Trim & Styling',
        'Hair Styling',
        'Facial & Skin Care',
        'Hair Coloring',
        'Basic Grooming Package',
        'Premium Grooming Package',
        'Deluxe Grooming Package'
    ];

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
        '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await addDoc(collection(db, 'appointments'), {
                ...formData,
                status: 'pending',
                createdAt: serverTimestamp()
            });

            setSuccess(true);
            setFormData({
                name: '',
                phone: '',
                service: '',
                date: '',
                time: '',
                notes: ''
            });

            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error('Error booking appointment:', err);
            setError('Failed to book appointment. Please try calling us directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="appointment-page">
            {/* Page Header */}
            <section className="page-header">
                <Container>
                    <h1 className="page-title">Book an Appointment</h1>
                    <p className="page-subtitle">Schedule Your Grooming Session</p>
                </Container>
            </section>

            {/* Appointment Form */}
            <section className="appointment-form-section py-5">
                <Container>
                    <Row>
                        <Col lg={8} className="mx-auto">
                            <Card className="appointment-card">
                                <Card.Body className="p-5">
                                    <div className="text-center mb-4">
                                        <FaCalendarAlt className="form-icon" />
                                        <h2 className="form-title">Schedule Your Visit</h2>
                                        <p className="form-description">
                                            Fill in the details below to book your appointment. We'll confirm your booking shortly.
                                        </p>
                                    </div>

                                    {success && (
                                        <Alert variant="success" className="d-flex align-items-center">
                                            <FaCheckCircle className="me-2" />
                                            <div>
                                                <strong>Success!</strong> Your appointment has been booked. We'll contact you soon to confirm.
                                            </div>
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
                                                    <Form.Label className="form-label">
                                                        <FaUser className="me-2" />
                                                        Full Name *
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter your full name"
                                                        required
                                                        className="custom-input"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label className="form-label">
                                                        <FaPhone className="me-2" />
                                                        Phone Number *
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="+92 300 1234567"
                                                        required
                                                        className="custom-input"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label className="form-label">
                                                        <FaCut className="me-2" />
                                                        Select Service *
                                                    </Form.Label>
                                                    <Form.Select
                                                        name="service"
                                                        value={formData.service}
                                                        onChange={handleChange}
                                                        required
                                                        className="custom-input"
                                                    >
                                                        <option value="">Choose a service...</option>
                                                        {services.map((service, index) => (
                                                            <option key={index} value={service}>
                                                                {service}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label className="form-label">
                                                        <FaCalendarAlt className="me-2" />
                                                        Preferred Date *
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="date"
                                                        value={formData.date}
                                                        onChange={handleChange}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        required
                                                        className="custom-input"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={6} className="mb-3">
                                                <Form.Group>
                                                    <Form.Label className="form-label">
                                                        <FaClock className="me-2" />
                                                        Preferred Time *
                                                    </Form.Label>
                                                    <Form.Select
                                                        name="time"
                                                        value={formData.time}
                                                        onChange={handleChange}
                                                        required
                                                        className="custom-input"
                                                    >
                                                        <option value="">Choose a time...</option>
                                                        {timeSlots.map((slot, index) => (
                                                            <option key={index} value={slot}>
                                                                {slot}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>

                                            <Col md={12} className="mb-4">
                                                <Form.Group>
                                                    <Form.Label className="form-label">
                                                        Additional Notes (Optional)
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        name="notes"
                                                        value={formData.notes}
                                                        onChange={handleChange}
                                                        placeholder="Any special requests or preferences..."
                                                        className="custom-input"
                                                    />
                                                </Form.Group>
                                            </Col>

                                            <Col md={12}>
                                                <Button
                                                    type="submit"
                                                    variant="warning"
                                                    size="lg"
                                                    className="w-100 submit-btn"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Booking...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaCalendarAlt className="me-2" />
                                                            Book Appointment
                                                        </>
                                                    )}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>

                            {/* Contact Info */}
                            <Card className="contact-info-card mt-4">
                                <Card.Body className="p-4">
                                    <h5 className="mb-3">Prefer to call?</h5>
                                    <p className="mb-2">
                                        <FaPhone className="me-2 text-warning" />
                                        <strong>Phone:</strong> +92 334-9549280, +92 333-5040799
                                    </p>
                                    <p className="mb-0">
                                        <strong>Working Hours:</strong> Monday - Saturday: 9:00 AM - 9:00 PM
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Appointment;
