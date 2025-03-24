import { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router";

import { registerUser } from "../stores/authSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      const url ="https://fluffy-palm-tree-676gx4wrqq6h5p6w-5000.app.github.dev/api/auth/register"
      await axios.post(url, {
        "name":"das",
        "email":"fuck@gmail.com",
        "password":"dass",
        "role":"student"
      });
      alert("Signup Successful! You can now login.");
      navigate("/login")
    } catch (err) {
      alert("Signup failed! Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Signup</h2>
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup} className="bg-green-600 text-white p-2 rounded mt-2">Signup</button>
    </div>
  );
};

export default Signup;
