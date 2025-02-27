
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative py-20 bg-muted/30">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
            alt="About us background" 
            className="w-full h-full object-cover object-center opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight mb-6">About EasyShop</h1>
            <p className="text-xl text-muted-foreground">
              Redefining the online shopping experience with simplicity and elegance.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl font-bold tracking-tight mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2023, EasyShop started with a simple mission: to create a shopping 
                experience that's as beautiful as it is functional. We believe that online 
                shopping should be a pleasure, not a chore.
              </p>
              <p className="text-muted-foreground mb-4">
                Our team of designers and developers work tirelessly to craft an experience 
                that puts the focus on what matters most - helping you discover and purchase 
                products you'll love.
              </p>
              <p className="text-muted-foreground">
                Every detail of our platform has been carefully considered, from the 
                typography to the animations, creating a seamless journey from browsing 
                to checkout.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="Our mission" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Our Values</h2>
            <p className="text-muted-foreground">
              At the core of everything we do are a set of principles that guide our decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg shadow-sm border animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12H2M22 12C22 6.5 18 2 12 2M22 12C22 17.5 18 22 12 22M12 2C6 2 2 6.5 2 12M12 2C14.5 2 16.5 6.5 16.5 12C16.5 17.5 14.5 22 12 22M12 22C6 22 2 17.5 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Simplicity</h3>
              <p className="text-muted-foreground">
                We believe less is more. We focus on creating intuitive experiences 
                without unnecessary complexity.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-sm border animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We curate our products carefully, focusing on quality over quantity 
                to ensure customers receive the best.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-sm border animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in being honest and open in all our dealings with customers, 
                partners, and team members.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Meet Our Team</h2>
            <p className="text-muted-foreground mb-12">
              The passionate individuals behind EasyShop who work tirelessly to create 
              the best shopping experience for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="mb-4 overflow-hidden rounded-full mx-auto h-32 w-32">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium">Alex Chen</h3>
              <p className="text-sm text-muted-foreground">CEO & Founder</p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="mb-4 overflow-hidden rounded-full mx-auto h-32 w-32">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Head of Design" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium">Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground">Head of Design</p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="mb-4 overflow-hidden rounded-full mx-auto h-32 w-32">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="CTO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium">Michael Wong</h3>
              <p className="text-sm text-muted-foreground">CTO</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6 animate-slide-up">Join Our Journey</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            We're always looking for passionate individuals to join our team. If you share our 
            values and want to help redefine online shopping, we'd love to hear from you.
          </p>
          <Button className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            View Careers
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
