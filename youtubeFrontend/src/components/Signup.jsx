import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from context

  const validateField = (field, value) => {
    let error = "";

    if (field === "name") {
      if (!value.trim()) error = "Name is required";
    }

    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Invalid email format";
    }

    if (field === "password") {
      if (!value.trim()) error = "Password is required";
      else if (value.length < 6)
        error = "Password must be at least 6 characters";
      else if (!/\d/.test(value) || !/[a-zA-Z]/.test(value))
        error = "Password must contain letters and numbers";
    }

    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      password: validateField("password", password),
    };

    const hasError = Object.values(newErrors).some((err) => err);
    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", {
        email,
        password,
        name,
      });

      // After successful signup, log the user in by calling login() from context
      login(res.data.username, res.data.token); // Pass username and token to login

      toast.success("Signup successful! Redirecting to home...");
      setTimeout(() => {
        navigate("/"); // Navigate to the home page (or wherever you want)
      }, 1500);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    // Re-validate the field and remove the error if valid
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-3.5rem)] bg-gradient-to-br from-yellow-100 to-amber-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-10 py-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-amber-600">
          Create Account
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
            className={`w-full border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
