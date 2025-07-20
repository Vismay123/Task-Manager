import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setMessage("✅ Logged in successfully!");
    setTimeout(() => navigate("/dashboard"), 1000); // navigate after 1 second
  } catch (error) {
    setMessage(`❌ ${error.message}`);
  }
};


  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
      <p><Link to="/reset-password">Forgot Password?</Link></p>
    </div>
  );
};

export default Login;
