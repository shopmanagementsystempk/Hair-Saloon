import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultTestimonials = [
        {
            id: 1,
            name: 'Ahmed Khan',
            rating: 5,
            comment: 'Excellent service! The barbers are highly skilled and professional. I have been coming here for over 2 years and always leave satisfied.',
            date: '2024-12-15'
        },
        {
            id: 2,
            name: 'Muhammad Ali',
            rating: 5,
            comment: 'Best barber shop in the area. Clean environment, friendly staff, and great haircuts. Highly recommended!',
            date: '2024-12-10'
        },
        {
            id: 3,
            name: 'Hassan Raza',
            rating: 5,
            comment: 'Professional service at reasonable prices. The owner is very experienced and knows his craft well.',
            date: '2024-12-05'
        },
        {
            id: 4,
            name: 'Bilal Ahmed',
            rating: 5,
            comment: 'Great experience every time. They really care about customer satisfaction and deliver quality work.',
            date: '2024-11-28'
        },
        {
            id: 5,
            name: 'Usman Tariq',
            rating: 5,
            comment: 'Very professional and skilled barbers. The shop is well-maintained and hygienic. Will definitely come back!',
            date: '2024-11-20'
        },
        {
            id: 6,
            name: 'Faisal Mahmood',
            rating: 5,
            comment: 'Outstanding service! They take time to understand what you want and deliver exactly that. Highly professional.',
            date: '2024-11-15'
        }
    ];

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const testimonialsCollection = collection(db, 'testimonials');
            const testimonialsSnapshot = await getDocs(testimonialsCollection);
            const testimonialsList = testimonialsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (testimonialsList.length > 0) {
                setTestimonials(testimonialsList);
            } else {
                setTestimonials(defaultTestimonials);
            }
        } catch (error) {
            console.log('Using default testimonials');
            setTestimonials(defaultTestimonials);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={index < rating ? 'star-filled' : 'star-empty'}
            />
        ));
    };

    return (
        <div className="testimonials-page">
            <section className="page-header">
                <Container>
                    <h1 className="page-title">Customer Testimonials</h1>
                    <p className="page-subtitle">What Our Customers Say About Us</p>
                </Container>
            </section>

            <section className="testimonials-section py-5">
                <Container>
                    <div className="text-center mb-5">
                        <div className="section-label">Reviews</div>
                        <h2 className="section-title">Trusted by Our Customers</h2>
                        <p className="section-description mx-auto" style={{ maxWidth: '700px' }}>
                            Read what our satisfied customers have to say about their experience at SIGMA HAIR EXPERTS.
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
                            {testimonials.map((testimonial) => (
                                <Col lg={4} md={6} className="mb-4" key={testimonial.id}>
                                    <Card className="testimonial-card h-100">
                                        <Card.Body>
                                            <FaQuoteLeft className="quote-icon" />
                                            <div className="rating mb-3">
                                                {renderStars(testimonial.rating)}
                                            </div>
                                            <p className="testimonial-text">"{testimonial.comment}"</p>
                                            <div className="testimonial-author">
                                                <h5 className="author-name">{testimonial.name}</h5>
                                                <p className="author-date">{new Date(testimonial.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            </section>
        </div>
    );
};

export default Testimonials;
