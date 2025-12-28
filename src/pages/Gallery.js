import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Gallery.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Default gallery images
    const defaultImages = [
        { id: 1, url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=600&fit=crop', title: 'Shop Interior' },
        { id: 2, url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=600&fit=crop', title: 'Professional Service' },
        { id: 3, url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=600&fit=crop', title: 'Modern Equipment' },
        { id: 4, url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=600&fit=crop', title: 'Haircut Service' },
        { id: 5, url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=600&fit=crop', title: 'Beard Styling' },
        { id: 6, url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=600&fit=crop', title: 'Professional Tools' },
        { id: 7, url: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=600&h=600&fit=crop', title: 'Customer Service' },
        { id: 8, url: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600&h=600&fit=crop', title: 'Grooming Products' },
        { id: 9, url: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&h=600&fit=crop', title: 'Styling Session' }
    ];

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const galleryCollection = collection(db, 'gallery');
            const gallerySnapshot = await getDocs(galleryCollection);
            const galleryList = gallerySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            if (galleryList.length > 0) {
                setImages(galleryList);
            } else {
                setImages(defaultImages);
            }
        } catch (error) {
            console.log('Using default gallery');
            setImages(defaultImages);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="gallery-page">
            <section className="page-header">
                <Container>
                    <h1 className="page-title">Our Gallery</h1>
                    <p className="page-subtitle">Explore Our Work & Workspace</p>
                </Container>
            </section>

            <section className="gallery-section py-5">
                <Container>
                    <div className="text-center mb-5">
                        <div className="section-label">Visual Showcase</div>
                        <h2 className="section-title">Professional Barber Shop Gallery</h2>
                        <p className="section-description mx-auto" style={{ maxWidth: '700px' }}>
                            Take a look at our professional barber shop, our work, and the quality services we provide to our customers.
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
                            {images.map((image) => (
                                <Col lg={4} md={6} className="mb-4" key={image.id}>
                                    <Card className="gallery-card">
                                        <div className="gallery-image-wrapper">
                                            <img src={image.url} alt={image.title} className="gallery-image" />
                                            <div className="gallery-overlay">
                                                <h5>{image.title}</h5>
                                            </div>
                                        </div>
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

export default Gallery;
