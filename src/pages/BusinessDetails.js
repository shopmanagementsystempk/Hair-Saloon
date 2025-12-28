import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaBuilding, FaGlobe, FaCheckCircle } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './BusinessDetails.css';

const BusinessDetails = () => {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState({
        name: 'SIGMA HAIR DRESSERS',
        type: 'Barber Shop / Hair Salon',
        industry: 'Personal Care & Grooming Services',
        established: '2019',
        status: 'Active & Operating',
        owners: 'Abdul Razaq & Raja Ahsan Haider',
        role: 'Owners & Professional Barbers',
        income: 'PKR 1,000,000+',
        country: 'Pakistan',
        province: 'Punjab',
        city: 'Lahore',
        area: 'Main Market Area',
        address: 'Shop No. 15, Main Boulevard, Lahore, Punjab, Pakistan',
        phone: '+92 300 1234567',
        whatsapp: '+92 300 1234567',
        email: 'info@sigmahairdressers.com',
        businessEmail: 'business@sigmahairdressers.com',
        website: 'www.sigmahairdressers.com',
        hoursMonFri: '9:00 AM - 9:00 PM',
        hoursSat: '9:00 AM - 10:00 PM',
        hoursSun: '10:00 AM - 8:00 PM',
        hoursHolidays: '10:00 AM - 6:00 PM',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.176!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890'
    });

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

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    }

    return (
        <div className="business-details-page">
            {/* Page Header */}
            <section className="page-header">
                <Container>
                    <h1 className="page-title">Business Details</h1>
                    <p className="page-subtitle">Official Information & Verification</p>
                </Container>
            </section>

            {/* Official Statement */}
            <section className="official-statement py-5">
                <Container>
                    <Card className="statement-card">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <FaCheckCircle className="verification-icon" />
                                <h2 className="statement-title">Official Business Statement</h2>
                            </div>
                            <p className="statement-text">
                                <strong>{info.name}</strong> is a registered and operating barber shop providing
                                professional grooming services in {info.country}. We are a legitimate business establishment with
                                proper registration and compliance with all local business regulations.
                            </p>
                            <p className="statement-text">
                                Our business has been operational since {info.established}, serving the community with high-quality
                                barbering and grooming services. We maintain professional standards that meet international
                                expectations and operate with complete transparency and integrity.
                            </p>
                            <p className="statement-text mb-0">
                                This website serves as official documentation of our business operations and can be used
                                for verification purposes by employers, embassies, or other official entities.
                            </p>
                        </Card.Body>
                    </Card>
                </Container>
            </section>

            {/* Business Information */}
            <section className="business-info py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <div className="section-label">Official Information</div>
                        <h2 className="section-title">Complete Business Details</h2>
                    </div>

                    <Row>
                        <Col lg={6} className="mb-4">
                            <Card className="detail-card h-100">
                                <Card.Body>
                                    <h4 className="detail-heading">
                                        <FaBuilding className="me-3" />
                                        Business Information
                                    </h4>
                                    <Table className="detail-table" borderless>
                                        <tbody>
                                            <tr>
                                                <td className="label-col">Business Name:</td>
                                                <td className="value-col">{info.name}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Business Type:</td>
                                                <td className="value-col">{info.type}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Industry:</td>
                                                <td className="value-col">{info.industry}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Established:</td>
                                                <td className="value-col">{info.established}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Status:</td>
                                                <td className="value-col">
                                                    <span className="status-badge">{info.status}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Owners:</td>
                                                <td className="value-col">{info.owners}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Owner Role:</td>
                                                <td className="value-col">{info.role}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Monthly Income:</td>
                                                <td className="value-col">{info.income}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6} className="mb-4">
                            <Card className="detail-card h-100">
                                <Card.Body>
                                    <h4 className="detail-heading">
                                        <FaMapMarkerAlt className="me-3" />
                                        Location Information
                                    </h4>
                                    <Table className="detail-table" borderless>
                                        <tbody>
                                            <tr>
                                                <td className="label-col">Country:</td>
                                                <td className="value-col">{info.country}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Province:</td>
                                                <td className="value-col">{info.province}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">City:</td>
                                                <td className="value-col">{info.city}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Area:</td>
                                                <td className="value-col">{info.area}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Address:</td>
                                                <td className="value-col">{info.address}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6} className="mb-4">
                            <Card className="detail-card h-100">
                                <Card.Body>
                                    <h4 className="detail-heading">
                                        <FaPhone className="me-3" />
                                        Contact Information
                                    </h4>
                                    <Table className="detail-table" borderless>
                                        <tbody>
                                            <tr>
                                                <td className="label-col">Phone:</td>
                                                <td className="value-col">{info.phone}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">WhatsApp:</td>
                                                <td className="value-col">{info.whatsapp}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Email:</td>
                                                <td className="value-col">{info.email}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Business Email:</td>
                                                <td className="value-col">{info.businessEmail}</td>
                                            </tr>
                                            {/* <tr>
                                                <td className="label-col">Website:</td>
                                                <td className="value-col">{info.website}</td>
                                            </tr> */}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={6} className="mb-4">
                            <Card className="detail-card h-100">
                                <Card.Body>
                                    <h4 className="detail-heading">
                                        <FaClock className="me-3" />
                                        Working Hours
                                    </h4>
                                    <Table className="detail-table" borderless>
                                        <tbody>
                                            <tr>
                                                <td className="label-col">Monday - Friday:</td>
                                                <td className="value-col">{info.hoursMonFri}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Saturday:</td>
                                                <td className="value-col">{info.hoursSat}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Sunday:</td>
                                                <td className="value-col">{info.hoursSun}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Public Holidays:</td>
                                                <td className="value-col">{info.hoursHolidays}</td>
                                            </tr>
                                            <tr>
                                                <td className="label-col">Appointment:</td>
                                                <td className="value-col">
                                                    <span className="status-badge">Available</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Map Section */}
            <section className="map-section py-5">
                <Container>
                    <div className="text-center mb-4">
                        <div className="section-label">Find Us</div>
                        <h2 className="section-title">Our Location</h2>
                        <p className="section-description">
                            Visit us at our physical location in {info.city}, {info.country}
                        </p>
                    </div>

                    <Card className="map-card">
                        <Card.Body className="p-0">
                            <div className="map-container">
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
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </section>

            {/* Verification Notice */}
            <section className="verification-notice py-5 bg-dark text-white">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={2} className="text-center mb-3 mb-lg-0">
                            <FaGlobe className="notice-icon" />
                        </Col>
                        <Col lg={10}>
                            <h3 className="notice-title">For Verification Purposes</h3>
                            <p className="notice-text mb-0">
                                This business information is provided for official verification purposes.
                                Employers, embassies, or other official entities may contact us directly using
                                the information provided above to verify the authenticity and operational status
                                of {info.name}. We are committed to transparency and will respond promptly
                                to all verification requests.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default BusinessDetails;
