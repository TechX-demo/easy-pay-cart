
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface AlipayPaymentInfo {
  email: string;
  fullName: string;
}

export interface StripePaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  status: string;
}

export interface AlipayPaymentResponse {
  paymentUrl: string;
  outTradeNo: string;
  amount: number;
  status: string;
}
