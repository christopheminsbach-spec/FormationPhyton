import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import api from "../api/api";


interface Book {

    id: number;
    title: string;
    author: string;
    year: number;
    price: number;
    image?: string;

}



export default function BookCollection() {


    const [books, setBooks] = useState<Book[]>([]);



    useEffect(() => {


        api.get("/books/")

            .then(response => {

                setBooks(response.data);

            })

            .catch(error => {

                console.error(
                    "Erreur récupération livres :",
                    error
                );

            });


    }, []);




    return (

        <section

            className="
            min-h-screen
            bg-[#F7F3EE]
            px-8
            pt-32
            "

        >


            {/* Header */}

            <div className="
            max-w-7xl
            mx-auto
            mb-16
            "
            >

                <p

                    className="
                    uppercase
                    tracking-[0.4em]
                    text-sm
                    text-[#B8864A]
                    "

                >

                    Library Collection

                </p>



                <h1

                    className="
                    mt-4
                    text-6xl
                    font-serif
                    font-bold
                    text-[#2C241B]
                    "

                >

                    Book Collection

                </h1>



                <p

                    className="
                    mt-5
                    text-[#75695D]
                    max-w-xl
                    "

                >

                    Discover timeless stories,
                    exclusive editions and
                    inspiring authors.

                </p>


            </div>





            {/* Books Grid */}


            <div

                className="
                max-w-7xl
                mx-auto
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-10
                "

            >


                {

                    books.map((book) => (


                        <motion.article


                            key={book.id}


                            initial={{

                                opacity: 0,
                                y: 40

                            }}


                            animate={{

                                opacity: 1,
                                y: 0

                            }}



                            whileHover={{

                                y: -15,
                                rotateY: 8,
                                scale: 1.03

                            }}



                            transition={{

                                duration: 0.4

                            }}



                            className="

                            bg-white

                            rounded-3xl

                            overflow-hidden

                            border

                            border-[#E8DED2]

                            shadow-xl

                            p-5

                            "

                        >



                            {/* Cover */}


                            <div

                                className="
                                h-[360px]
                                rounded-2xl
                                overflow-hidden
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
                                    hover:scale-110
                                    transition
                                    duration-700
                                    "


                                />


                            </div>






                            {/* Infos */}


                            <h2

                                className="
                                mt-6
                                text-xl
                                font-bold
                                text-[#2C241B]
                                "

                            >

                                {book.title}

                            </h2>




                            <p

                                className="
                                mt-2
                                text-[#75695D]
                                "

                            >

                                {book.author}

                            </p>



                            <p

                                className="
                                mt-2
                                text-sm
                                text-[#9A8D80]
                                "

                            >

                                {book.year}

                            </p>




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

                                    {book.price} €

                                </span>




                                <button

                                    className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-[#B8864A]
                                    text-white
                                    px-5
                                    py-2
                                    rounded-full
                                    hover:scale-105
                                    transition
                                    "

                                >

                                    <ShoppingBag size={18}/>

                                    Buy

                                </button>



                            </div>



                        </motion.article>


                    ))

                }


            </div>


        </section>

    );

}