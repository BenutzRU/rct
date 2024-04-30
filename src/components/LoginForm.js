import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from '../services/userService'


export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();

        if (username && password) {
          loginUser(username, password)
                .then((response) => {
                    navigate("/")
                    window.location.reload()
                })
                .catch((error) => {
                    console.log("Ошибка", error);
                    alert("Неверный пароль или логин")
                });
        }
    }

    return (
        <div className="">
            <div className="">
                <h1 className="">Войти в аккаунт</h1>
                <form className="" onSubmit={handleLogin}>
                    <label className="" htmlFor="username">Username</label>
                    <input
                        id="username"
                        className=""
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="" htmlFor="password">Password</label>
                    <input
                        id="password"
                        className=""
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="">Войти</button>
                    <div className="">
                        <div className="">
                            <div className="">
                                <input id="remember" type="checkbox" value="" className="" />
                            </div>
                            <label htmlFor="remember" className="">Запомнить</label>
                        </div>
                        <button className="">Забыли пароль?</button>
                    </div>
                    <div className="">
                        Нет аккаунта? <Link to="/register" ><button className="">Создать аккаунт</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
