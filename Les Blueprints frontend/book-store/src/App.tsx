import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import Collection from "./pages/Collection";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";


export default function App(){


return (

<BrowserRouter>


<div
className="
min-h-screen
bg-[#F7F3EE]
text-[#2C241B]
"
>


<Navbar />


<main>


<Routes>


<Route
path="/"
element={<Home />}
/>


<Route
path="/collection"
element={<Collection />}
/>


<Route
path="/book/:id"
element={<BookDetails />}
/>


<Route
path="/cart"
element={<Cart />}
/>


<Route
path="/profile"
element={<Profile />}
/>


</Routes>


</main>


<Footer />


</div>


</BrowserRouter>


);

}