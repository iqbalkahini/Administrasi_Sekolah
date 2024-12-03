import { useState } from "react";
import "../CSS/Form.css";
import { Navigate, Link } from "react-router-dom";
import Alert from "../Components/Alert";
import Loading from "../Components/Loading";
import axios, { HttpStatusCode } from "axios";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [navigateLogin, setNavigateLogin] = useState(false);
  const [AlertVisible, setAlertVisible] = useState([false, ""]);
  const [loading, setLoading] = useState(false);

  function setChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        data
      );
      setNavigateLogin(true);
    } catch (error) {
      setAlertVisible([true, error.response.data.Response.message]);
    } finally {
      setLoading(false);
    }
  }

  const handleCloseAlert = () => {
    setAlertVisible([false, AlertVisible[1]]);
  };

  if (navigateLogin) return <Navigate to={"/"} />;

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Masukan Nama"
          onChange={setChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Masukan Email"
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

        <button type="submit" className="btn-form">Register</button>
        <Link to={"/"} className="Link">already have an account?</Link>
      </form>
      {AlertVisible[0] && (
        <Alert message={AlertVisible[1]} onClose={handleCloseAlert} />
      )}
      {loading && (
        <Loading />
      )}
    </div>
  );
}
