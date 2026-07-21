import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";


interface Book {

    id: number;
    title: string;
    author: string;
    year: number;
    price: number;
    image?: string;

}



interface Props {

    book: Book;

}



export default function BookCard({ book }: Props) {


    return (

        <motion.article


            initial={{
                opacity: 0,
                y: 30
            }}


            animate={{
                opacity: 1,
                y: 0
            }}


            whileHover={{

                y: -12,
                rotateY: 5,
                scale: 1.03

            }}


            transition={{
                duration: 0.4
            }}


            className="

            bg-white

            rounded-3xl

            p-4

            border

            border-[#E8DED2]

            shadow-lg

            hover:shadow-2xl

            transition

            "

        >


            {/* Image couverture */}

            <div

                className="
                h-[260px]
                w-full
                overflow-hidden
                rounded-2xl
                bg-[#E8DED2]
                "

            >


                <img


                    src={

                        book.image ??

                        "https://images.unsplash.com/photo-1544947950-fa07a98d237f"

                    }


                    alt={book.title}


                    className="

                    w-full

                    h-full

                    object-cover

                    transition

                    duration-700

                    hover:scale-110

                    "

                />


            </div>




            {/* Informations livre */}


            <div className="mt-5">


                <h2

                    className="

                    text-xl

                    font-serif

                    font-bold

                    text-[#2C241B]

                    line-clamp-2

                    "

                >

                    {book.title}

                </h2>




                <p

                    className="

                    mt-2

                    text-sm

                    text-[#75695D]

                    "

                >

                    {book.author}

                </p>




                <p

                    className="

                    mt-1

                    text-sm

                    text-[#A89B8E]

                    "

                >

                    {book.year}

                </p>



            </div>





            {/* Prix + bouton */}


            <div

                className="

                mt-6

                flex

                justify-between

                items-center

                "

            >


                <span

                    className="

                    text-xl

                    font-bold

                    text-[#B8864A]

                    "

                >

                    {book.price.toFixed(2)} €

                </span>





                <button

                    className="

                    flex

                    items-center

                    gap-2

                    bg-[#B8864A]

                    hover:bg-[#9C7038]

                    text-white

                    px-4

                    py-2

                    rounded-full

                    transition

                    hover:scale-105

                    "

                >


                    <ShoppingBag size={18}/>


                    Buy


                </button>



            </div>



        </motion.article>


    );

}