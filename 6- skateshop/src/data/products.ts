import { Product } from "@/types/user";

export const products: Product[] = [
  // Skates
  {
    "name": "Tabla de skate profesional",
    "description": "Tabla de alta calidad para skateboarding.",
    "price": 79.99,
    "stock": 15,
    "categoryId": "CAT-SKATE-001",
    "brand": "AntiHero",
    "discount": null,
    "specifications": {
      "concave": "Medio",
      "material": "Maple canadiense",
      "dimensiones": "8.25 x 31.85"
    },
    "images": [
      { 
        "url": "/images/skates/AntiHero/black/Anti-Hero-Classic-Eagle-Black-Deck-back.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      },
      { 
        "id": "img-002",
        "url": "/images/skates/AntiHero/black/Anti-Hero-Classic-Eagle-Black-Deck-side.webp",
        "isMain": false,
        "isHover": true,
        "isGallery": false,
        "order": 1 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate urbano",
    "description": "Diseñada para trucos urbanos y durabilidad.",
    "price": 89.99,
    "stock": 10,
    "categoryId": "CAT-SKATE-001",
    "brand": "AntiHero",
    "discount": null,
    "specifications": {
      "concave": "Alto",
      "material": "Maple canadiense",
      "dimensiones": "8.0 x 31.75"
    },
    "images": [
      { 
        "id": "img-003",
        "url": "/images/skates/AntiHero/skyblue/Anti-Hero-Classic-Eagle-Blue-Deck-back.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      },
      { 
        "id": "img-004",
        "url": "/images/skates/AntiHero/skyblue/Anti-Hero-Classic-Eagle-Blue-Deck-front.webp",
        "isMain": false,
        "isHover": true,
        "isGallery": false,
        "order": 1 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate cruiser",
    "description": "Perfecta para paseos relajados en la ciudad.",
    "price": 69.99,
    "stock": 20,
    "categoryId": "CAT-SKATE-001",
    "brand": "AntiHero",
    "discount": null,
    "specifications": {
      "concave": "Bajo",
      "material": "Maple canadiense",
      "dimensiones": "7.75 x 29.5"
    },
    "images": [
      { 
        "id": "img-005",
        "url": "/images/skates/AntiHero/brown/Anti-Hero-Classic-Eagle-Brown-Deck-back.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      },
      { 
        "id": "img-006",
        "url": "/images/skates/AntiHero/brown/Anti-Hero-Classic-Eagle-Brown-Deck-side.webp",
        "isMain": false,
        "isHover": true,
        "isGallery": false,
        "order": 1 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate retro",
    "description": "Estilo vintage para los amantes del diseño clásico.",
    "price": 99.99,
    "stock": 5,
    "categoryId": "CAT-SKATE-001",
    "brand": "Independent",
    "discount": null,
    "specifications": {
      "concave": "Medio",
      "material": "Maple canadiense",
      "dimensiones": "8.0 x 32.0"
    },
    "images": [
      { 
        "id": "img-007",
        "url": "/images/skates/AntiHero/yellow/Anti-Hero-Classic-Eagle-Mini-Deck-front.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      },
      { 
        "id": "img-008",
        "url": "/images/skates/AntiHero/yellow/Anti-Hero-Classic-Eagle-Mini-Deck-side.webp",
        "isMain": false,
        "isHover": true,
        "isGallery": false,
        "order": 1 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate longboard",
    "description": "Diseñada para velocidad y estabilidad.",
    "price": 129.99,
    "stock": 12,
    "categoryId": "CAT-SKATE-001",
    "brand": "Element",
    "discount": null,
    "specifications": {
      "concave": "Bajo",
      "material": "Maple canadiense",
      "dimensiones": "9.0 x 36.0"
    },
    "images": [
      { 
        "id": "img-009",
        "url": "/images/skates/AntiHero/yellow/Anti-Hero-Classic-Eagle-Mini-Deck-front.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      },
      { 
        "id": "img-010",
        "url": "/images/skates/AntiHero/yellow/Anti-Hero-Classic-Eagle-Mini-Deck-side.webp",
        "isMain": false,
        "isHover": true,
        "isGallery": false,
        "order": 1 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate mini cruiser",
    "description": "Compacta y portátil para viajes cortos.",
    "price": 59.99,
    "stock": 25,
    "categoryId": "CAT-SKATE-001",
    "brand": "Element",
    "discount": null,
    "specifications": {
      "concave": "Medio",
      "material": "Maple canadiense",
      "dimensiones": "7.5 x 28.0"
    },
    "images": [
      { 
        "id": "img-011",
        "url": "/images/skates/skate7.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate downhill",
    "description": "Optimizada para descensos a alta velocidad.",
    "price": 149.99,
    "stock": 3,
    "categoryId": "CAT-SKATE-001",
    "brand": "Element",
    "discount": null,
    "specifications": {
      "concave": "Alto",
      "material": "Fibra de vidrio",
      "dimensiones": "10.0 x 40.0"
    },
    "images": [
      { 
        "id": "img-012",
        "url": "/images/skates/skate8.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate pool",
    "description": "Diseñada para trucos en piscinas vacías.",
    "price": 119.99,
    "stock": 7,
    "categoryId": "CAT-SKATE-001",
    "brand": "Independent",
    "discount": null,
    "specifications": {
      "concave": "Alto",
      "material": "Maple canadiense",
      "dimensiones": "8.25 x 32.5"
    },
    "images": [
      { 
        "id": "img-013",
        "url": "/images/skates/skate9.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate street",
    "description": "Perfecta para trucos en la calle.",
    "price": 85.99,
    "stock": 18,
    "categoryId": "CAT-SKATE-001",
    "brand": "Independent",
    "discount": null,
    "specifications": {
      "concave": "Medio",
      "material": "Maple canadiense",
      "dimensiones": "8.0 x 31.0"
    },
    "images": [
      { 
        "id": "img-014",
        "url": "/images/skates/skate10.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate fishtail",
    "description": "Diseño clásico con cola de pez.",
    "price": 95.99,
    "stock": 14,
    "categoryId": "CAT-SKATE-001",
    "brand": "Independent",
    "discount": null,
    "specifications": {
      "concave": "Bajo",
      "material": "Maple canadiense",
      "dimensiones": "9.0 x 33.0"
    },
    "images": [
      { 
        "id": "img-015",
        "url": "/images/skates/skate11.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate pintada a mano",
    "description": "Diseño único pintado a mano por artistas locales.",
    "price": 159.99,
    "stock": 2,
    "categoryId": "CAT-SKATE-001",
    "brand": "Independent",
    "discount": null,
    "specifications": {
      "concave": "Medio",
      "material": "Maple canadiense",
      "dimensiones": "8.0 x 32.0"
    },
    "images": [
      { 
        "id": "img-016",
        "url": "/images/skates/skate12.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate bambú",
    "description": "Hecha de bambú para mayor flexibilidad.",
    "price": 139.99,
    "stock": 6,
    "categoryId": "CAT-SKATE-001",
    "brand": "Santa Cruz",
    "discount": null,
    "specifications": {
      "concave": "Medio",
      "material": "Bambú",
      "dimensiones": "8.5 x 33.0"
    },
    "images": [
      { 
        "id": "img-017",
        "url": "/images/skates/skate13.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate drop-through",
    "description": "Diseño bajo para mayor estabilidad.",
    "price": 149.99,
    "stock": 4,
    "categoryId": "CAT-SKATE-001",
    "brand": "Santa Cruz",
    "discount": null,
    "specifications": {
      "concave": "Bajo",
      "material": "Maple canadiense",
      "dimensiones": "9.5 x 38.0"
    },
    "images": [
      { 
        "id": "img-018",
        "url": "/images/skates/skate14.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate concave alto",
    "description": "Diseñada para trucos avanzados.",
    "price": 109.99,
    "stock": 9,
    "categoryId": "CAT-SKATE-001",
    "brand": "Santa Cruz",
    "discount": null,
    "specifications": {
      "concave": "Alto",
      "material": "Maple canadiense",
      "dimensiones": "8.0 x 31.5"
    },
    "images": [
      { 
        "id": "img-019",
        "url": "/images/skates/skate15.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate cruiser vintage",
    "description": "Estilo retro para coleccionistas.",
    "price": 129.99,
    "stock": 11,
    "categoryId": "CAT-SKATE-001",
    "brand": "Santa Cruz",
    "discount": null,
    "specifications": {
      "concave": "Bajo",
      "material": "Maple canadiense",
      "dimensiones": "7.75 x 30.0"
    },
    "images": [
      { 
        "id": "img-020",
        "url": "/images/skates/skate16.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate carbono",
    "description": "Hecha de fibra de carbono para mayor resistencia.",
    "price": 199.99,
    "stock": 3,
    "categoryId": "CAT-SKATE-001",
    "brand": "Flip",
    "discount": null,
    "specifications": {
      "concave": "Medio",
      "material": "Fibra de carbono",
      "dimensiones": "8.25 x 32.0"
    },
    "images": [
      { 
        "id": "img-021",
        "url": "/images/skates/skate17.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate pintada UV",
    "description": "Diseño reactivo a la luz ultravioleta.",
    "price": 179.99,
    "stock": 3,
    "categoryId": "CAT-SKATE-001",
    "brand": "Flip",
    "discount": null,
    "specifications": {
      "concave": "Medio",
      "material": "Maple canadiense",
      "dimensiones": "8.0 x 31.0"
    },
    "images": [
      { 
        "id": "img-022",
        "url": "/images/skates/skate18.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate glow-in-the-dark",
    "description": "Brilla en la oscuridad para sesiones nocturnas.",
    "price": 169.99,
    "stock": 5,
    "categoryId": "CAT-SKATE-001",
    "brand": "Flip",
    "discount": null,
    "specifications": {
      "concave": "Medio",
      "material": "Maple canadiense",
      "dimensiones": "8.25 x 32.0"
    },
    "images": [
      { 
        "id": "img-023",
        "url": "/images/skates/skate19.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },
  {
    "name": "Tabla de skate personalizada",
    "description": "Personaliza tu tabla con tu propio diseño.",
    "price": 189.99,
    "stock": 2,
    "categoryId": "CAT-SKATE-001",
    "brand": "Flip",
    "discount": null,
    "specifications": {
      "concave": "Medio",
      "material": "Maple canadiense",
      "dimensiones": "8.0 x 31.5"
    },
    "images": [
      { 
        "id": "img-024",
        "url": "/images/skates/skate20.webp",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-1", "size-uuid-2"],
    "colors": ["color-uuid-1", "color-uuid-2"],
    "types": ["type-uuid-1"]
  },

  // Remeras
  {
    "name": "Adidas Skateboarding Teamgeist Jersey Gender Neutral Black White",
    "description": "Remera Adidas Skateboarding Teamgeist de género neutro en color negro y blanco.",
    "price": 49.99,
    "stock": 10,
    "categoryId": "CAT-SHIRT-002",
    "brand": "Adidas",
    "discount": null,
    "specifications": {
      "material": "100% Poliéster reciclado",
      "fit": "Regular",
      "color": "Negro/Blanco"
    },
    "images": [
      { 
        "id": "img-025",
        "url": "/images/remeras/Adidas-Skateboarding-Teamgeist-Jersey-Gender-Neutral-Black-White.jpg",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-3", "size-uuid-4"],
    "colors": ["color-uuid-3", "color-uuid-4"],
    "types": ["type-uuid-2"]
  },
  {
    "name": "Adidas Skateboarding Teamgeist Jersey Gender Neutral Dark Green White",
    "description": "Remera Adidas Skateboarding Teamgeist de género neutro en verde oscuro y blanco.",
    "price": 49.99,
    "stock": 10,
    "categoryId": "CAT-SHIRT-002",
    "brand": "Adidas",
    "discount": null,
    "specifications": {
      "material": "100% Poliéster reciclado",
      "fit": "Regular",
      "color": "Verde Oscuro/Blanco"
    },
    "images": [
      { 
        "id": "img-026",
        "url": "/images/remeras/Adidas-Skateboarding-Teamgeist-Jersey-Gender-Neutral-Dark-Green-White.jpg",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-3", "size-uuid-4"],
    "colors": ["color-uuid-3", "color-uuid-4"],
    "types": ["type-uuid-2"]
  },
  {
    "name": "Adidas Skateboarding  Jersey Gender Neutral Legend Ink Navy White",
    "description": "Remera Adidas Skateboardin de género neutro en azul navy y blanco.",
    "price": 49.99,
    "stock": 10,
    "categoryId": "CAT-SHIRT-002",
    "brand": "Adidas",
    "discount": null,
    "specifications": {
      "material": "100% Poliéster reciclado",
      "fit": "Regular",
      "color": "Azul Navy/Blanco"
    },
    "images": [
      { 
        "id": "img-027",
        "url": "/images/remeras/Adidas-Skateboarding-Teamgeist-Jersey-Gender-Neutral-Legend-Ink-Navy-White.jpg",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-3", "size-uuid-4"],
    "colors": ["color-uuid-3", "color-uuid-4"],
    "types": ["type-uuid-2"]
  },
  {
    "name": "Baker Skateboards Brand Logo T-Shirt Black",
    "description": "Remera negra con logo de Baker Skateboards.",
    "price": 34.99,
    "stock": 15,
    "categoryId": "CAT-SHIRT-002",
    "brand": "Baker",
    "discount": null,
    "specifications": {
      "material": "100% Algodón",
      "fit": "Regular",
      "color": "Negro"
    },
    "images": [
      { 
        "id": "img-028",
        "url": "/images/remeras/Baker-Skateboards-Brand-Logo-T-Shirt-Black.jpg",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-3", "size-uuid-4"],
    "colors": ["color-uuid-3", "color-uuid-4"],
    "types": ["type-uuid-2"]
  },
  {
    "name": "Carhartt WIP American Script T-Shirt Conifer",
    "description": "Remera Carhartt WIP American Script en color Conifer.",
    "price": 39.99,
    "stock": 12,
    "categoryId": "CAT-SHIRT-002",
    "brand": "Carhartt",
    "discount": null,
    "specifications": {
      "material": "100% Algodón",
      "fit": "Regular",
      "color": "Verde Conífera"
    },
    "images": [
      { 
        "id": "img-029",
        "url": "/images/remeras/Carhartt-WIP-American-Script-T-Shirt-Conifer.jpg",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-3", "size-uuid-4"],
    "colors": ["color-uuid-3", "color-uuid-4"],
    "types": ["type-uuid-2"]
  },
  {
    "name": "Carhartt WIP Chase Long Sleeve T-Shirt Grey Heather Gold",
    "description": "Remera de manga larga Carhartt WIP Chase en gris con detalles dorados.",
    "price": 44.99,
    "stock": 8,
    "categoryId": "CAT-SHIRT-002",
    "brand": "Carhartt",
    "discount": null,
    "specifications": {
      "material": "Mezcla algodón-poliéster",
      "fit": "Regular",
      "color": "Gris Heather"
    },
    "images": [
      { 
        "id": "img-030",
        "url": "/images/remeras/Carhartt-WIP-Chase-Long-Sleeve-T-Shirt-Grey-Heather-Gold_e8d8ba0e.jpg",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-3", "size-uuid-4"],
    "colors": ["color-uuid-3", "color-uuid-4"],
    "types": ["type-uuid-2"]
  },
  {
    "name": "Carhartt WIP Hartts Football Shirt Heart Trian Jacquard Black White",
    "description": "Remera de fútbol Carhartt WIP Hartts en negro y blanco.",
    "price": 49.99,
    "stock": 10,
    "categoryId": "CAT-SHIRT-002",
    "brand": "Carhartt",
    "discount": null,
    "specifications": {
      "material": "100% Algodón",
      "fit": "Regular",
      "color": "Negro/Blanco"
    },
    "images": [
      { 
        "id": "img-031",
        "url": "/images/remeras/Carhartt-WIP-Hartts-Football-Shirt-Heart-Trian-Jacquard-Black-White.jpg",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-3", "size-uuid-4"],
    "colors": ["color-uuid-3", "color-uuid-4"],
    "types": ["type-uuid-2"]
  },
  {
    "name": "Carhartt WIP Long Sleeve Pocket T-Shirt Branch",
    "description": "Remera de manga larga Carhartt WIP con bolsillo en color Branch.",
    "price": 42.99,
    "stock": 10,
    "categoryId": "CAT-SHIRT-002",
    "brand": "Carhartt",
    "discount": null,
    "specifications": {
      "material": "100% Algodón",
      "fit": "Regular",
      "color": "Verde Branch"
    },
    "images": [
      { 
        "id": "img-032",
        "url": "/images/remeras/Carhartt-WIP-Long-Sleeve-Pocket-T-Shirt-Branch.jpg",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-3", "size-uuid-4"],
    "colors": ["color-uuid-3", "color-uuid-4"],
    "types": ["type-uuid-2"]
  },
  {
    "name": "Carhartt WIP University T-Shirt Black White",
    "description": "Remera Carhartt WIP University en negro y blanco.",
    "price": 39.99,
    "stock": 10,
    "categoryId": "CAT-SHIRT-002",
    "brand": "Carhartt",
    "discount": null,
    "specifications": {
      "material": "100% Algodón",
      "fit": "Regular",
      "color": "Negro/Blanco"
    },
    "images": [
      { 
        "id": "img-033",
        "url": "/images/remeras/Carhartt-WIP-University-T-Shirt-Black-White.jpg",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-3", "size-uuid-4"],
    "colors": ["color-uuid-3", "color-uuid-4"],
    "types": ["type-uuid-2"]
  },
  {
    "name": "Krooked Skateboards No Monster T-Shirt Black",
    "description": "Remera negra con diseño No Monster de Krooked Skateboards.",
    "price": 34.99,
    "stock": 10,
    "categoryId": "CAT-SHIRT-002",
    "brand": "Krooked",
    "discount": null,
    "specifications": {
      "material": "100% Algodón",
      "fit": "Regular",
      "color": "Negro"
    },
    "images": [
      { 
        "id": "img-034",
        "url": "/images/remeras/Krooked-Skateboards-No-Monster-T-Shirt-Black.jpg",
        "isMain": true,
        "isHover": false,
        "isGallery": false,
        "order": 0 
      }
    ],
    "sizes": ["size-uuid-3", "size-uuid-4"],
    "colors": ["color-uuid-3", "color-uuid-4"],
    "types": ["type-uuid-2"]
  },
];