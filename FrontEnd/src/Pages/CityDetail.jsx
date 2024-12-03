import { useEffect, useState, useContext } from "react";
import Navbar from "../Components/Navbar";
import "../CSS/City.css";
import Loading from "../Components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import Update from "../API/Update";
import Alert from "../Components/Alert";
import Delete from "../API/Delete";
import axios from "axios";
import { useAuth } from "../Context/Auth";

export default function CityDetail() {
  const [AlertVisible, setAlertVisible] = useState([false, ""]);
  const [data, setData] = useState(null);
  const [name, setName] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(useAuth());

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/city/${id}`,
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

  const handleCloseAlert = () => {
    setAlertVisible([false, AlertVisible[1]]);
    if (
      AlertVisible[1] == "City has been updated." ||
      AlertVisible[1] == "City has been deleted."
    ) {
      navigate("/city");
    }
  };

  function handleAction(id) {
    navigate(`/school/${id}`)
  }

  return (
    <div className="container">
      <Navbar name={"city"} />
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
          <div className="buttons" style={{ borderBottom: "none" }}>
            <Update
              url={`http://localhost:8000/api/city/${id}`}
              data={name}
              responseData={setAlertVisible}
            />
            <Delete
              url={`http://localhost:8000/api/city/${id}`}
              responseData={setAlertVisible}
            />
          </div>
        </div>

        <h4>All Schools</h4>
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
              data.schools.map((item) => (
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
      </div>
      {AlertVisible[0] && (
        <Alert message={AlertVisible[1]} onClose={handleCloseAlert} />
      )}
      {data == null && <Loading />}
    </div>
  );
}
