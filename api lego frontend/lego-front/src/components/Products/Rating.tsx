import { Star } from "lucide-react";


interface Props {

rating:number;

}


export default function Rating({rating}:Props){


return (

<div className="flex items-center gap-1">


{
Array.from({length:5}).map((_,index)=>(

<Star

key={index}

size={18}

className={

index < Math.round(rating)

?
"fill-yellow-400 text-yellow-400"

:
"text-gray-300"

}

/>

))

}


<span className="ml-2 text-sm text-gray-600">

{rating}

</span>


</div>

);

}