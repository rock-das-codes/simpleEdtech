import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./../stores/authSlice"; // Assuming this path is correct
import { useNavigate } from "react-router";
import { Mail, Lock } from 'lucide-react'; // Using Lucide React for icons

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Handles changes in form input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the loginUser action with form data
    const result = await dispatch(loginUser(formData));
    // Check if the login was successful and redirect to dashboard
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  required
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="you@example.com"
                  value={formData.email}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="••••••••"
                  value={formData.password}
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Error Message Display */}
            {error && (
              <p className="text-red-500 text-center text-sm mt-4">{error}</p>
            )}
          </form>

          {/* Or Separator (removed social buttons for consistency) */}
          <div className="relative flex items-center justify-center w-full my-8">
            <div className="absolute px-4 bg-white text-gray-500 text-sm">Or</div>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Register Link */}
          <p className="mt-8 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-semibold text-blue-600 hover:underline"
            >
              Register
            </a>
          </p>
        </div>

        {/* Image Placeholder Section (hidden on small screens) */}
        <div className="hidden lg:flex lg:w-1/2  items-center justify-center p-4">
          {/* Placeholder for your image */}
          <img
            src="pointing cat.png" // Placeholder image
            alt="Login illustration"
            className="max-w-full h-auto rounded-lg shadow-lg"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x600/e0e0e0/555555?text=Image+Load+Error"; }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
