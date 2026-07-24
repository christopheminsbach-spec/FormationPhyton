import "./Home.css";


export default function SkillCards(){


const skills=[


"Python",

"React TypeScript",

"Flask API",

"SQLAlchemy",

"Machine Learning",

"Intelligence Artificielle"


];


return (

<section className="skills">


<h2>

Compétences techniques

</h2>


<div className="skill-grid">


{

skills.map(skill=>(


<div className="skill-card" key={skill}>

{skill}

</div>


))

}


</div>


</section>

)

}