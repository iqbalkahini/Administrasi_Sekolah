import { useNavigate } from "react-router-dom";
import GetStudent from "../Components/GetStudent";
import Navbar from "../Components/Navbar";

export default function Student() {
  const navigate = useNavigate();
  function handleCreateStudent() {
    navigate("/student/create");
  }
  return (
    <div>
      <Navbar />
      <div className="content">
        <h1>Student</h1>
        <GetStudent id={0} />
        <br />
        <br />
        <button className="btn-table" onClick={() => handleCreateStudent()}>
          Create Student
        </button>
      </div>
    </div>
  );
}
