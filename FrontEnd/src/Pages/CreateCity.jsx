import { useState } from "react";
import Create from "../API/Create";
import Navbar from "../Components/Navbar";
import "../CSS/Create.css";
import Alert from "../Components/Alert";
import { useNavigate } from "react-router-dom";

export default function CreateCity() {
  const [data, setData] = useState({
    name: "",
  });
  const [alert, setAlert] = useState([false, ""]);
  const navigate = useNavigate();
  function setChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleCloseAlert() {
    setAlert([false, alert[1]]);
    if (alert[1] == "New City has been created.") {
      navigate("/city");
    }
  }

  return (
    <div>
      <Navbar name={"city"} />
      <div className="content">
        <h2>Create City</h2>
        <div className="inputan">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="input-name"
            required
            onChange={setChange}
          />
        </div>
        <Create
          url={"http://localhost:8000/api/city"}
          data={data}
          responseData={setAlert}
        />
      </div>
      {alert[0] && <Alert message={alert[1]} onClose={handleCloseAlert} />}
    </div>
  );
}
