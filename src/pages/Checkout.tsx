
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  CreditCard, 
  ChevronLeft, 
  Lock, 
  CheckCircle2 
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Replace with your own Stripe publishable key
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

// Checkout form with Stripe integration
const CheckoutForm = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: ""
  });
  
  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Redirect to cart if cart is empty
    if (items.length === 0 && !isSuccess) {
      navigate("/cart");
    }
  }, [items.length, navigate, isSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      return;
    }
    
    setIsSubmitting(true);
    setCardError(null);
    
    try {
      // Create a payment method using the card element
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: formData.fullName,
          email: formData.email,
          address: {
            city: formData.city,
            line1: formData.address,
            postal_code: formData.zipCode,
            country: formData.country
          }
        }
      });
      
      if (error) {
        console.error(error);
        setCardError(error.message || "Payment failed. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      console.log("Payment method created successfully:", paymentMethod);
      
      // In a real application, you would send the payment method ID to your server
      // to create a payment intent or charge the customer
      
      // For demo purposes, we'll simulate a successful payment
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
        toast.success("Your order has been placed successfully!");
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setCardError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md animate-fade-in">
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. We have sent an order confirmation to your email.
        </p>
        <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-12 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Button 
        variant="ghost" 
        className="mb-8" 
        onClick={() => navigate("/cart")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Cart
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="animate-slide-in">
            <h1 className="text-2xl font-bold tracking-tight mb-8">Checkout</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                  <div className="mb-6">
                    <Label htmlFor="card-element">Credit or debit card</Label>
                    <div className="mt-1 p-3 border rounded-md bg-background">
                      <CardElement 
                        id="card-element"
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#32325d',
                              fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                              '::placeholder': {
                                color: '#a0aec0',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </div>
                    {cardError && (
                      <div className="mt-2 text-sm text-destructive">
                        {cardError}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg" 
                  disabled={isSubmitting || !stripe}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">Processing...</span>
                  ) : (
                    <span className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" /> Complete Purchase
                    </span>
                  )}
                </Button>
                
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 mr-2" /> 
                  Secure checkout powered by Stripe
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-6 shadow-sm sticky top-24 animate-slide-in">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-muted-foreground">
                      {item.quantity} × {item.product.name}
                    </span>
                  </div>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component that provides the Stripe context
const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
