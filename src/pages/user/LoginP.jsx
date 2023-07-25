import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { request } from "../../server/request";
import { EXPIRE_DATE, ROLE, TOKEN } from "../../const";
import { AuthContext } from "../../context/AuthContext";
import './login.css'

const LoginP = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated,setRole } = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let {
        data: { token, expire, role },
      } = await request.post("auth/login", user);
      setIsAuthenticated(true);
      setRole(role);
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "user") {
        navigate("/my-posts");
      }
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, role);
      Cookies.set(EXPIRE_DATE, expire);
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section style={{height:"75vh"}} className="all_login">
      <h2 className="login_text_center">Login</h2>
      <div className="Login_inputvs_flex container">
        {loading ? (
          "....Loading"
        ) : (
          <form className="flex_inpvs" onSubmit={submit}>
            <input
              type="text"
              onChange={handleChange}
              value={user.username}
              placeholder="username"
              name="username"
            />
            <input
              type="text"
              onChange={handleChange}
              value={user.password}
              placeholder="password"
              name="password"
            />
            <button className="send" type="submit">
              Log in
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default LoginP;
