import Cookies from "js-cookie";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toggle from '../../assets/navbar/hamburger.png'
import { EXPIRE_DATE, ROLE, TOKEN } from "../../const";
import { AuthContext } from "../../context/AuthContext";
import './header.css'

const Header = () => {
  const toggleSidebar = () => {
      const MiniSidebar = document.querySelector(".mini_sidebar");
      if(MiniSidebar){
        MiniSidebar.classList.toggle("active")
      }
    }
    let { setRole, setIsAuthenticated,isAuthenticated } = useContext(AuthContext);
    let navigate=useNavigate()
    function logout(){
      console.log(1);
      Cookies.remove(TOKEN)
      Cookies.remove(ROLE)
      Cookies.remove(EXPIRE_DATE)
      setIsAuthenticated(false);
      setRole(null)
      navigate("/")

    }
  return (
    <header>
      <div className="Header_flex container">
        <div className="Logo">
          {isAuthenticated ? (
            <NavLink to="/my-posts" className="finsweet">
              My Blogs
            </NavLink>
          ) : (
            <NavLink to="/" className="finsweet">
              Finsweet
            </NavLink>
          )}
        </div>
        <div className="Right_Link">
          <NavLink to="/" className="lnk">
            Home
          </NavLink>
          <NavLink to="/posts" className="lnk">
            Blog
          </NavLink>
          <NavLink to="/about" className="lnk">
            About Us
          </NavLink>
          {isAuthenticated ? (
            ""
          ) : (
            <NavLink to="/register" className="lnk">
              Register
            </NavLink>
          )}

          {isAuthenticated ? (
            <NavLink to="/account" className="login">
              Acount
            </NavLink>
          ) : (
            <NavLink to="/login" className="login">
              Login
            </NavLink>
          )}
          {isAuthenticated ? (
            <button onClick={logout} className="login">
              Log Out
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="mini_sidebar">
          <NavLink className="lnk">Home</NavLink>
          <NavLink to="/posts" className="lnk">
            Blog
          </NavLink>
          <NavLink className="lnk">About Us</NavLink>
          <NavLink className="lnk">Register</NavLink>
          <NavLink className="login">Login</NavLink>
        </div>
        <div className="toggle" onClick={toggleSidebar}>
          <img style={{ width: "30px" }} src={toggle} alt="" />
        </div>
      </div>
      {/* <div className="nav container">
        <div className="logo">
          <a href="">Produ</a>
        </div>
        <input type="checkbox" id="click" />
        <label fr="click" className="menu-btn">
          <i className="fas fa-bars"></i>
        </label>
        <ul>
          <li><a className="active" href="#">Product</a></li>
          <li><a href="#">Customers</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Recources</a></li>
          <button id="signin">Sign In</button>
          <button>Sign Up</button>
        </ul>
    </div> */}
    </header>
  );
};

export default Header;
