interface Props {

    name:string;
    image:string;
    price:number;

}


export default function LegoCard({
    name,
    image,
    price
}:Props){

    return (

        <div>

            <img src={image} alt={name}/>

            <h2>{name}</h2>

            <p>{price} €</p>

        </div>

    );
}