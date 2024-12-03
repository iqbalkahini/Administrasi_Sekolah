import { Link } from "react-router-dom";

export default function NotFound() {
  Link;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>404</h1>
      <br />
      <Link to="/city">Back Home</Link>
    </div>
  );
}
