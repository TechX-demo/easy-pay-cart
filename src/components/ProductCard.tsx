
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className={cn("overflow-hidden product-card hover-lift transition-all duration-300", className)}>
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-image-container aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="product-image w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </Link>
      <CardContent className="p-4 pt-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-medium leading-none">{product.name}</h3>
          </Link>
          <p className="text-base font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full transition-all"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
