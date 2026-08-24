import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="container navbar-container">

        <div className="logo">
          BIG <span>F</span>
        </div>

        <ul className="nav-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/challenges">
              Challenges
            </Link>
          </li>

          <li>
            <Link to="/recipes">
              Recipes
            </Link>
          </li>

          <li>
            <Link to="/shop">
              Shop
            </Link>
          </li>

        </ul>

        <div className="auth-buttons">

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="register-btn"
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;