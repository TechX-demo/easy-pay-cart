
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, products as allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      
      // Reset states when product changes
      setIsImageLoaded(false);
      setIsLoaded(false);
      setQuantity(1);
      
      // Find related products from the same category
      if (foundProduct) {
        const related = allProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 3);
        setRelatedProducts(related);
      }
      
      // Delay to give transition effect
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => navigate("/products")}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className={`container mx-auto px-4 py-12 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Button 
        variant="ghost" 
        className="mb-8 group" 
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
        Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted/25">
          <div className={`absolute inset-0 bg-muted/25 backdrop-blur-sm transition-opacity duration-700 ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`} />
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        
        <div className="flex flex-col">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold tracking-tight mb-4">{product.name}</h1>
            <div className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</div>
            <p className="text-muted-foreground mb-8">{product.description}</p>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center space-x-4 mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
