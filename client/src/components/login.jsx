import React, { useState } from 'react';
import axios from 'axios';
import "../css/login.css"


const RegisterPage = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhone_number] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      fullname: fullname,
      email: email,
      password: password,
      phone_number: phone_number,
    };

    try {
      const response = await axios.post("http://localhost:5000/register ", data);

      if (response.status === 201) {
        alert('Successfully created user!');
      } else {
        alert('An error occurred.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Fullname"
          value={fullname}
          onChange={(event) => setFullname(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="text"
          placeholder="Phone number"
          value={phone_number}
          onChange={(event) => setPhone_number(event.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
