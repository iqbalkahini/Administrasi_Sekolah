import axios from "axios";
import { useContext } from "react";
import { useAuth } from "../Context/Auth";

export default function Delete({ url, responseData }) {
  const { token } = useContext(useAuth());
  async function fetch() {
    try {
      const response = await axios.delete(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      responseData([true, response.data.Response.message]);
    } catch (error) {

      responseData([true, error.response.data.Response.message]);
    }
  }

  return (
    <>
      <button className="delete" onClick={() => fetch()}>
        Delete
      </button>
    </>
  );
}
