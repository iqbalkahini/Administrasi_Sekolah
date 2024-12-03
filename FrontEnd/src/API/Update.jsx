import axios from "axios";
import { useContext } from "react";
import { useAuth } from "../Context/Auth";

export default function Update({ url, data, responseData }) {
  const { token } = useContext(useAuth());
  async function fetch() {
    try {
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      responseData([true, response.data.Response.message]);
    } catch (error) {
      console.log(error.response.data);

      responseData([true, error.response.data.Response.message]);
    }
  }

  return (
    <>
      <button className="update" onClick={() => fetch()}>
        Update
      </button>
    </>
  );
}
