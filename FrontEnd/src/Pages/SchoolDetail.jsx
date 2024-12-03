import { useEffect, useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import Update from "../API/Update";
import Delete from "../API/Delete";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import Alert from "../Components/Alert";
import axios from "axios";
import GetStudent from "../Components/GetStudent";
import { useAuth } from "../Context/Auth";

export default function SchoolDetail() {
  const [alert, setAlert] = useState([false, ""]);
  const [name, setName] = useState({});
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(useAuth());

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/school/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.Response.data);
        setName({ name: response.data.Response.data.name });
      } catch (error) {
        console.log(error.response);
      }
    }
    fetch();
  }, []);

  function setChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setName({
      ...name,
      [name]: value,
    });
  }

  function handleCloseAlert() {
    setAlert([false, alert[1]]);
    if (
      alert[1] == "School has been updated." ||
      alert[1] == "School has been deleted."
    ) {
      navigate("/school");
    }
  }

  function handleCreateClass() {
    navigate("/class/create", { state: { id: id } });
  }

  function handleAction(idClass) {
    navigate(`/class/${idClass}`, { state: { school_id: [id] } });
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
            value={data !== null && name.name}
          />

          <div className="buttons" style={{ border: "none" }}>
            <Update
              url={`http://localhost:8000/api/school/${id}`}
              data={name}
              responseData={setAlert}
            />
            <Delete
              url={`http://localhost:8000/api/school/${id}`}
              responseData={setAlert}
            />
          </div>
        </div>
        {/* // */}
        <h4>All Class</h4>
        <table
          style={{
            width: "100%",
            textAlign: "center",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ borderBottom: "1px solid black" }}>
            <tr>
              <th style={{ textAlign: "start" }}>ID</th>
              <th style={{ textAlign: "start" }}>Name</th>
              <th style={{ width: "10%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.classes.map((item) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "start" }}>{item.id}</td>
                  <td style={{ textAlign: "start" }}>{item.name}</td>
                  <td style={{ width: "10%" }}>
                    <button
                      onClick={() => handleAction(item.id)}
                      className="btn-table"
                    >
                      Show
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button className="btn-table" onClick={() => handleCreateClass()}>
          Create Class
        </button>
        <br />
        <br />
        {/* // */}
        <br />
        <h4>Student in {data !== null && data.name}</h4>
        <GetStudent id={id} />
      </div>
      {alert[0] && <Alert message={alert[1]} onClose={handleCloseAlert} />}
      {data == null && <Loading />}
    </div>
  );
}
