import { useParams } from "react-router-dom";


export default function BookDetails(){


const {id}=useParams();


return (

<div>

<h1 className="text-4xl font-bold">

Book Details

</h1>


<p className="mt-5 text-gray-400">

Book ID : {id}

</p>


</div>

);

}