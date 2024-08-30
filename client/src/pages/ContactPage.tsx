import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './ContactPage.css'; // Create a CSS file for custom styling

const ContactPage: React.FC = () => {
    return (
        <Container className="contact-container">
            <h1 className="contact-header">Contact Us</h1>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>

                        <Form.Group controlId="formSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" placeholder="Enter subject" />
                        </Form.Group>

                        <Form.Group controlId="formMessage">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={5} placeholder="Enter your message" />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactPage;
