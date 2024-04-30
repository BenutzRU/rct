// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client'); // Импорт Prisma Client

const prisma = new PrismaClient(); // Создание экземпляра Prisma Client

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Регистрация пользователя
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      }
    });
    
    res.json({ message: 'Пользователь зарегистрирован успешно' });
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    res.status(500).json({ error: 'Произошла ошибка при регистрации пользователя' });
  }
});

// Вход пользователя
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username }
    });
    if (!user) {
      return res.status(401).json({ error: 'Пользователь не найден' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Неправильный пароль' });
    }
    const token = jwt.sign({ userId: user.id }, 'sdjfwojfwqf123sada', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Ошибка при входе пользователя:', error);
    res.status(500).json({ error: 'Произошла ошибка при входе пользователя' });
  }
});



app.put('/account/user', async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.body.id },
      data: req.body
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Ошибка при обновлении данных пользователя:', error);
    res.status(500).json({ error: 'Произошла ошибка при обновлении данных пользователя' });
  }
});

app.get('/account/user', async (req, res) => { // Изменено на '/account/user' в соответствии с вашим клиентским кодом
  try {
    // Получение данных пользователя
    const user = await prisma.user.findUnique({
      where: { id: req.query.id } // Параметр id передается через query
    });

    // Проверка наличия пользователя
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    // Возвращаем данные пользователя
    res.json(user);
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении данных пользователя' });
  }
});


app.listen(3001, () => {
  console.log('Сервер запущен на порту 3001');
});
