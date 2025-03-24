import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
    <h1 className="text-xl font-bold">EdTech</h1>
    <div>
      <Link to="/login" className="px-4">Login</Link>
      <Link to="/signup" className="px-4">Signup</Link>
      <button onClick={handleLogout} className="px-4">Logout</button>
    </div>
  </nav>
  );
};

export default Navbar;
