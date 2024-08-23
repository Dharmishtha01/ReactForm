
import React from 'react'
import { useNavigate } from 'react-router-dom';
function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome to the Dashboard page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard
