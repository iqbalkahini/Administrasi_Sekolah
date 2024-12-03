import Navbar from "../Components/Navbar";
import axios from "axios";
import Create from "../API/Create";
import Alert from "../Components/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { SchoolOption } from "../API/OptionData";
import { useAuth } from "../Context/Auth";

export default function CreateClass() {
  const [alert, setAlert] = useState([false, ""]);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;
  const [newData, setNewData] = useState({
    name: "",
    school_id: id,
  });

  function setChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  }

  function handleCloseAlert() {
    setAlert([false, alert[1]]);
    navigate(`/school/${id}`);
  }

  return (
    <div>
      <Navbar name={"school"} />
      <div className="content">
        <h1>Create Class</h1>
        <div className="inputan">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="input-name"
            onChange={setChange}
          />
          <SchoolOption setChange={setChange} dataOp={newData} />
        </div>
        <Create
          url={`http://localhost:8000/api/student-class`}
          data={newData}
          responseData={setAlert}
        />
      </div>
      {alert[0] && <Alert message={alert[1]} onClose={handleCloseAlert} />}
    </div>
  );
}
