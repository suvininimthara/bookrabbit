import { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../network/users_api';
import { User } from '../models/userModel';

const useUserProfile = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } catch (err) {
        setError("Failed to fetch user profile.");
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpdate = async (updatedUserData: Partial<User>) => {
    try {
      const updatedUser = await updateUser(userId, updatedUserData);
      setUser(updatedUser);
    } catch (err) {
      setError("Failed to update user profile.");
    }
  };

  return { user, error, handleUpdate };
};

export default useUserProfile;