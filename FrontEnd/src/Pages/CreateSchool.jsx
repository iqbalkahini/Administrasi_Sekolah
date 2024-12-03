import { useEffect, useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Create from "../API/Create";
import Alert from "../Components/Alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";

export default function CreateSchool() {
  const [data, setData] = useState(null);
  const [createData, setCreateData] = useState({
    name: "",
    city_id: 0,
  });
  const [alert, setAlert] = useState([false, ""]);
  const navigate = useNavigate();
  const { token } = useContext(useAuth());

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(`http://localhost:8000/api/city`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.Response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetch();
  }, []);

  function setChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setCreateData({
      ...createData,
      [name]: value,
    });
  }

  function handleCloseAlert() {
    setAlert([false, ""]);
    if (alert[1] == "New School has been created.") {
      navigate("/school");
    }
  }

  return (
    <div>
      <Navbar name={"school"} />
      <div className="content">
        <h1>Create School</h1>
        <div className="inputan">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="input-name"
            onChange={setChange}
          />
          <select
            defaultValue={""}
            name="city_id"
            className="select-name"
            onChange={setChange}
          >
            <option value="" disabled>
              -- Select City --
            </option>
            {data !== null &&
              data.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
          </select>
        </div>
        <Create
          url={`http://localhost:8000/api/school`}
          data={createData}
          responseData={setAlert}
        />
      </div>
      {alert[0] && <Alert message={alert[1]} onClose={handleCloseAlert} />}
    </div>
  );
}
