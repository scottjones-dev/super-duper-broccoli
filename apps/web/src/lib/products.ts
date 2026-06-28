export type Category =
  | "Cakes"
  | "Cupcakes"
  | "Pastries"
  | "Macarons"
  | "Seasonal"

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: Category
  image: string
  badge?: string
}

export const categories: Category[] = [
  "Cakes",
  "Cupcakes",
  "Pastries",
  "Macarons",
  "Seasonal",
]

export const products: Product[] = [
  {
    id: "vanilla-bean",
    name: "Vanilla Bean Celebration Cake",
    description:
      "Three layers of Madagascar vanilla sponge wrapped in silky vanilla bean buttercream.",
    price: 58,
    category: "Cakes",
    image: "/cakes/vanilla-bean.png",
    badge: "Bestseller",
  },
  {
    id: "chocolate-fudge",
    name: "Belgian Chocolate Fudge Cake",
    description:
      "Decadent dark chocolate sponge layered with glossy Belgian ganache.",
    price: 64,
    category: "Cakes",
    image: "/cakes/chocolate-fudge.png",
  },
  {
    id: "strawberry-cream",
    name: "Strawberries & Cream Gateau",
    description:
      "Light vanilla chiffon, fresh strawberries and clouds of Chantilly cream.",
    price: 62,
    category: "Cakes",
    image: "/cakes/strawberry-cream.png",
    badge: "Seasonal",
  },
  {
    id: "salted-caramel",
    name: "Salted Caramel Drip Cake",
    description:
      "Brown butter sponge with house-made salted caramel and a golden drip finish.",
    price: 66,
    category: "Cakes",
    image: "/cakes/salted-caramel.png",
  },
  {
    id: "red-velvet",
    name: "Red Velvet Layer Cake",
    description:
      "Velvety cocoa sponge with tangy cream cheese frosting and crumb finish.",
    price: 60,
    category: "Cakes",
    image: "/cakes/red-velvet.png",
  },
  {
    id: "lemon-elderflower",
    name: "Lemon & Elderflower Cake",
    description:
      "Zesty lemon sponge, elderflower syrup and delicate edible blooms.",
    price: 63,
    category: "Seasonal",
    image: "/cakes/lemon-elderflower.png",
    badge: "New",
  },
  {
    id: "macarons",
    name: "French Macaron Box (12)",
    description:
      "An assortment of a dozen delicate macarons in our signature flavours.",
    price: 28,
    category: "Macarons",
    image: "/cakes/macarons.png",
    badge: "Gift",
  },
]

export const cartItems: (Product & { quantity: number })[] = [
  { ...products[0]!, quantity: 1 },
  { ...products[3]!, quantity: 1 },
  { ...products[6]!, quantity: 2 },
]

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value)
}
