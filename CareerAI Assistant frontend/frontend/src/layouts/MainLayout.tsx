import type { ReactNode } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import "./MainLayout.css";


interface MainLayoutProps {

    children: ReactNode;

}


export default function MainLayout({

    children

}: MainLayoutProps) {


    return (

<div className="app-layout">


    <Navbar />


    <div className="layout-body">


        <Sidebar />


        <main className="main-content">

            {children}

        </main>


    </div>


    <Footer />


</div>

    );

}