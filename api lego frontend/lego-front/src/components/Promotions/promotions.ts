export interface Promotion {

    id:number;

    title:string;

    subtitle:string;

    image:string;

    discount:number;

    oldPrice:number;

    price:number;

    category:string;

    slug:string;

}



export const promotions:Promotion[] = [

{
    id:1,
    title:"Millennium Falcon LEGO Star Wars",
    subtitle:"Le vaisseau légendaire de la saga.",
    image:"/images/promotions/star-wars.jpg",
    discount:25,
    oldPrice:999.99,
    price:749.99,
    category:"Star Wars",
    slug:"millennium-falcon"
},


{
    id:2,
    title:"Poudlard LEGO Harry Potter",
    subtitle:"Construisez le célèbre château magique.",
    image:"/images/promotions/harry-potter.jpg",
    discount:20,
    oldPrice:469.99,
    price:375.99,
    category:"Harry Potter",
    slug:"hogwarts"
},


{
    id:3,
    title:"LEGO Technic Supercar",
    subtitle:"Une expérience de construction avancée.",
    image:"/images/promotions/technic.jpg",
    discount:15,
    oldPrice:349.99,
    price:297.49,
    category:"Technic",
    slug:"technic-car"
},


{
    id:4,
    title:"Collection Marvel Avengers",
    subtitle:"Les héros Marvel arrivent en LEGO.",
    image:"/images/promotions/marvel.jpg",
    discount:30,
    oldPrice:499.99,
    price:349.99,
    category:"Marvel",
    slug:"avengers"
}

];