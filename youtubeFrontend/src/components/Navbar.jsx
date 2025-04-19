import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext"; // Use AuthContext for login state

const Navbar = () => {
  const navigate = useNavigate();
  const { username, logout } = useAuth(); // Access username from context

  const handleLoginClick = () => navigate("/login");
  const handleSignUpClick = () => navigate("/signup");
  const handleUserClick = () => navigate("/user");
  const handleHome = () => navigate("/");
  const handleLogout = () => {
    logout(); // Use logout from AuthContext
    navigate("/"); // Navigate back to the home page after logout
  };

  return (
    <div className="bg-amber-300 shadow-md fixed w-full top-0 left-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div
          onClick={handleHome}
          className="cursor-pointer text-xl font-semibold text-gray-800 hover:text-gray-900"
        >
          MOOD ENHANCER PLAYLIST
        </div>

        <div className="space-x-4 flex items-center">
          {!username ? (
            <>
              <button
                onClick={handleLoginClick}
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-300"
              >
                Login
              </button>
              <button
                onClick={handleSignUpClick}
                className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition duration-300"
              >
                SignUp
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-800 font-medium">
                Welcome, {username}
              </span>
              <button
                onClick={handleUserClick}
                className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition duration-300"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
