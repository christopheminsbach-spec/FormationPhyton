import "./Navbar.css";


export default function Navbar(){


    return (

        <header className="navbar">


            {/* Partie gauche */}

            <div className="navbar-left">


                <h1>

                    🚀 CareerAI Assistant

                </h1>


            </div>



            {/* Recherche */}

            <div className="navbar-search">


                <input

                    type="text"

                    placeholder="Rechercher une candidature, une compétence..."

                />


            </div>




            {/* Partie droite */}

            <div className="navbar-right">



                <button className="icon-button">


                    🔔


                </button>




                <button className="icon-button">


                    🌙


                </button>





                <div className="user-profile">


                    <div className="avatar">

                        CM

                    </div>


                    <div>


                        <strong>

                            Christophe

                        </strong>


                        <span>

                            CDA IA 2026

                        </span>


                    </div>


                </div>



            </div>



        </header>

    );

}