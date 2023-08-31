
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { TOKEN } from "../../const";
import { request } from "../../server/request";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountP = () => {
  const [first_name, setName] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [info, setInfo] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const[loading,setLoading]=useState(true)
  const navigate=useNavigate();
  useEffect(() => {
    request("/auth/me").then(({ data }) => {
      const { first_name, last_name, username } = data;
      setName(first_name);
      setLastname(last_name);
      setUsername(username);
      console.log(data);
    });
  }, []);

  async function saveAccount(e) {
    e.preventDefault();
    const body = {
      first_name,
      last_name,
      username,
    };
    try {
      const response = await request.put("/auth/details", body);
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false)
    }
  }

  return (
    <section style={{height:"75vh"}} className="all_login">
      <h2 className="login_text_center">Account</h2>
      <div className="Login_inputvs_flex container">
        <form onSubmit={saveAccount} className="flex_inpvs">
          <input
            type="text"
            value={first_name}
            onChange={(e) => setName(e.target.value)}
            placeholder="firstname"
            name="firstname"
            required
          />
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="lastname"
            name="lastname"
            required
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            name="username"
            required
          />
          {/* <input
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder="info"
            name="info"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            name="email"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
            name="address"
          />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="phoneNumber"
            name="phoneNumber"
          />
          <input
            type="text"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="birthday"
            name="birthday"
          /> */}

          <button className="send" type="submit">
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default AccountP;
