import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [items, setItems] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate()
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(items));
  }, [items]);

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
    if (!form.name.trim()) tempErrors.name = "Name is required."

    if (!form.contact.trim()) tempErrors.contact = "Contact number is required"
    else if (!/^\d{10}$/.test(form.contact)) tempErrors.contact = "Allowes 10 digits and number's only"

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
      setItems([...items, form]);
      handleReset()
      alert("Regisetr successfully")
      setTimeout(()=>navigate('/login'),500 )
    }
  };

  const handleReset = () => {
    setForm({ name: '', contact: '', email: '', password: '' });
    setErrors({});
  };

  return (
    <div className="App">

      <div className="header">
        <h1>Register form</h1>
        
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
        />
        {errors.contact && <p className="error">{errors.contact}</p>}
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