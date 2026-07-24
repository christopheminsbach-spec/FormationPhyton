import { Link } from "react-router-dom";

export default function BackHome() {

  return (

    <div style={{ marginTop: "30px" }}>

      <Link
        to="/"
        style={{
          background: "#2563eb",
          color: "white",
          padding: "12px 24px",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        🏠 Retour à l'accueil
      </Link>

    </div>

  );

}