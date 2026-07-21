import {Link} from "react-router-dom";
import {
BookOpen,
ShoppingBag,
User
} from "lucide-react";


export default function Navbar(){


return (

<nav

className="
fixed
top-0
w-full
z-50
bg-[#F7F3EE]/90
backdrop-blur
border-b
border-[#E8DED2]
"

>


<div

className="
max-w-7xl
mx-auto
px-8
py-5
flex
justify-between
items-center
"

>


<Link
to="/"
className="
flex
items-center
gap-3
font-serif
text-2xl
font-bold
"
>

<BookOpen
className="text-[#B8864A]"
/>

Book Haven

</Link>



<div

className="
flex
gap-8
text-[#75695D]
"

>


<Link to="/collection">
Collection
</Link>


<Link
to="/cart"
className="flex gap-2"
>

<ShoppingBag size={18}/>

Cart

</Link>



<Link
to="/profile"
className="flex gap-2"
>

<User size={18}/>

Profile

</Link>



</div>


</div>


</nav>

);

}