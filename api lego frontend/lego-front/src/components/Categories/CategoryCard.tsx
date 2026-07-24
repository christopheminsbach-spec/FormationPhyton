import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import type { Category } from "./categories";


interface Props {
  category: Category;
}



export default function CategoryCard({category}: Props) {


return (

<motion.div

initial={{
 opacity:0,
 y:50
}}

whileInView={{
 opacity:1,
 y:0
}}

viewport={{
 once:true
}}

whileHover={{
 scale:1.05
}}

transition={{
 duration:0.4
}}

className="
group
overflow-hidden
rounded-3xl
bg-white
shadow-xl
"

>


{/* Image */}

<div className="
relative
h-56
overflow-hidden
">


<img

src={category.image}

alt={category.name}

className="
h-full
w-full
object-cover
transition
duration-500
group-hover:scale-110
"

/>


<div className="
absolute
inset-0
bg-gradient-to-t
from-black/70
to-transparent
"/>


</div>



{/* Contenu */}

<div className="
p-6
">


<h3 className="
mb-3
text-2xl
font-bold
text-gray-800
">

{category.name}

</h3>



<p className="
mb-5
text-gray-600
">

{category.description}

</p>



<Link

to={`/category/${category.slug}`}

className="
inline-flex
items-center
gap-2
font-bold
text-red-600
transition
hover:text-red-800
"

>

Découvrir

<ArrowRight size={20}/>


</Link>


</div>


</motion.div>


);

}
