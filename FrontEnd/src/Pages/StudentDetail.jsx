import { useEffect, useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { CityOption, ClassOption, SchoolOption } from "../API/OptionData";
import Update from "../API/Update";
import Delete from "../API/Delete";
import Alert from "../Components/Alert";
import Loading from "../Components/Loading";
import { useAuth } from "../Context/Auth";

export default function StudentDetail() {
  const [data, setData] = useState(null);
  const [newdata, setNewData] = useState({
    name: "",
    city_id: 0,
    school_id: 0,
    class_id: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState([false, ""]);
  const { token } = useContext(useAuth());

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.Response.data);
        setNewData({
          ...newdata,
          name: response.data.Response.data.user.name,
          city_id: response.data.Response.data.city_id,
          school_id: response.data.Response.data.school_id,
          class_id: response.data.Response.data.class_id,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetch();
  }, []);

  function setChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setNewData({
      ...newdata,
      [name]: value,
    });
  }

  function handleCloseAlert() {
    setAlert([false, ""]);
    if (
      alert[1] == "Student has been updated." ||
      alert[1] == "Student has been deleted."
    ) {
      navigate("/student");
    }
  }

  function handleCreateStudent() {
    navigate("/student/create");
  }

  return (
    <div>
      <Navbar name={"student"} />
      <div className="content">
        <h1>{data !== null && data.user.name}</h1>
        <div className="inputan">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="input-name"
            onChange={setChange}
            value={newdata.name}
          />
          {data !== null && (
            <CityOption setChange={setChange} dataOp={data !== null && data} />
          )}
          <br />
          <br />
          {data !== null && (
            <SchoolOption
              setChange={setChange}
              dataOp={data !== null && data}
            />
          )}
          <br />
          <br />
          {data !== null && (
            <ClassOption setChange={setChange} dataOp={data !== null && data} />
          )}

          <div className="buttons" style={{ border: "none" }}>
            <Update
              url={`http://localhost:8000/api/student/${id}`}
              data={newdata}
              responseData={setAlert}
            />
            <Delete
              url={`http://localhost:8000/api/student/${id}`}
              responseData={setAlert}
            />
          </div>
        </div>
        <button className="btn-table" onClick={() => handleCreateStudent()}>
          Create Student
        </button>
      </div>
      {data == null && <Loading/>}
      {alert[0] && <Alert message={alert[1]} onClose={handleCloseAlert} />}
    </div>
  );
}
