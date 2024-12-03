import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";

export default function GetStudent({ id }) {
  const [data, setData] = useState(null);
  const navigate = useNavigate(0);
  const { token } = useContext(useAuth());

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(`http://localhost:8000/api/student`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = response.data.Response.data;
        setData(result);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetch();
  }, [id]);

  function handleAction(id) {
    navigate(`${id}`);
  }
  function handleToStudentDetail(id) {
    navigate(`/student/${id}`);
  }

  if (id == 0) {
    return (
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
            <th style={{ textAlign: "start" }}>City Name</th>
            <th style={{ textAlign: "start" }}>School Name</th>
            <th style={{ width: "10%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data !== null &&
            data.map((item) => (
              <tr key={item.id}>
                <td style={{ textAlign: "start" }}>{item.id}</td>
                <td style={{ textAlign: "start" }}>{item.user.name}</td>
                <td style={{ textAlign: "start" }}>{item.city.name}</td>
                <td style={{ textAlign: "start" }}>{item.school.name}</td>
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
        {data == null && <Loading />}
      </table>
    );
  }

  return (
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
          data
            .filter((item) => item.school_id == id)
            .map((item) => (
              <tr key={item.id}>
                <td style={{ textAlign: "start" }}>{item.id}</td>
                <td style={{ textAlign: "start" }}>{item.user.name}</td>
                <td style={{ width: "10%" }}>
                  <button
                    onClick={() => handleToStudentDetail(item.id)}
                    className="btn-table"
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}
