import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import api from "../api/api";


interface Book {

    id:number;
    title:string;
    author:string;
    year:number;
    price:number;

}



export default function Collection() {


    const [books,setBooks] = useState<Book[]>([]);



    useEffect(()=>{


        api.get("/books/")

        .then(response=>{

            setBooks(response.data);

        })

        .catch(error=>{

            console.error(error);

        });


    },[]);



    return (

        <section

            className="
            min-h-screen
            pt-32
            px-8
            "

        >


            <div className="
            max-w-7xl
            mx-auto
            "
            >


                <h1

                    className="
                    text-5xl
                    font-serif
                    font-bold
                    text-[#2C241B]
                    mb-12
                    "

                >

                    Book Collection

                </h1>



                <div

                    className="
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-8           
                    "

                >


                    {

                        books.map(book=>(

                            <BookCard

                                key={book.id}

                                book={book}

                            />

                        ))

                    }


                </div>


            </div>


        </section>

    );

}