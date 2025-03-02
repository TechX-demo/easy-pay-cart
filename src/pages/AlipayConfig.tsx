
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { AlipayConfigType } from "@/components/AlipayConfigSheet";

const defaultConfig: AlipayConfigType = {
  appId: "",
  privateKey: "",
  publicKey: "",
  gatewayUrl: "https://openapi.alipay.com/gateway.do",
  sandbox: true,
  merchantId: "",
  returnUrl: window.location.origin + "/checkout",
  notifyUrl: "",
  appCertPublicKey: "",
  alipayRootCert: "",
  alipayCertPublicKey: "",
  encryptKey: "",
  signType: "RSA2",
};

const AlipayConfig = () => {
  const [config, setConfig] = useState<AlipayConfigType>(defaultConfig);

  useEffect(() => {
    // Load saved config when the component mounts
    const savedConfig = localStorage.getItem("alipayConfig");
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setConfig({
      ...config,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a backend or secure storage
    // For demo purposes, we'll just store in localStorage
    localStorage.setItem("alipayConfig", JSON.stringify(config));
    toast({
      title: "配置已保存",
      description: "支付宝开发者账号配置已成功保存",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">支付宝开发者账号配置</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>开发者配置</CardTitle>
          <CardDescription>
            请输入您的支付宝开发者账号信息以启用支付功能
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appId">应用ID (App ID)</Label>
              <Input 
                id="appId"
                name="appId"
                value={config.appId}
                onChange={handleChange}
                placeholder="例如: 2021000000000000"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="merchantId">商户号 (Merchant ID)</Label>
              <Input 
                id="merchantId"
                name="merchantId"
                value={config.merchantId}
                onChange={handleChange}
                placeholder="例如: 2088000000000000"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="privateKey">应用私钥 (RSA Private Key)</Label>
              <Textarea 
                id="privateKey"
                name="privateKey"
                value={config.privateKey}
                onChange={handleChange}
                placeholder="以MII开头的密钥"
                className="min-h-[100px] font-mono text-xs"
                required
              />
              <p className="text-sm text-gray-500">
                请确保私钥安全，通常在生产环境中应存储在服务器端
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="publicKey">支付宝公钥 (Alipay Public Key)</Label>
              <Textarea 
                id="publicKey"
                name="publicKey"
                value={config.publicKey}
                onChange={handleChange}
                placeholder="以MII开头的公钥"
                className="min-h-[100px] font-mono text-xs"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appCertPublicKey">应用公钥证书 (App Cert Public Key)</Label>
              <Input 
                id="appCertPublicKey"
                name="appCertPublicKey"
                value={config.appCertPublicKey}
                onChange={handleChange}
                placeholder="应用公钥证书路径"
              />
              <p className="text-sm text-gray-500">
                如使用证书模式，请提供应用公钥证书路径
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alipayRootCert">支付宝根证书 (Alipay Root Cert)</Label>
              <Input 
                id="alipayRootCert"
                name="alipayRootCert"
                value={config.alipayRootCert}
                onChange={handleChange}
                placeholder="支付宝根证书路径"
              />
              <p className="text-sm text-gray-500">
                如使用证书模式，请提供支付宝根证书路径
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alipayCertPublicKey">支付宝公钥证书 (Alipay Cert Public Key)</Label>
              <Input 
                id="alipayCertPublicKey"
                name="alipayCertPublicKey"
                value={config.alipayCertPublicKey}
                onChange={handleChange}
                placeholder="支付宝公钥证书路径"
              />
              <p className="text-sm text-gray-500">
                如使用证书模式，请提供支付宝公钥证书路径
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="encryptKey">AES密钥 (Encrypt Key)</Label>
              <Input 
                id="encryptKey"
                name="encryptKey"
                value={config.encryptKey}
                onChange={handleChange}
                type="password"
                placeholder="用于敏感数据加密的AES密钥"
              />
              <p className="text-sm text-gray-500">
                用于敏感数据加密，如不需要可留空
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signType">签名方式 (Sign Type)</Label>
              <Input 
                id="signType"
                name="signType"
                value={config.signType}
                onChange={handleChange}
                placeholder="RSA2"
                required
              />
              <p className="text-sm text-gray-500">
                推荐使用RSA2
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="returnUrl">同步通知地址 (Return URL)</Label>
              <Input 
                id="returnUrl"
                name="returnUrl"
                value={config.returnUrl}
                onChange={handleChange}
                placeholder="https://your-domain.com/return"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notifyUrl">异步通知地址 (Notify URL)</Label>
              <Input 
                id="notifyUrl"
                name="notifyUrl"
                value={config.notifyUrl}
                onChange={handleChange}
                placeholder="https://your-domain.com/notify"
              />
              <p className="text-sm text-gray-500">
                用于接收支付宝的支付结果通知，需要公网可访问的URL
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sandbox"
                name="sandbox"
                checked={config.sandbox}
                onChange={handleChange as any}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="sandbox">
                使用沙箱环境 (仅用于测试)
              </Label>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" className="w-full">
              保存配置
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="mt-8 max-w-2xl mx-auto text-sm text-gray-500">
        <h3 className="font-medium mb-2">注意事项：</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>在生产环境中，私钥和AES密钥应安全存储在服务器端</li>
          <li>建议使用支付宝开放平台提供的密钥生成工具</li>
          <li>证书模式和密钥模式只需选择一种使用即可</li>
          <li>请确保异步通知地址(Notify URL)可以接收POST请求</li>
          <li>更多信息请查阅<a href="https://opendocs.alipay.com/open/200/105310" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">支付宝开放平台文档</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AlipayConfig;
