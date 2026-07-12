import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold text-purple-400">
        TalentTwin AI
      </h1>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-purple-400">
          Home
        </Link>

        <Link to="/dashboard" className="hover:text-purple-400">
          Dashboard
        </Link>

        <Link to="/upload" className="hover:text-purple-400">
          Upload Resume
        </Link>

        <Link
          to="/login"
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;