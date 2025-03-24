import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, []);
    return (
      <div className="h-screen flex items-center justify-center">
      {user ? <h1 className="text-3xl font-bold">Welcome, {user.email}!</h1> : "Loading..."}
    </div>
    );
  };
  
  export default Dashboard;
  