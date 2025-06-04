"use client";
import { useState } from "react";
import axios from "axios";




export default function Home() {
 
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      console.log("Login successful", response.data);
      window.location.href = "/expenses";
    } catch (error) {
      alert("Login failed"), console.log("Login failed");
    }
  };

  

  const handleSignUp = async () => {
    try {
      console.log(password);
      console.log(username);
      const response = await axios.post("http://localhost:5000/", {
        username,
        password,
      });
      window.location.href = "/";
    } catch (error) {
      console.log("Sign-up failed.");
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={handleSignUp}>Button</button>
      <a href="/api/auth0/login">Login</a>
    </div>
  );
}
