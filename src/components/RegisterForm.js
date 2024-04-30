import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // Добавляем проверку на длину пароля и другие условия при регистрации
        if (username && email && password.length >= 6) {
            registerUser(username, email, password)
                .then((response) => {
                    navigate("/login");
                })
                .catch((error) => {
                    console.error("Ошибка при регистрации:", error);
                    // Выводим сообщение об ошибке пользователю
                    alert("Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.");
                });
        } else {
            // Выводим сообщение об ошибке пользователю, если не все данные заполнены или пароль слишком короткий
            alert("Пожалуйста, заполните все поля и убедитесь, что длина пароля составляет не менее 6 символов.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-sm p-4 bg-white border border-black rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-black">
                <h1 className="text-white text-2xl mb-7 font-bold mb-4">Регистрация</h1>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="username">Username</label>
                    <input
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        type="text"
                        placeholder="email@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}
