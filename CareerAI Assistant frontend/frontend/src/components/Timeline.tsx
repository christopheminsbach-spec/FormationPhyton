import "./Home.css";


export default function Timeline(){


const parcours=[


"1986 → Formation technique",

"2002 → Technicien ENGIE Home Services",

"2023 → Transition professionnelle",

"2025 → Développeur Web et Web Mobile",

"2026 → Concepteur Développeur Applications IA"


];


return (

<section className="timeline">


<h2>

Mon évolution professionnelle

</h2>


{

parcours.map((item)=>(


<div className="timeline-item" key={item}>


<span></span>


<p>

{item}

</p>


</div>


))

}


</section>


)

}