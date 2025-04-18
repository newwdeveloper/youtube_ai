import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the signup page
  };

  const handleUserClick = () => {
    navigate("/user"); // Navigate to the user page
  };

  const handleHome = () => {
    navigate("/"); // Navigate to the home page
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
          <button
            onClick={handleLoginClick}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={handleSignUpClick}
            className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer"
          >
            SignUp
          </button>
          <button
            onClick={handleUserClick}
            className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg transition duration-300 cursor-pointer"
          >
            User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
