import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, Package, Truck, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { CartItem } from "./CartDrawer";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CheckoutPageProps {
  items: CartItem[];
  onClearCart: () => void;
}

type CheckoutStep = 1 | 2 | 3;
type PaymentMethod = "credit" | "paypal";

export function CheckoutPage({ items, onClearCart }: CheckoutPageProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  
  // Payment info
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  // Customer info
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const steps = [
    { number: 1, label: "Checkout", icon: Package },
    { number: 2, label: "Confirm", icon: Check },
    { number: 3, label: "End", icon: Truck },
  ];

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === "credit") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error("Por favor completa toda la información de pago");
        return;
      }
    }
    
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.fullName || !customerInfo.address || !customerInfo.phone) {
      toast.error("Por favor completa toda tu información");
      return;
    }
    
    setCurrentStep(3);
    window.scrollTo(0, 0);
    
    // Clear cart after order is placed
    setTimeout(() => {
      onClearCart();
    }, 2000);
  };

  const handleBackToMenu = () => {
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step.number
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="size-6" />
                    ) : (
                      <step.icon className="size-6" />
                    )}
                  </div>
                  <span
                    className={`mt-2 transition-colors ${
                      currentStep >= step.number
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 transition-colors ${
                      currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Checkout */}
        {currentStep === 1 && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Cart Items */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6">Items in Your Cart</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3>{item.name}</h3>
                          <p className="text-muted-foreground">
                            {item.quantity} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-orange-500">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Payment */}
            <div>
              <Card className="bg-gradient-to-br from-red-400 to-red-500 text-white">
                <CardContent className="p-6">
                  <h2 className="mb-6 text-white">Payment Info</h2>
                  
                  {/* Payment Method Tabs */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setPaymentMethod("credit")}
                      className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                        paymentMethod === "credit"
                          ? "bg-white text-red-500"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      <CreditCard className="size-5" />
                      Credit Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod("paypal")}
                      className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                        paymentMethod === "paypal"
                          ? "bg-white text-red-500"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      Paypal
                    </button>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    {/* Order Summary */}
                    <div className="bg-red-600 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span>PIZZAS</span>
                        <span>{totalItems}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ITEMS</span>
                        <span>{items.length}</span>
                      </div>
                      <Separator className="bg-red-500" />
                      <div className="flex justify-between">
                        <span>PRICE</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {paymentMethod === "credit" && (
                      <>
                        <div>
                          <Label htmlFor="cardNumber" className="text-white">
                            Card Number
                          </Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="bg-white text-gray-900"
                            maxLength={19}
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardName" className="text-white">
                            Card Holder Name
                          </Label>
                          <Input
                            id="cardName"
                            placeholder="JOHN DOE"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="bg-white text-gray-900"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry" className="text-white">
                              Expiry Date
                            </Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              className="bg-white text-gray-900"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="text-white">
                              CVV
                            </Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              className="bg-white text-gray-900"
                              maxLength={3}
                              type="password"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="text-center py-8">
                        <p className="mb-4">Serás redirigido a PayPal para completar tu pago</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-white text-red-500 hover:bg-gray-100"
                    >
                      Continue to Confirmation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Confirm */}
        {currentStep === 2 && (
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Left Side - Purchase Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6">Purchase Info</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method Payment</span>
                    <span className="capitalize">{paymentMethod === "credit" ? "Credit Card" : "PayPal"}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Items</span>
                    <span>{totalItems}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Paid</span>
                    <span className="text-orange-500">${total.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  {paymentMethod === "credit" && (
                    <div>
                      <span className="text-muted-foreground block mb-1">Account</span>
                      <span className="text-sm">**** **** **** {cardNumber.slice(-4)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Right Side - Customer Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6">Confirm Your Information</h2>
                
                <form onSubmit={handleConfirmSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Yeniel Leon abreu"
                      value={customerInfo.fullName}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Calle 2 no. jardines col. sufrir"
                      value={customerInfo.address}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, address: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+5247852581"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    >
                      Confirm Order
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Delivery Status */}
        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="size-10 text-green-500" />
                  </div>
                  <h2 className="text-green-500 mb-2">¡Pedido Confirmado!</h2>
                  <p className="text-muted-foreground">
                    Tu pedido ha sido recibido y está siendo procesado
                  </p>
                </div>

                {/* Order Tracking */}
                <div className="space-y-8 max-w-md mx-auto">
                  {/* Order Confirmed */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="size-6 text-white" />
                      </div>
                      <div className="w-1 h-16 bg-green-500"></div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-green-500">Order Confirmed</h3>
                      <p className="text-muted-foreground">
                        Tu pedido ha sido confirmado
                      </p>
                    </div>
                  </div>

                  {/* Preparing */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <Package className="size-6 text-white animate-pulse" />
                      </div>
                      <div className="w-1 h-16 bg-gray-200"></div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-green-500">Preparing</h3>
                      <p className="text-muted-foreground">
                        Estamos preparando tu pedido
                      </p>
                    </div>
                  </div>

                  {/* Out for Delivery */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Truck className="size-6 text-gray-400" />
                      </div>
                      <div className="w-1 h-16 bg-gray-200"></div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-gray-400">Out for Delivery</h3>
                      <p className="text-muted-foreground">
                        Tu pedido está en camino
                      </p>
                    </div>
                  </div>

                  {/* Delivered */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <MapPin className="size-6 text-gray-400" />
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-gray-400">Delivered</h3>
                      <p className="text-muted-foreground">
                        Tu pedido ha sido entregado
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details Summary */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="mb-4">Resumen del Pedido</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nombre:</span>
                      <span>{customerInfo.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dirección:</span>
                      <span>{customerInfo.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Teléfono:</span>
                      <span>{customerInfo.phone}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Total Pagado:</span>
                      <span className="text-orange-500">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleBackToMenu}
                  className="w-full mt-8 bg-orange-500 hover:bg-orange-600"
                >
                  Volver al Menú
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
