import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function App() {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });

    };

    const validate = () => {
        let tempErrors = {};

        if (!form.email.trim()) tempErrors.email = "Email is required."
        else if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = "Email is invalid."

        const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!form.password) tempErrors.password = "password is required."
        else if (!strongPasswordPattern.test(form.password)) {
            tempErrors.password = "password should be 8 character ,include uppercase, lowercase, number & special character.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = savedUsers.find(user => user.email === form.email && user.password === form.password);

            if (user) {
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard');
            } else {
                alert("Invalid email or password");
            }
        }
    };
    const handleReset = () => {
        setForm({ email: '', password: '' });
        setErrors({});
    };

    return (
        <div className="App">

            <div className="header">
                <h1>Login form</h1>
            </div>
            <form onSubmit={handleSubmit} className="form">

                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
                <div>
                    <button type="submit" >
                        submit
                    </button>
                    <button type="button" onClick={handleReset} className="reset">
                        Reset Fields
                    </button>
                </div>
            </form>

        </div>
    );
}

export default App;