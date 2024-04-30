import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/account/user', {
          params: {
            id: '1'
          }
});

        const userData = response.data;
        setUser(userData);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const updateUser = async (userData) => {
    try {
      const response = await axios.put('/account/user', userData); // Изменено на ваш роутер
      const updatedUser = response.data;
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      setError(error);
      console.error(error);
      return null;
    }
  };

  return { user, error, updateUser };
};
