import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import axios from "axios";
import { loginUser } from "./../stores/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await dispatch(loginUser(formData));
  if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard"); // Redirect after login
  }
};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h2 className="text-2xl font-bold">Login</h2>
    {error && <p className="text-red-500">{error}</p>}
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="p-2 border rounded" />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
            {loading ? "Logging in..." : "Login"}
        </button>
    </form>
</div>
  );
};

export default Login;
