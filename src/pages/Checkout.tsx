
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
  ChevronLeft, 
  Lock, 
  CheckCircle2,
  Mail
} from "lucide-react";

interface CheckoutFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

// Checkout form with Alipay integration
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
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send the payment data to your server
      // which would interact with the Alipay API to create a payment
      
      console.log("Payment data:", {
        amount: total,
        currency: "CNY",
        buyer_email: formData.email,
        buyer_name: formData.fullName,
        shipping_address: {
          address: formData.address,
          city: formData.city,
          zip: formData.zipCode,
          country: formData.country
        }
      });
      
      // For demo purposes, we'll simulate a successful payment
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        clearCart();
        toast.success("支付宝支付成功！");
      }, 2000);
      
    } catch (err) {
      console.error(err);
      toast.error("支付过程中出现错误，请重试。");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md animate-fade-in">
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">订单确认!</h1>
        <p className="text-muted-foreground mb-8">
          感谢您的购买。我们已将订单确认信息发送至您的邮箱。
        </p>
        <Button onClick={() => navigate("/products")}>继续购物</Button>
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
        <ChevronLeft className="mr-2 h-4 w-4" /> 返回购物车
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="animate-slide-in">
            <h1 className="text-2xl font-bold tracking-tight mb-8">结账</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold mb-4">配送信息</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <Label htmlFor="fullName">姓名</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="email">电子邮箱</Label>
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
                      <Label htmlFor="address">地址</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">城市</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">邮政编码</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="country">国家</Label>
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
                  <h2 className="text-lg font-semibold mb-4">支付方式</h2>
                  <div className="p-4 border rounded-md mb-4 bg-blue-50">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">支付宝</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      提交订单后，您将被重定向到支付宝支付页面完成付款。
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    我同意条款和条件
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600" 
                  size="lg" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">处理中...</span>
                  ) : (
                    <span className="flex items-center">
                      使用支付宝支付 ¥{total.toFixed(2)}
                    </span>
                  )}
                </Button>
                
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 mr-2" /> 
                  安全支付由支付宝提供
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-6 shadow-sm sticky top-24 animate-slide-in">
            <h2 className="text-lg font-semibold mb-4">订单摘要</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-muted-foreground">
                      {item.quantity} × {item.product.name}
                    </span>
                  </div>
                  <span>¥{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">小计</span>
                <span>¥{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">运费</span>
                <span>免费</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>总计</span>
                <span>¥{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Checkout component
const Checkout = () => {
  return <CheckoutForm />;
};

export default Checkout;
