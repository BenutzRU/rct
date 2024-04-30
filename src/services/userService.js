import axios from 'axios';

export async function updateUser(userData) {
  try {
    const response = await axios.put('/api/users', userData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null; // Возврат null в случае ошибки
  }
}

export async function loginUser(username, password) {
  try {
    const response = await axios.post('http://localhost:3001/login', {username, password})
    return response.data
  } catch (e) {
    console.error(e)
    return null;
  }
}


export async function registerUser(username, email, password) {
  try {
    const response = await axios.post('http://localhost:3001/register', {username, password, email})
    return response.data
  } catch (e) {
    console.error(e)
    return null;
  }
}