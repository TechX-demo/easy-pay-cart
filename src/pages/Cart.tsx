
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, Trash2 } from "lucide-react";

const Cart = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`container mx-auto px-4 py-12 min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Your Cart</h1>
      
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-0 animate-fade-in">
              {items.map((item) => (
                <div key={item.product.id}>
                  <CartItem item={item} />
                  <Separator />
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="flex items-center text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6 shadow-sm animate-slide-in">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items ({items.length})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={() => navigate("/checkout")}
              >
                <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                asChild
              >
                <Link to="/products">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <ShoppingCart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
