import React, { useState, useEffect } from 'react';
import { User } from '../models/userModel';
import 'modalStyles.css';


interface EditProfilePageFormProps {
    user: User | null;
    show: boolean;
    onHide: () => void;
    onSave: (updatedUser: User) => void;
}

const EditProfilePageForm: React.FC<EditProfilePageFormProps> = ({ user, show, onHide, onSave }) => {
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
        const updatedUser: User = {
            ...user!,
            firstName: profile.firstname,
            lastName: profile.lastname,
            email: profile.email,
            phoneNumber: profile.phone,
            address: profile.address,
            favoriteBook: profile.favoriteBook,
            favoriteGenres: profile.favoriteGenres.split(', ').map(g => g.trim())
        };

        try {
            await fetch(`/api/users/${user!._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });
            onSave(updatedUser);
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className={`edit-profile-page-form ${show ? 'show' : 'hide'}`}>
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
                <div className="d-grid gap-2 d-md-block">
                <button type="submit" >Save Changes</button>
                <button type="button" onClick={onHide} >Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfilePageForm;
