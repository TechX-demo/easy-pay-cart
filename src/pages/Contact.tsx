
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative py-20 bg-muted/30">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" 
            alt="Contact us background" 
            className="w-full h-full object-cover object-center opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              We'd love to hear from you. Get in touch with our team.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-slide-in">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">Sending...</span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
            
            <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl font-bold tracking-tight mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                You can also reach out to us using the following contact details.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Our Address</h3>
                    <p className="text-muted-foreground mt-1">
                      123 Commerce Street<br />
                      San Francisco, CA 94103<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone Number</h3>
                    <p className="text-muted-foreground mt-1">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Address</h3>
                    <p className="text-muted-foreground mt-1">
                      support@easyshop.com
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-8" />
              
              <div>
                <h3 className="font-medium mb-4">Business Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-6 animate-slide-up">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            Find quick answers to common questions about our services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.
              </p>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '250ms' }}>
              <h3 className="font-medium mb-2">How long does shipping take?</h3>
              <p className="text-muted-foreground">
                Standard shipping usually takes 3-5 business days, while express shipping can deliver your products within 1-2 business days.
              </p>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <h3 className="font-medium mb-2">What is your return policy?</h3>
              <p className="text-muted-foreground">
                We offer a 30-day return policy for most items. Products must be unused and in their original packaging.
              </p>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '350ms' }}>
              <h3 className="font-medium mb-2">Do you ship internationally?</h3>
              <p className="text-muted-foreground">
                Yes, we ship to most countries worldwide. International shipping times and rates vary by location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
