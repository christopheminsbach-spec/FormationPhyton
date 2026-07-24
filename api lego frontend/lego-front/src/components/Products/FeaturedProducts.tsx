import { motion } from "framer-motion";

import ProductCard from "./ProductCard";

import {products} from "./products";



export default function FeaturedProducts(){


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
">

Nos LEGO les plus populaires

</h2>


<p className="
mt-4
text-gray-600
">

Découvrez nos modèles préférés des fans.

</p>


</motion.div>




<div className="
grid
grid-cols-1
gap-8

sm:grid-cols-2

lg:grid-cols-3
">


{
products.map(product=>(

<ProductCard

key={product.id}

product={product}

/>

))

}


</div>


</div>


</section>

);


}