import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { LuGlobe } from "react-icons/lu";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [homePath, setHomePath] = useState(true);
  const location = useLocation(); 

  useEffect(() => {
    setHomePath(location.pathname === "/");
  }, [location.pathname]); 


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/signin"); 
  };
  

  return (
    <header className="navbar-header">
      <nav className="navbar-desktop">
        <div
          className={`navbar-container ${
            location.pathname === "/" ? "home-path" : "other-path"
          }`}
        >
          <div className="navbar-content">
            <div className="logo-container">
              <NavLink to="/" className="logo-text">
                Tasks
              </NavLink>
            </div>

            <div className="user-controls">
              <span className="host-text">Airbnb Your Home</span>
              <button className="globe-button">
                <LuGlobe className="globe-icon" />
              </button>
              <div onClick={toggleMenu} className="user-menu">
                <div className="hamburger-mobile">
                  <button onClick={toggleMenu}>
                    {isOpen ? (
                      <FaTimes className="close-icon" />
                    ) : (
                      <FaBars className="menu-icon" />
                    )}
                  </button>
                </div>
                <FaUserCircle className="user-icon" />
              </div>
            </div>
          </div>

          {isOpen && (
            <div onClick={toggleMenu} className="dropdown-menu-desktop">
              <div className="dropdown-content">
                {isLoggedIn && userRole === "Host" && (
                  <>
                    <NavLink to="/Tasks" className="dropdown-item">
                      Tasks
                    </NavLink>
                  </>
                )}

                {isLoggedIn ? (
                  <>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/signup" className="dropdown-item">
                      Sign up
                    </NavLink>
                    <NavLink to="/signin" className="dropdown-item">
                      Sign in
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
