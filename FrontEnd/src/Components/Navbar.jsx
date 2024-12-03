import { useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";
import axios from "axios";
import { useState, useContext } from "react";
import Alert from "./Alert";
import { useAuth } from "../Context/Auth";

export default function Navbar({ name }) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState([false, ""]);
  const { removeToken, token } = useContext(useAuth());

  function handleNavigate(url) {
    navigate(url);
  }

  function handlename() {
    switch (name) {
      case "city":
        return (
          <>
            <button
              className="btn-nav"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={() => handleNavigate("/city")}
            >
              City
            </button>
            <button
              className="btn-nav"
              onClick={() => handleNavigate("/school")}
            >
              School
            </button>
            <button
              className="btn-nav"
              onClick={() => handleNavigate("/student")}
            >
              Student
            </button>
          </>
        );
      case "school":
        return (
          <>
            <button className="btn-nav" onClick={() => handleNavigate("/city")}>
              City
            </button>
            <button
              className="btn-nav"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={() => handleNavigate("/school")}
            >
              School
            </button>
            <button
              className="btn-nav"
              onClick={() => handleNavigate("/student")}
            >
              Student
            </button>
          </>
        );

      default:
        return (
          <>
            <button className="btn-nav" onClick={() => handleNavigate("/city")}>
              City
            </button>
            <button
              className="btn-nav"
              onClick={() => handleNavigate("/school")}
            >
              School
            </button>
            <button
              className="btn-nav"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={() => handleNavigate("/student")}
            >
              Student
            </button>
          </>
        );
    }
  }

  async function handleLogout() {
    const response = await axios.get("http://localhost:8000/api/auth/logout", {
      headers : {
        Authorization : `Bearer ${token}`
      }
    });
    setAlert([true, response.data.message]);
    removeToken()
  }

  function handleCloseAlert() {
    setAlert([false, alert[1]]);
  }

  return (
    <nav>
      <h3>User: Nama</h3>
      <hr />
      <div className="buttons">{handlename()}</div>
      <button className="btn-nav-logout" onClick={() => handleLogout()}>
        Logout
      </button>
      {alert[0] && <Alert message={alert[1]} onClose={handleCloseAlert} />}
    </nav>
  );
}
