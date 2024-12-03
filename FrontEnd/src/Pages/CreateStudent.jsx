import { useState } from "react";
import Navbar from "../Components/Navbar";
import { CityOption, ClassOption, SchoolOption } from "../API/OptionData";
import Create from "../API/Create";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";

export default function CreateStudent() {
  const [newdata, setNewData] = useState({
    name: "",
    city_id: 0,
    school_id: 0,
    class_id: 0,
  });
  const navigate = useNavigate();
  const [alert, setAlert] = useState([false, ""]);

  function setChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setNewData({
      ...newdata,
      [name]: value,
    });
  }

  function handleCloseAlert() {
    setAlert([false, alert[1]]);
    if (alert[1] == "new student has been created.") {
      navigate("/student");
    }
  }

  return (
    <div>
      <Navbar name={"student"} />
      <div className="content">
        <h1>Create Student</h1>
        <div className="inputan">
          <label htmlFor="name" onChange={setChange}>
            Name
          </label>
          <input type="text" name="name" className="input-name" onChange={setChange} />
          <CityOption setChange={setChange} dataOp={null} />
          <SchoolOption setChange={setChange} dataOp={null} />
          <ClassOption setChange={setChange} dataOp={null} />
          <br />
          <br />
          <br />
          <Create
            url={"http://localhost:8000/api/student"}
            data={newdata}
            responseData={setAlert}
          />
        </div>
      </div>
      {alert[0] && <Alert message={alert[1]} onClose={handleCloseAlert} />}
    </div>
  );
}
