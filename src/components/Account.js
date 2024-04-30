import React, { useState } from 'react';
import { useUser } from '../hooks/useUser'; // Import useUser from hooks folder
import { userService } from '../services/userService'; // Import userService from services folder


function Account() {
  const { user, updateUser } = useUser(); // Получите данные пользователя и функцию обновления
  const [userData, setUserData] = useState(user); // Храните данные пользователя в локальном состоянии

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateUser(userData); // Отправьте обновленные данные на сервер
    alert('Данные пользователя обновлены'); // Добавьте уведомление об успехе
  };

  return (
    <div>
      <h2>Личный кабинет</h2>
      <form onSubmit={handleSubmit}>
        <label>Имя:</label>
        <input type="text" name="name" value={userData.name} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}

export default Account;
