import { motion } from "framer-motion";


import {
Swiper,
SwiperSlide
} from "swiper/react";


import {
Autoplay,
Pagination,
Navigation
} from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import PromotionCard from "./PromotionCard";

import {promotions} from "./promotions";



export default function PromotionSlider(){


return (

<section className="
bg-white
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
y:40
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
md:text-5xl
">

🔥 Promotions du moment

</h2>


<p className="
mt-4
text-gray-600
">

Profitez des meilleures offres LEGO.

</p>


</motion.div>




<Swiper

modules={[
Autoplay,
Pagination,
Navigation
]}


spaceBetween={30}


slidesPerView={1}


navigation


pagination={{
clickable:true
}}


autoplay={{
delay:3500
}}


breakpoints={{

640:{
slidesPerView:2
},


1024:{
slidesPerView:3
}

}}

>


{
promotions.map((promotion)=>(


<SwiperSlide key={promotion.id}>


<PromotionCard

promotion={promotion}

/>


</SwiperSlide>


))

}



</Swiper>



</div>


</section>


);


}