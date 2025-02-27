
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    // Small delay to allow animation to complete
    setTimeout(() => {
      removeFromCart(item.product.id);
    }, 300);
  };

  return (
    <div 
      className={`flex items-start space-x-4 py-4 transition-all duration-300 ${
        isRemoving ? "opacity-0 -translate-x-4" : "opacity-100"
      }`}
    >
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium">{item.product.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.product.category}</p>
          </div>
          <p className="text-base font-medium">${item.product.price.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="h-8 w-8 rounded-none rounded-l-md"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="h-8 w-8 rounded-none rounded-r-md"
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
