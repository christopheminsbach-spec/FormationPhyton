import { Link } from "react-router-dom";

import "./Home.css";


export default function QuickActions(){


return (

<section className="actions">


<h2>

Accès rapides

</h2>


<div className="action-grid">


<Link to="/profil">

👤 Mon profil

</Link>


<Link to="/applications">

💼 Mes candidatures

</Link>


<Link to="/analyse">

🤖 Analyse IA

</Link>


<Link to="/dashboard">

📊 Dashboard

</Link>


</div>


</section>

)

}
