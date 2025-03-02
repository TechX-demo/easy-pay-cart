
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import AlipayConfigSheet from "@/components/AlipayConfigSheet";

export default function Index() {
  const [configExists, setConfigExists] = useState(false);
  
  useEffect(() => {
    // Check if Alipay config exists
    const savedConfig = localStorage.getItem("alipayConfig");
    setConfigExists(!!savedConfig);
  }, []);
  
  return (
    <div className="container py-8 px-4 mx-auto">
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">欢迎来到我们的商店</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          浏览我们精选的产品，找到完美的选择。享受使用支付宝的便捷支付体验。
        </p>
        
        <div className="mt-6">
          <AlipayConfigSheet onConfigSaved={() => setConfigExists(true)}>
            <Button variant="outline" className="mt-4">
              {configExists ? "修改支付宝配置" : "设置支付宝配置"}
            </Button>
          </AlipayConfigSheet>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">推荐产品</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {!configExists && (
        <Card className="mt-12 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg font-medium mb-2">您尚未配置支付宝账号</h3>
              <p className="text-muted-foreground mb-4">
                为了使用支付宝完成付款，请先配置您的支付宝开发者账号
              </p>
              <AlipayConfigSheet onConfigSaved={() => setConfigExists(true)}>
                <Button>立即配置支付宝</Button>
              </AlipayConfigSheet>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
