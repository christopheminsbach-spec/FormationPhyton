import CategoryCard from "./CategoryCard";
import { categories } from "./categories";

import { motion } from "framer-motion";


export default function CategoryGrid(){


return (

<section className="
bg-gray-100
px-6
py-20
">


<div className="
mx-auto
max-w-7xl
">


{/* Titre */}

<motion.div

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="
mb-12
text-center
"

>


<h2 className="
text-4xl
font-extrabold
text-gray-900
md:text-5xl
">

Explorez nos univers LEGO

</h2>


<p className="
mt-4
text-lg
text-gray-600
">

Choisissez votre thème préféré
et commencez votre construction.

</p>


</motion.div>



{/* Grille */}

<div className="

grid

grid-cols-1

gap-8

sm:grid-cols-2

lg:grid-cols-4

">


{
categories.map((category)=>(
<CategoryCard

key={category.id}

category={category}

/>
))
}


</div>


</div>


</section>


);


}