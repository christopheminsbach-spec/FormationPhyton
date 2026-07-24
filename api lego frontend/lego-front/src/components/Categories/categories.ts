export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
}


export const categories: Category[] = [

  {
    id: 1,
    name: "Star Wars",
    description: "Vaisseaux, personnages et aventures galactiques.",
    image: "/images/categories/star-wars.jpg",
    slug: "star-wars",
  },

  {
    id: 2,
    name: "Harry Potter",
    description: "Découvrez Poudlard et l'univers magique.",
    image: "/images/categories/harry-potter.jpg",
    slug: "harry-potter",
  },

  {
    id: 3,
    name: "Technic",
    description: "Des modèles complexes pour les passionnés.",
    image: "/images/categories/technic.jpg",
    slug: "technic",
  },

  {
    id: 4,
    name: "Marvel",
    description: "Les héros Marvel en briques LEGO.",
    image: "/images/categories/marvel.jpg",
    slug: "marvel",
  },

  {
    id: 5,
    name: "City",
    description: "Construisez votre propre ville LEGO.",
    image: "/images/categories/city.jpg",
    slug: "city",
  },

  {
    id: 6,
    name: "Disney",
    description: "Les personnages Disney en LEGO.",
    image: "/images/categories/disney.jpg",
    slug: "disney",
  },

  {
    id: 7,
    name: "Ninjago",
    description: "Combattez avec les ninjas LEGO.",
    image: "/images/categories/ninjago.jpg",
    slug: "ninjago",
  },

  {
    id: 8,
    name: "Botanical",
    description: "Une collection LEGO inspirée de la nature.",
    image: "/images/categories/botanical.jpg",
    slug: "botanical",
  },

];