import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../../models/userModel';
import '../../components/AddBook.css';

interface EditProfilePageProps {
    user: User;
    onSave: (updatedUser: User) => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, onSave }) => {
    const [profile, setProfile] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        favoriteBook: '',
        favoriteGenres: ''
    });

    useEffect(() => {
        if (user) {
            setProfile({
                firstname: user.firstName || '',
                lastname: user.lastName || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
                address: user.address || '',
                favoriteBook: user.favoriteBook || '',
                favoriteGenres: user.favoriteGenres?.join(', ') ?? ''
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/users/${user._id}`, profile);
            onSave(response.data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="edit-profile-page">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={profile.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={profile.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Favorite Book:</label>
                    <input
                        type="text"
                        name="favoriteBook"
                        value={profile.favoriteBook}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Favorite Genres:</label>
                    <input
                        type="text"
                        name="favoriteGenres"
                        value={profile.favoriteGenres}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfilePage;
