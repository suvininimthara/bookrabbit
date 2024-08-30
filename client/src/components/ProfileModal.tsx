import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { User } from '../models/userModel';
import * as UsersApi from '../network/users_api';
import './modalStyles.css'; 

interface ProfileModalProps {
    user: User;
    show: boolean;
    onHide: () => void;
    onSave: (updatedUser: User) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, show, onHide, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        birthday: user.birthday || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        favoriteBook: user.favoriteBook || '',
        favoriteGenres: user.favoriteGenres?.join(', ') || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const updatedUser = {
                ...user,
                ...formData,
                favoriteGenres: formData.favoriteGenres.split(',').map(genre => genre.trim())
            };
            await UsersApi.updateUserProfile(user._id, updatedUser);
            onSave(updatedUser);
            onHide();
        } catch (error) {
            console.error(error);
            alert('Failed to update profile.');
        }
    };

    return (
        <div className='profile'>
        <Modal show={show} onHide={onHide} centered >
        <Modal.Body>
        <h6 className='h4'>Edit Profile</h6>
                <Form>
                    <Form.Group controlId="formFirstName" > 
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName" className="mt-2">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirthday" className="mt-2">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber" className="mt-2">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress" className="mt-2">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFavoriteBook" className="mt-2">
                        <Form.Label>Favorite Book</Form.Label>
                        <Form.Control
                            type="text"
                            name="favoriteBook"
                            value={formData.favoriteBook}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFavoriteGenres" className="mt-2">
                        <Form.Label>Favorite Genres</Form.Label>
                        <Form.Control
                            type="text"
                            name="favoriteGenres"
                            value={formData.favoriteGenres}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
};

export default ProfileModal;
