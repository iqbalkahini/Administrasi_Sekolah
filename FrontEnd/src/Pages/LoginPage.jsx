import { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import Loading from "../Components/Loading";
import axios from "axios";
import { useContext } from "react";
import { useAuth } from "../Context/Auth";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [AlertVisible, setAlertVisible] = useState([false, ""]);
  const [loading, setLoading] = useState(false);
  const { saveToken } = useContext(useAuth());
  const navigate = useNavigate();

  function setChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        data
      );
      saveToken(response.data.access_token);
      setAlertVisible([true, response.data.message]);
    } catch (error) {
      setAlertVisible([true, error.response.data.message]);
    } finally {
      setLoading(false);
    }
  }

  const handleCloseAlert = () => {
    setAlertVisible([false, AlertVisible[1]]);
    if (AlertVisible[1] == "Login success") {
      navigate("/city");
    }
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Masukan Email"
          required
          onChange={setChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="Masukan Password"
          onChange={setChange}
        />

        <button type="submit" className="btn-form">
          Login
        </button>
        <Link to={"/register"} className="Link">
          don't have an account?
        </Link>
      </form>
      {AlertVisible[0] && (
        <Alert message={AlertVisible[1]} onClose={handleCloseAlert} />
      )}
      {loading && <Loading />}
    </div>
  );
}
