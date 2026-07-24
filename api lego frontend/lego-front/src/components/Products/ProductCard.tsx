import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";

import Rating from "./Rating";

import type {Product} from "./products";


interface Props {

product:Product;

}



export default function ProductCard({product}:Props){


return (

<motion.article

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

whileHover={{
y:-10
}}

className="
relative
overflow-hidden
rounded-3xl
bg-white
shadow-lg
"


>


{/* Promo */}

{
product.discount &&

<div className="
absolute
left-4
top-4
z-10
rounded-full
bg-red-600
px-4
py-2
font-bold
text-white
">

-{product.discount}%

</div>

}



{/* Favoris */}

<button

className="
absolute
right-4
top-4
z-10
rounded-full
bg-white
p-3
shadow
hover:text-red-600
"

>

<Heart/>

</button>




{/* Image */}

<img

src={product.image}

alt={product.name}

className="
h-64
w-full
object-cover
"

/>




<div className="p-6">


<p className="
text-sm
text-gray-500
">

{product.category}

</p>



<h3 className="
mt-2
text-xl
font-bold
">

{product.name}

</h3>



<Rating rating={product.rating}/>



<div className="
my-4
flex
gap-3
">


<span className="
text-2xl
font-bold
text-red-600
">

{product.price} €

</span>



{
product.oldPrice &&

<span className="
text-gray-400
line-through
">

{product.oldPrice} €

</span>

}


</div>



<div className="
mb-5
flex
justify-between
text-sm
text-gray-600
">

<span>
🧩 {product.pieces}
</span>


<span>
🎂 {product.age}
</span>


</div>




<button

className="
flex
w-full
items-center
justify-center
gap-3
rounded-xl
bg-yellow-400
py-3
font-bold
text-red-700
transition
hover:bg-yellow-300
"

>

<ShoppingCart/>

Ajouter au panier

</button>



</div>


</motion.article>

);


}