import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./../stores/authSlice"; // Assuming this path is correct
import { useNavigate } from "react-router";
import { Mail, Lock, User, BriefcaseMedical } from 'lucide-react'; // Using Lucide React for icons

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "student" }); // Set default role
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
        // Dispatch the registerUser action with form data
        const result = await dispatch(registerUser(formData));
        // Check if the registration was successful and redirect to login
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/login");
        }
        // Log form data for debugging purposes
        console.log(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
            <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
                {/* Registration Form Section */}
                <div className="w-full lg:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                        Register
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    name="name"
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                                    placeholder="Your full name"
                                />
                            </div>
                        </div>

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
                                />
                            </div>
                        </div>


                        

                        {/* Forgot Password Link (kept for context, but usually for login) */}
                        <div className="text-right">
                            <a
                                href="#"
                                className="text-sm text-blue-600 hover:underline font-medium"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>

                        {/* Error Message Display */}
                        {error && (
                            <p className="text-red-500 text-center text-sm mt-4">{error}</p>
                        )}
                    </form>

                    {/* Or Separator (removed social buttons as per request) */}
                    <div className="relative flex items-center justify-center w-full my-8">
                        <div className="absolute px-4 bg-white text-gray-500 text-sm">Or</div>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Login Link */}
                    <p className="mt-8 text-sm text-center text-gray-700">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </div>

                {/* Image Placeholder Section (hidden on small screens) */}
                <div className="hidden lg:flex lg:w-1/2  items-center justify-center p-4">
                    {/* Placeholder for your image */}
                    <img
                        src="pointing cat.png" // Placeholder image
                        alt="Registration illustration"
                        className="max-w-full h-auto rounded-lg shadow-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x600/e0e0e0/555555?text=Image+Load+Error"; }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;