import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function Home() {


    return (

        <section

            className="
            min-h-screen
            flex
            items-center
            justify-center
            px-8
            pt-20
            "

        >


            <motion.div

                initial={{
                    opacity:0,
                    y:40
                }}

                animate={{
                    opacity:1,
                    y:0
                }}

                transition={{
                    duration:0.8
                }}

                className="
                text-center
                max-w-4xl
                "

            >


                <p

                    className="
                    text-[#B8864A]
                    uppercase
                    tracking-[0.5em]
                    text-sm
                    "

                >

                    Luxury Digital Library

                </p>



                <h1

                    className="
                    mt-6
                    text-6xl
                    md:text-7xl
                    font-serif
                    font-bold
                    text-[#2C241B]
                    "

                >

                    Stories
                    <br/>
                    That Last Forever

                </h1>



                <p

                    className="
                    mt-8
                    text-lg
                    text-[#75695D]
                    "

                >

                    Discover a curated collection
                    of inspiring books and timeless classics.

                </p>




                <Link

                    to="/collection"

                    className="
                    inline-block
                    mt-10
                    bg-[#B8864A]
                    text-white
                    px-10
                    py-4
                    rounded-full
                    hover:scale-105
                    transition
                    "

                >

                    Explore Collection

                </Link>


            </motion.div>


        </section>

    );

}