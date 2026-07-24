import { NavLink } from "react-router-dom";

import "./Sidebar.css";


export default function Sidebar() {


    const menuItems = [

        {
            name:"Accueil",
            path:"/",
            icon:"🏠"
        },

        {
            name:"Mon Profil",
            path:"/profil",
            icon:"👤"
        },

        {
            name:"Générateur CV",
            path:"/cv",
            icon:"📄"
        },

        {
            name:"Candidatures",
            path:"/applications",
            icon:"💼"
        },

        {
            name:"Entretien IA",
            path:"/interview",
            icon:"🤖"
        },

        {
            name:"Matching IA",
            path:"/matching",
            icon:"🎯"
        },

        {
            name:"Dashboard",
            path:"/dashboard",
            icon:"📊"
        },

        {
            name:"Documents",
            path:"/documents",
            icon:"📁"
        },

        {
            name:"Paramètres",
            path:"/settings",
            icon:"⚙️"
        }

    ];



    return (

        <aside className="sidebar">


            <div className="sidebar-logo">


                <span className="logo-icon">
                    🚀
                </span>


                <h2>
                    CareerAI
                </h2>


            </div>



            <nav className="sidebar-menu">


                {
                    menuItems.map((item)=>(


                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({isActive})=>

                                isActive

                                ?

                                "menu-link active"

                                :

                                "menu-link"

                            }

                        >


                            <span className="menu-icon">

                                {item.icon}

                            </span>


                            <span>

                                {item.name}

                            </span>


                        </NavLink>


                    ))
                }


            </nav>


        </aside>

    );

}