import { motion } from "framer-motion";


import Hero from "../../components/Hero/Hero";

import CategoryGrid 
from "../../components/Categories/CategoryGrid";


import FeaturedProducts 
from "../../components/Products/FeaturedProducts";


import PromotionSlider 
from "../../components/Promotions/PromotionSlider";



export default function Home(){


return (

<main className="overflow-hidden">


{/* HERO */}

<Hero />



{/* CATEGORIES */}

<CategoryGrid />



{/* PRODUITS */}

<FeaturedProducts />



{/* PROMOTIONS */}

<PromotionSlider />



</main>

);

}