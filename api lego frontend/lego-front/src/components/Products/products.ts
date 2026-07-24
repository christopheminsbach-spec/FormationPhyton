export interface Product {

id:number;

name:string;

category:string;

image:string;

price:number;

oldPrice?:number;

discount?:number;

pieces:number;

age:string;

rating:number;

description:string;

}


export const products:Product[] = [

{
id:1,
name:"Millennium Falcon",
category:"Star Wars",
image:"/images/products/millennium-falcon.jpg",
price:849.99,
oldPrice:999.99,
discount:15,
pieces:7541,
age:"18+",
rating:5,
description:"Le célèbre vaisseau LEGO Star Wars."
},


{
id:2,
name:"Château de Poudlard",
category:"Harry Potter",
image:"/images/products/hogwarts.jpg",
price:469.99,
pieces:6020,
age:"18+",
rating:5,
description:"Construisez le château magique de Poudlard."
},


{
id:3,
name:"Bugatti Chiron",
category:"Technic",
image:"/images/products/bugatti.jpg",
price:349.99,
pieces:3599,
age:"14+",
rating:4.8,
description:"Une voiture LEGO Technic ultra détaillée."
},


{
id:4,
name:"Avengers Tower",
category:"Marvel",
image:"/images/products/avengers.jpg",
price:499.99,
pieces:5201,
age:"18+",
rating:4.9,
description:"La tour emblématique des Avengers."
},


{
id:5,
name:"Le Commissariat LEGO City",
category:"City",
image:"/images/products/city-police.jpg",
price:79.99,
pieces:668,
age:"8+",
rating:4.7,
description:"Développez votre ville LEGO."
},


{
id:6,
name:"Bouquet de fleurs LEGO",
category:"Botanical",
image:"/images/products/bouquet.jpg",
price:59.99,
pieces:756,
age:"18+",
rating:4.8,
description:"Une décoration florale originale."
}

];