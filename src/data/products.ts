
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    description: "Experience crystal clear audio with these premium wireless headphones. Features noise cancellation technology and 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Audio"
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 399.99,
    description: "Stay connected with this premium smartwatch. Features health tracking, notifications, and a beautiful always-on display.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    category: "Wearables"
  },
  {
    id: "3",
    name: "Professional Camera Kit",
    price: 1299.99,
    description: "Capture stunning moments with this professional-grade camera kit. Includes multiple lenses and accessories for any situation.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    category: "Photography"
  },
  {
    id: "4",
    name: "Portable Bluetooth Speaker",
    price: 129.99,
    description: "Take your music anywhere with this waterproof, portable Bluetooth speaker with 20-hour battery life.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D",
    category: "Audio"
  },
  {
    id: "5",
    name: "Ultra-Thin Laptop",
    price: 1599.99,
    description: "Powerful, lightweight laptop featuring the latest processors and all-day battery life, perfect for professionals on the go.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    category: "Computing"
  },
  {
    id: "6",
    name: "Designer Backpack",
    price: 199.99,
    description: "Stylish and functional backpack with padded laptop compartment, multiple storage pockets, and premium materials.",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhY2twYWNrfGVufDB8fDB8fHww",
    category: "Accessories"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};
