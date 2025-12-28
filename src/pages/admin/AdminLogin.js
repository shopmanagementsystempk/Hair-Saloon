import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaLock, FaUser } from 'react-icons/fa';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <Container>
                <Row className="justify-content-center align-items-center min-vh-100">
                    <Col lg={5} md={7}>
                        <Card className="login-card">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <div className="login-icon-wrapper">
                                        <FaLock />
                                    </div>
                                    <h2 className="login-title">Admin Login</h2>
                                    <p className="login-subtitle">SIGMA HAIR DRESSERS</p>
                                </div>

                                {error && (
                                    <Alert variant="danger">{error}</Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <FaUser className="me-2" />
                                            Email Address
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="admin@sigmahairdressers.com"
                                            required
                                            className="custom-input"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>
                                            <FaLock className="me-2" />
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                            className="custom-input"
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        variant="warning"
                                        size="lg"
                                        className="w-100 login-btn"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Logging in...
                                            </>
                                        ) : (
                                            'Login to Admin Panel'
                                        )}
                                    </Button>
                                </Form>

                                <div className="text-center mt-4">
                                    <small className="text-muted">
                                        Protected admin area. Authorized access only.
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminLogin;
