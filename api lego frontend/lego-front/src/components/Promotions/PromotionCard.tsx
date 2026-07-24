import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


import type {Promotion} from "./promotions";


interface Props {

promotion:Promotion;

}



export default function PromotionCard({promotion}:Props){


return (

<motion.article

whileHover={{
scale:1.03
}}

transition={{
duration:0.3
}}

className="
relative
overflow-hidden
rounded-3xl
bg-white
shadow-xl
"


>


{/* Badge réduction */}

<div className="
absolute
left-5
top-5
z-10
rounded-full
bg-red-600
px-5
py-2
font-bold
text-white
">

-{promotion.discount}%

</div>




<img

src={promotion.image}

alt={promotion.title}

className="
h-[420px]
w-full
object-cover
"

/>



<div className="
absolute
inset-0
bg-gradient-to-t
from-black/80
via-black/20
to-transparent
"/>




<div className="
absolute
bottom-0
p-8
text-white
">


<p className="
text-yellow-300
font-bold
">

{promotion.category}

</p>


<h3 className="
mt-2
text-3xl
font-bold
">

{promotion.title}

</h3>


<p className="
mt-3
text-gray-200
">

{promotion.subtitle}

</p>




<div className="
my-5
flex
items-center
gap-4
">


<span className="
text-3xl
font-bold
text-yellow-400
">

{promotion.price} €

</span>



<span className="
text-xl
line-through
text-gray-300
">

{promotion.oldPrice} €

</span>


</div>




<Link

to={`/product/${promotion.slug}`}

className="
inline-flex
items-center
gap-3
rounded-xl
bg-yellow-400
px-6
py-3
font-bold
text-red-700
hover:bg-yellow-300
"

>

Voir le produit

<ArrowRight/>

</Link>



</div>


</motion.article>


);


}