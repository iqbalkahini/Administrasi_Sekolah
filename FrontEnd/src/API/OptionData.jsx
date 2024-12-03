import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useAuth } from "../Context/Auth";
import Loading from "../Components/Loading";

export function CityOption({ setChange, dataOp }) {
  const [data, setData] = useState(null);
  const { token } = useContext(useAuth());
  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get("http://localhost:8000/api/city", {
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

  if (dataOp == null) {
    return (
      <select
        defaultValue={``}
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
    );
  }

  if (data !== null) {
    return (
      <select
        defaultValue={`${dataOp.city_id}`}
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
    );
  }
}

export function SchoolOption({ setChange, dataOp }) {
  const [data, setData] = useState(null);
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
        console.log(error.message);
      }
    }
    fetch();
  }, []);

  console.log(data);

  if (dataOp == null) {
    return (
      <>
        <select
          defaultValue={``}
          name="school_id"
          className="select-name"
          onChange={setChange}
        >
          <option value="" disabled>
            -- Select School --
          </option>
          {data !== null &&
            data.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
        </select>
      </>
    );
  }

  console.log(dataOp.school_id);

  if (data !== null) {
    return (
      <select
        defaultValue={dataOp.school_id}
        name="school_id"
        className="select-name"
        onChange={setChange}
      >
        <option value="" disabled>
          -- Select School --
        </option>
        {data.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    );
  }
}

export function ClassOption({ setChange, dataOp }) {
  const [data, setData] = useState(null);
  const { token } = useContext(useAuth());
  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/student-class",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.Response.message);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetch();
  }, []);

  if (dataOp == null) {
    return (
      <>
        <select
          defaultValue={``}
          name="class_id"
          className="select-name"
          onChange={setChange}
        >
          <option value="" disabled>
            -- Select Class --
          </option>
          {data !== null &&
            data.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
        </select>
        {data == null && <Loading />}
      </>
    );
  }

  if (data !== null) {
    return (
      <>
        <select
          defaultValue={`${dataOp.class_id}`}
          name="class_id"
          className="select-name"
          onChange={setChange}
        >
          <option value="" disabled>
            -- Select Class --
          </option>
          {data !== null &&
            data.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
        </select>
      </>
    );
  }

  return <>{data == null && <Loading />}</>;
}
