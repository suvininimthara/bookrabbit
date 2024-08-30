import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { User } from '../../models/userModel';
import * as UsersApi from '../../network/users_api';
import ProfileModal from '../../components/ProfileModal'; // Adjust the import path as needed
import './ProfilePage.css';


const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User>({} as User);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await UsersApi.getUserProfile();
                console.log('User profile:', response);
                setUser(response);
            } catch (error) {
                console.error(error);
                alert('Failed to load user profile.');
            }
        }

        fetchUser();
    }, []);

    const handleEditProfile = (updatedUser: User) => {
        setUser(updatedUser);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <Container className="profile-container">
            <div className="button-group">
                <Button onClick={handleShowModal} variant="outline-primary" className="custom-button">Edit Profile</Button>
                <Button variant="outline-success" className="custom-button">Wishlist</Button>
                <Button variant="outline-info" className="custom-button" onClick={() => navigate('/add-book')}>Add Book</Button>
                <Button variant="outline-warning" className="custom-button" onClick={() => navigate('/add-blog')}>Add Blog</Button>
            </div>
            
            <section className="profile-section">
                {user && (
                    <Card className="profile-card">
                        <Card.Body>
                        <div className="title">
                          <h3 className= "text-center">User Profile</h3> </div>
                            <Card.Text>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={`${user.firstName || ''} ${user.lastName || ''}`} 
                                            readOnly
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mt-3">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={user.phoneNumber || ''} 
                                            readOnly
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mt-3">
                                        <Form.Label>Birth Day</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={user.birthday || ''} 
                                            readOnly
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mt-3">
                                        <Form.Label>Personal address</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={user.address || ''} 
                                            readOnly
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mt-3">
                                        <Form.Label>Favorite book</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={user.favoriteBook || ''} 
                                            readOnly
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mt-3">
                                        <Form.Label>Favorite genres</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={(user.favoriteGenres || []).join(', ')} 
                                            readOnly
                                        />
                                    </Form.Group>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}
            </section>

            <ProfileModal
                user={user}
                show={showModal}
                onHide={handleCloseModal}
                onSave={handleEditProfile}
            />
        </Container>
    );
};

export default ProfilePage;
