import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProfilePage.css';

const EditProfile = () => {
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
        // Fetch user profile data from API
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/user/profile'); // Replace with your API endpoint
                setProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put('/api/user/profile', profile); // Replace with your API endpoint
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
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
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

export default EditProfile;
