import { useEffect, useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Update from "../API/Update";
import Delete from "../API/Delete";
import { useAuth } from "../Context/Auth";
import { SchoolOption } from "../API/OptionData";
import Alert from "../Components/Alert";
import Loading from "../Components/Loading";

export default function ClassDetail() {
  const [data, setData] = useState(null);
  const [newData, setNewData] = useState({
    name: "",
    school_id: 0,
  });
  const [alert, setAlert] = useState([false, ""]);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { school_id } = location.state;
  const { token } = useContext(useAuth());

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/student-class/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.Response.data.school_id);

        setNewData({
          name: response.data.Response.data.name,
          school_id: response.data.Response.data.school_id,
        });
        setData(response.data.Response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  function setChange(e) {
    e.preventDefault;
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  }

  function setCloseAlert() {
    setAlert([false, alert[1]]);
    if (
      alert[1] == "Class has been updated." ||
      alert[1] == "Student Class deleted successfully."
    ) {
      navigate(`/school/${school_id}`);
    }
  }

  return (
    <div>
      <Navbar name={"school"} />
      <div className="content">
        <h1>{data !== null && data.name}</h1>
        <div className="inputan">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="input-name"
            onChange={setChange}
            value={newData !== null && newData.name}
          />

          <SchoolOption
            setChange={setChange}
            dataOp={school_id}
            key={school_id}
          />

          <div className="buttons" style={{ border: "none" }}>
            <Update
              url={`http://localhost:8000/api/student-class/${id}`}
              data={newData}
              responseData={setAlert}
            />
            <Delete
              url={`http://localhost:8000/api/student-class/${id}`}
              responseData={setAlert}
            />
          </div>
        </div>
      </div>
      {data == null && <Loading/>}
      {alert[0] && <Alert message={alert[1]} onClose={setCloseAlert} />}
    </div>
  );
}
