import { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../CSS/City.css";
import axios from "axios";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";

export default function City() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useContext(useAuth());

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/city", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.Response.data);
      } catch (error) {
        if (error.response.data.message) {
          // console.log(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  function handleCityDetail(id) {
    navigate(`${id}`);
  }

  function handleCreateCity() {
    navigate("/city/create");
  }

  return (
    <div className="container">
      <Navbar name={"city"} />
      <div className="content">
        <h1>City</h1>

        {loading ? (
          <Loading />
        ) : (
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
            <tbody style={{ textAlign: "" }}>
              {data == null ? "Data kosong" :data.map((item) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "start" }}>{item.id}</td>
                  <td style={{ textAlign: "start" }}>{item.name}</td>
                  <td style={{ width: "10%" }}>
                    <button
                      onClick={() => handleCityDetail(item.id)}
                      className="btn-table"
                    >
                      Show
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button className="btn-table" onClick={() => handleCreateCity()}>
          Create City
        </button>
      </div>
    </div>
  );
}
