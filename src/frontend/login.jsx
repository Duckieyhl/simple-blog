import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [creds, setCreds] = useState({ username: '', password: '' });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("https://qshsfj-8080.csb.app/api/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(creds),
            });

            if (response.ok) {
                // Nếu đăng nhập thành công, gọi hàm onLogin để lưu thông tin user vào App.js
                if (onLogin) onLogin({ username: creds.username });

                // SỬA LỖI: Thay dấu ngoặc lạ ở '/stats’ thành '/stats'
                navigate('/stats');
            } else {
                setError("Invalid username or password!");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed! Please check your connection.");
        }
    };

    return (
        <div style={{ padding: 10 }}>
            <br />
            <span>Username:</span><br />
            <input
                type="text"
                onChange={(e) => setCreds({ ...creds, username: e.target.value })}
            /><br />

            <span>Password:</span><br />
            <input
                type="password"
                onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            /><br /><br />

            <button onClick={handleLogin}>Login</button>

            {/* Hiển thị lỗi màu đỏ cho dễ nhìn */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;