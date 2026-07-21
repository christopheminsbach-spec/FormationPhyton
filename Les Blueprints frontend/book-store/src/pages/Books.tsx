import { useEffect } from "react";
import type { AxiosResponse, AxiosError } from "axios";
import api from "../api/api";


export default function Books() {


    useEffect(() => {


        api.get("/books/")

            .then((response: AxiosResponse) => {

                console.log(response.data);

            })

            .catch((error: AxiosError) => {

                console.error(
                    "Erreur API :",
                    error
                );

            });


    }, []);



    return (

        <div>

            <h1>
                Books
            </h1>

        </div>

    );

}