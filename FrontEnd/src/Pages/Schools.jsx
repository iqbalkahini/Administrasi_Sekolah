import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Loading from "../Components/Loading";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";

export default function Schools() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(useAuth());

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get("http://localhost:8000/api/school", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.Response.message);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetch();
  }, []);

  function handleSchoolDetail(id) {
    navigate(`${id}`);
  }

  function handleCreateSchool() {
    navigate("/school/create");
  }

  return (
    <div>
      <Navbar name={"school"} />
      <div className="content">
        <h1>Schools</h1>
        {data == null ? (
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
              {data.map((item) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "start" }}>{item.id}</td>
                  <td style={{ textAlign: "start" }}>{item.name}</td>
                  <td style={{ width: "10%" }}>
                    <button
                      onClick={() => handleSchoolDetail(item.id)}
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

        <button className="btn-table" onClick={() => handleCreateSchool()}>
          Create School
        </button>
      </div>
    </div>
  );
}
