import axios from "axios";
import { useAuth } from "../Context/Auth";
import { useContext } from "react";

export default function Create({ url, data, responseData }) {
  const { token } = useContext(useAuth());
  async function fetch() {
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      responseData([true, response.data.Response.message]);
    } catch (error) {
      responseData([true, error.response.data.message]);
    }
  }
  return (
    <>
      <button className="btn-create" onClick={() => fetch()}>
        Create
      </button>
    </>
  );
}
