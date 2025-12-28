import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Tabs, Tab, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs, query, orderBy, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaCalendarAlt, FaUsers, FaImages, FaStar, FaSignOutAlt, FaEnvelope, FaBuilding, FaMapMarkerAlt, FaPhone, FaClock, FaSave } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Business Details State
    const [businessInfo, setBusinessInfo] = useState({
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
        experience: '5+',
        happyCustomers: '5000+',
        hoursMonFri: '9:00 AM - 9:00 PM',
        hoursSat: '9:00 AM - 10:00 PM',
        hoursSun: '10:00 AM - 8:00 PM',
        hoursHolidays: '10:00 AM - 6:00 PM',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.176!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890',
        // Owner Details
        ownersSectionTitle: 'Professional Barber & Business Owners',
        owner1Name: 'Abdul Razaq',
        owner1Title: 'Owner & Professional Barber',
        owner1Experience: '5+ Years of Professional Experience',
        owner1Bio: "As the owner and lead barber of SIGMA HAIR DRESSERS, I bring over 5 years of professional experience in men's grooming and styling. I am committed to providing the highest quality services to every customer who walks through our doors.",
        owner1Image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
        owner2Name: 'Raja Ahsan Haider',
        owner2Title: 'Partner & Business Owner',
        owner2Experience: '5+ Years of Professional Business Management',
        owner2Bio: 'As the owner at SIGMA HAIR DRESSERS, I focus on operational excellence and customer satisfaction. Our goal is to maintain the highest standards of professional grooming services in Pakistan and ensure every client receives premium care.',
        owner2Bio2: 'We work together to ensure that our business remains a trusted name in the industry, providing legitimate and high-quality services to our valued community.',
        owner2Image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop'
    });

    useEffect(() => {
        if (!currentUser) {
            navigate('/admin/login');
            return;
        }
        fetchData();
        fetchBusinessInfo();
    }, [currentUser, navigate]);

    const fetchData = async () => {
        try {
            const appointmentsQuery = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
            const appointmentsSnapshot = await getDocs(appointmentsQuery);
            setAppointments(appointmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            const contactsQuery = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
            const contactsSnapshot = await getDocs(contactsQuery);
            setContacts(contactsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBusinessInfo = async () => {
        try {
            const infoDoc = await getDoc(doc(db, 'settings', 'businessInfo'));
            if (infoDoc.exists()) {
                setBusinessInfo(infoDoc.data());
            }
        } catch (error) {
            console.error('Error fetching business info:', error);
        }
    };

    const handleBusinessInfoChange = (e) => {
        const { name, value } = e.target;
        setBusinessInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleBusinessInfoSubmit = async (e) => {
        e.preventDefault();
        setSaveLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await setDoc(doc(db, 'settings', 'businessInfo'), businessInfo);
            setMessage({ type: 'success', text: 'Business details updated successfully!' });
        } catch (error) {
            console.error('Error updating business info:', error);
            setMessage({ type: 'danger', text: 'Error updating business details. Please try again.' });
        } finally {
            setSaveLoading(false);
            window.scrollTo(0, 0);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <Container>
                    <Row className="align-items-center">
                        <Col>
                            <h2 className="admin-title">Admin Dashboard</h2>
                            <p className="admin-subtitle">SIGMA HAIR DRESSERS Management Panel</p>
                        </Col>
                        <Col xs="auto">
                            <Button variant="outline-light" onClick={handleLogout}>
                                <FaSignOutAlt className="me-2" />
                                Logout
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="py-5">
                {message.text && (
                    <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
                        {message.text}
                    </Alert>
                )}

                <Row className="mb-4">
                    <Col lg={3} md={6} className="mb-4">
                        <Card className="stat-card">
                            <Card.Body>
                                <div className="stat-icon">
                                    <FaCalendarAlt />
                                </div>
                                <h3 className="stat-number">{appointments.length}</h3>
                                <p className="stat-label">Total Appointments</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={3} md={6} className="mb-4">
                        <Card className="stat-card">
                            <Card.Body>
                                <div className="stat-icon">
                                    <FaEnvelope />
                                </div>
                                <h3 className="stat-number">{contacts.length}</h3>
                                <p className="stat-label">Contact Messages</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={3} md={6} className="mb-4">
                        <Card className="stat-card">
                            <Card.Body>
                                <div className="stat-icon">
                                    <FaUsers />
                                </div>
                                <h3 className="stat-number">5000+</h3>
                                <p className="stat-label">Happy Customers</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={3} md={6} className="mb-4">
                        <Card className="stat-card">
                            <Card.Body>
                                <div className="stat-icon">
                                    <FaStar />
                                </div>
                                <h3 className="stat-number">5.0</h3>
                                <p className="stat-label">Average Rating</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Card className="data-card">
                    <Card.Body>
                        <Tabs defaultActiveKey="appointments" className="mb-4">
                            <Tab eventKey="appointments" title={`Appointments (${appointments.length})`}>
                                {loading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-warning" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : appointments.length > 0 ? (
                                    <div className="table-responsive">
                                        <Table hover>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Service</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {appointments.map((appointment) => (
                                                    <tr key={appointment.id}>
                                                        <td>{appointment.name}</td>
                                                        <td>{appointment.phone}</td>
                                                        <td>{appointment.service}</td>
                                                        <td>{appointment.date}</td>
                                                        <td>{appointment.time}</td>
                                                        <td>
                                                            <Badge bg="warning" text="dark">
                                                                {appointment.status || 'Pending'}
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                ) : (
                                    <p className="text-center text-muted py-5">No appointments yet</p>
                                )}
                            </Tab>

                            <Tab eventKey="contacts" title={`Contact Messages (${contacts.length})`}>
                                {loading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-warning" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : contacts.length > 0 ? (
                                    <div className="table-responsive">
                                        <Table hover>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Subject</th>
                                                    <th>Message</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contacts.map((contact) => (
                                                    <tr key={contact.id}>
                                                        <td>{contact.name}</td>
                                                        <td>{contact.email}</td>
                                                        <td>{contact.phone}</td>
                                                        <td>{contact.subject}</td>
                                                        <td>{contact.message.substring(0, 50)}...</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                ) : (
                                    <p className="text-center text-muted py-5">No contact messages yet</p>
                                )}
                            </Tab>

                            <Tab eventKey="business-info" title="Business Info">
                                <Form onSubmit={handleBusinessInfoSubmit} className="p-3">
                                    <h5 className="mb-4"><FaBuilding className="me-2" /> Basic Information</h5>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Business Name</Form.Label>
                                                <Form.Control name="name" value={businessInfo.name} onChange={handleBusinessInfoChange} required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Business Type</Form.Label>
                                                <Form.Control name="type" value={businessInfo.type} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Industry</Form.Label>
                                                <Form.Control name="industry" value={businessInfo.industry} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Established Year</Form.Label>
                                                <Form.Control name="established" value={businessInfo.established} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control name="status" value={businessInfo.status} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Owners</Form.Label>
                                                <Form.Control name="owners" value={businessInfo.owners} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Owner Role</Form.Label>
                                                <Form.Control name="role" value={businessInfo.role} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Monthly Income</Form.Label>
                                                <Form.Control name="income" value={businessInfo.income} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Experience (Years)</Form.Label>
                                                <Form.Control name="experience" value={businessInfo.experience} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Happy Customers</Form.Label>
                                                <Form.Control name="happyCustomers" value={businessInfo.happyCustomers} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <h5 className="mt-4 mb-4"><FaMapMarkerAlt className="me-2" /> Location</h5>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control name="country" value={businessInfo.country} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Province</Form.Label>
                                                <Form.Control name="province" value={businessInfo.province} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control name="city" value={businessInfo.city} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Full Address</Form.Label>
                                                <Form.Control name="address" value={businessInfo.address} onChange={handleBusinessInfoChange} as="textarea" rows={2} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <h5 className="mt-4 mb-4"><FaPhone className="me-2" /> Contact Information</h5>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control name="phone" value={businessInfo.phone} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>WhatsApp</Form.Label>
                                                <Form.Control name="whatsapp" value={businessInfo.whatsapp} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Website</Form.Label>
                                                <Form.Control name="website" value={businessInfo.website} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control name="email" value={businessInfo.email} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Business Email</Form.Label>
                                                <Form.Control name="businessEmail" value={businessInfo.businessEmail} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <h5 className="mt-4 mb-4"><FaClock className="me-2" /> Working Hours</h5>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Mon - Fri</Form.Label>
                                                <Form.Control name="hoursMonFri" value={businessInfo.hoursMonFri} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Saturday</Form.Label>
                                                <Form.Control name="hoursSat" value={businessInfo.hoursSat} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Sunday</Form.Label>
                                                <Form.Control name="hoursSun" value={businessInfo.hoursSun} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Holidays</Form.Label>
                                                <Form.Control name="hoursHolidays" value={businessInfo.hoursHolidays} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <h5 className="mt-4 mb-4"><FaUsers className="me-2" /> Owners Information</h5>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Owners Section Title</Form.Label>
                                                <Form.Control name="ownersSectionTitle" value={businessInfo.ownersSectionTitle} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12} className="mt-3">
                                            <h6>Owner 1 Details</h6>
                                            <hr />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control name="owner1Name" value={businessInfo.owner1Name} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control name="owner1Title" value={businessInfo.owner1Title} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Experience Label</Form.Label>
                                                <Form.Control name="owner1Experience" value={businessInfo.owner1Experience} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Bio</Form.Label>
                                                <Form.Control name="owner1Bio" value={businessInfo.owner1Bio} onChange={handleBusinessInfoChange} as="textarea" rows={3} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Image URL</Form.Label>
                                                <Form.Control name="owner1Image" value={businessInfo.owner1Image} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>

                                        <Col md={12} className="mt-3">
                                            <h6>Owner 2 Details</h6>
                                            <hr />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control name="owner2Name" value={businessInfo.owner2Name} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control name="owner2Title" value={businessInfo.owner2Title} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Experience Label</Form.Label>
                                                <Form.Control name="owner2Experience" value={businessInfo.owner2Experience} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Bio Paragraph 1</Form.Label>
                                                <Form.Control name="owner2Bio" value={businessInfo.owner2Bio} onChange={handleBusinessInfoChange} as="textarea" rows={3} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Bio Paragraph 2</Form.Label>
                                                <Form.Control name="owner2Bio2" value={businessInfo.owner2Bio2} onChange={handleBusinessInfoChange} as="textarea" rows={3} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Image URL</Form.Label>
                                                <Form.Control name="owner2Image" value={businessInfo.owner2Image} onChange={handleBusinessInfoChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <h5 className="mt-4 mb-4"><FaMapMarkerAlt className="me-2" /> Map Integration</h5>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Google Maps Embed URL (iframe src)</Form.Label>
                                                <Form.Control name="mapUrl" value={businessInfo.mapUrl} onChange={handleBusinessInfoChange} as="textarea" rows={3} />
                                                <Form.Text className="text-muted">
                                                    Paste the 'src' value from the Google Maps embed code.
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="text-end mt-4">
                                        <Button type="submit" variant="warning" size="lg" disabled={saveLoading}>
                                            {saveLoading ? 'Saving...' : <><FaSave className="me-2" /> Save Business Details</>}
                                        </Button>
                                    </div>
                                </Form>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>

                <Card className="info-card mt-4">
                    <Card.Body className="p-4">
                        <h5>Admin Panel Features</h5>
                        <p className="mb-2">✓ View and manage appointment bookings</p>
                        <p className="mb-2">✓ Read customer contact messages</p>
                        <p className="mb-2">✓ Edit business information and website content</p>
                        <p className="mb-0">
                            <small className="text-muted">
                                Changes made to Business Info will reflect immediately across the website including the Business Details and About pages.
                            </small>
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default AdminDashboard;
