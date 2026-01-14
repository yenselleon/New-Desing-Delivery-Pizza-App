import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, Package, Truck, MapPin, ChevronDown, ChevronUp } from "lucide-react";
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

// Interface for order details
interface OrderDetails {
  id: string;
  imageUrl: string;
  itemsCount: number;
  total: number;
  comment?: string;
  dressings?: string[];
  drinks?: Array<{
    id: string;
    drink: string;
    price: number;
    quanty: number;
  }>;
  pizzas?: Array<{
    id: string;
    title: string;
    size: string;
    price: number;
    quanty: number;
  }>;
}

export function CheckoutPage({ items, onClearCart }: CheckoutPageProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
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

  // Mock order details data
  const orderDetailsData: OrderDetails = {
    id: "0a432321-d364-40ec-8bb5-8cff605d9137",
    imageUrl: "https://i.ibb.co/6mVB3xq/prosciutto-e-funghi-pizza-min.jpg",
    itemsCount: 4,
    total: 24,
    comment: "Sin cebolla por favor",
    dressings: ["Mayonnaise", "Ranch"],
    drinks: [
      {
        id: "3959dbc7-2936-46e2-8132-286f74768f1e",
        drink: "Coca-Cola",
        price: 3,
        quanty: 1,
      },
    ],
    pizzas: [
      {
        id: "1b4b03c7-f180-4683-b0be-5c838c5a0e2c",
        title: "Prosciutto e funghi pizza",
        size: "Small",
        price: 10,
        quanty: 2,
      },
    ],
  };

  const toggleItemDetails = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                        : "bg-white text-gray-400 border-2 border-gray-200"
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
                        ? "text-orange-600 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 transition-all duration-300 rounded-full ${
                      currentStep > step.number 
                        ? "bg-gradient-to-r from-orange-500 to-red-500" 
                        : "bg-gray-200"
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
              <Card className="border-orange-100 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="mb-6 text-orange-600">Items en tu Carrito</h2>
                  <div className="space-y-4">
                    {/* Regular cart items */}
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-orange-50 transition-colors">
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
                          <p className="text-orange-500 font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Order details item with expandable details */}
                    <div className="border border-orange-200 rounded-lg overflow-hidden">
                      <div 
                        className="flex items-center gap-4 p-3 bg-orange-50/50 hover:bg-orange-50 transition-colors cursor-pointer"
                        onClick={() => toggleItemDetails(orderDetailsData.id)}
                      >
                        <ImageWithFallback
                          src={orderDetailsData.imageUrl}
                          alt="Pedido Especial"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3>Pedido Especial</h3>
                          <p className="text-muted-foreground">
                            {orderDetailsData.itemsCount} items
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-orange-500 font-medium">
                            ${orderDetailsData.total.toFixed(2)}
                          </p>
                          {expandedItems.has(orderDetailsData.id) ? (
                            <ChevronUp className="size-5 text-orange-500" />
                          ) : (
                            <ChevronDown className="size-5 text-orange-500" />
                          )}
                        </div>
                      </div>
                      
                      {/* Expandable details */}
                      {expandedItems.has(orderDetailsData.id) && (
                        <div className="p-4 border-t border-orange-200 bg-white space-y-4">
                          {/* Pizzas */}
                          {orderDetailsData.pizzas && orderDetailsData.pizzas.length > 0 && (
                            <div>
                              <h4 className="text-orange-600 mb-2 flex items-center gap-2">
                                <Package className="size-4" />
                                Pizzas
                              </h4>
                              <div className="space-y-2 pl-6">
                                {orderDetailsData.pizzas.map((pizza) => (
                                  <div key={pizza.id} className="flex justify-between items-start text-sm">
                                    <div>
                                      <p className="font-medium">{pizza.title}</p>
                                      <p className="text-muted-foreground">
                                        Tamaño: {pizza.size} • Cantidad: {pizza.quanty}
                                      </p>
                                    </div>
                                    <p className="text-orange-500 font-medium">
                                      ${(pizza.price * pizza.quanty).toFixed(2)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Drinks */}
                          {orderDetailsData.drinks && orderDetailsData.drinks.length > 0 && (
                            <div>
                              <h4 className="text-orange-600 mb-2 flex items-center gap-2">
                                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Bebidas
                              </h4>
                              <div className="space-y-2 pl-6">
                                {orderDetailsData.drinks.map((drink) => (
                                  <div key={drink.id} className="flex justify-between items-start text-sm">
                                    <div>
                                      <p className="font-medium">{drink.drink}</p>
                                      <p className="text-muted-foreground">Cantidad: {drink.quanty}</p>
                                    </div>
                                    <p className="text-orange-500 font-medium">
                                      ${(drink.price * drink.quanty).toFixed(2)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Dressings */}
                          {orderDetailsData.dressings && orderDetailsData.dressings.length > 0 && (
                            <div>
                              <h4 className="text-orange-600 mb-2">Aderezos</h4>
                              <div className="pl-6">
                                <div className="flex flex-wrap gap-2">
                                  {orderDetailsData.dressings.map((dressing, index) => (
                                    <span 
                                      key={index} 
                                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                                    >
                                      {dressing}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Comment */}
                          {orderDetailsData.comment && (
                            <div>
                              <h4 className="text-orange-600 mb-2">Comentarios</h4>
                              <div className="pl-6">
                                <p className="text-sm text-muted-foreground italic bg-orange-50 p-3 rounded-lg">
                                  "{orderDetailsData.comment}"
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Payment */}
            <div>
              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <h2 className="mb-6 text-white">Información de Pago</h2>
                  
                  {/* Payment Method Tabs */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setPaymentMethod("credit")}
                      className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === "credit"
                          ? "bg-white text-orange-500 shadow-lg"
                          : "bg-orange-600/50 text-white hover:bg-orange-600/70"
                      }`}
                    >
                      <CreditCard className="size-5" />
                      Credit Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod("paypal")}
                      className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                        paymentMethod === "paypal"
                          ? "bg-white text-orange-500 shadow-lg"
                          : "bg-orange-600/50 text-white hover:bg-orange-600/70"
                      }`}
                    >
                      Paypal
                    </button>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    {/* Order Summary */}
                    <div className="bg-orange-600/50 backdrop-blur-sm rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span>PIZZAS</span>
                        <span>{totalItems}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ITEMS</span>
                        <span>{items.length}</span>
                      </div>
                      <Separator className="bg-orange-400/50" />
                      <div className="flex justify-between font-medium">
                        <span>TOTAL</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {paymentMethod === "credit" && (
                      <>
                        <div>
                          <Label htmlFor="cardNumber" className="text-white">
                            Número de Tarjeta
                          </Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white/50"
                            maxLength={19}
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardName" className="text-white">
                            Nombre del Titular
                          </Label>
                          <Input
                            id="cardName"
                            placeholder="JUAN PÉREZ"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white/50"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry" className="text-white">
                              Fecha Exp.
                            </Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              className="bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white/50"
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
                              className="bg-white text-gray-900 border-0 focus:ring-2 focus:ring-white/50"
                              maxLength={3}
                              type="password"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="text-center py-8 bg-orange-600/30 rounded-lg">
                        <p className="mb-4">Serás redirigido a PayPal para completar tu pago</p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-white text-orange-500 hover:bg-gray-100 shadow-lg font-medium"
                    >
                      Continuar a Confirmación
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
            <Card className="border-orange-100 shadow-lg">
              <CardContent className="p-6">
                <h2 className="mb-6 text-orange-600">Información de Compra</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between p-3 rounded-lg bg-orange-50">
                    <span className="text-muted-foreground">Método de Pago</span>
                    <span className="capitalize font-medium">{paymentMethod === "credit" ? "Tarjeta de Crédito" : "PayPal"}</span>
                  </div>
                  
                  <Separator className="bg-orange-100" />
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total de Items</span>
                    <span className="font-medium">{totalItems}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Pagado</span>
                    <span className="text-orange-500 font-semibold text-lg">${total.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="bg-orange-100" />
                  
                  {paymentMethod === "credit" && (
                    <div className="p-3 rounded-lg bg-orange-50">
                      <span className="text-muted-foreground block mb-1">Cuenta</span>
                      <span className="text-sm font-medium">**** **** **** {cardNumber.slice(-4)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Right Side - Customer Info */}
            <Card className="border-orange-100 shadow-lg">
              <CardContent className="p-6">
                <h2 className="mb-6 text-orange-600">Confirma tu Información</h2>
                
                <form onSubmit={handleConfirmSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-foreground">Nombre Completo</Label>
                    <Input
                      id="fullName"
                      placeholder="Juan Pérez"
                      value={customerInfo.fullName}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, fullName: e.target.value })
                      }
                      className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-foreground">Dirección</Label>
                    <Input
                      id="address"
                      placeholder="Calle 123, Colonia Centro"
                      value={customerInfo.address}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, address: e.target.value })
                      }
                      className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground">Teléfono</Label>
                    <Input
                      id="phone"
                      placeholder="+54 9 11 1234-5678"
                      value={customerInfo.phone}
                      onChange={(e) =>
                        setCustomerInfo({ ...customerInfo, phone: e.target.value })
                      }
                      className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      Atrás
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/30"
                    >
                      Confirmar Pedido
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
            <Card className="border-orange-100 shadow-xl">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="size-10 text-orange-500" />
                  </div>
                  <h2 className="text-orange-600 mb-2">¡Pedido Confirmado!</h2>
                  <p className="text-muted-foreground">
                    Tu pedido ha sido recibido y está siendo procesado
                  </p>
                </div>

                {/* Order Tracking */}
                <div className="space-y-8 max-w-md mx-auto">
                  {/* Order Confirmed */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                        <Check className="size-6 text-white" />
                      </div>
                      <div className="w-1 h-16 bg-gradient-to-b from-orange-500 to-orange-300"></div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-orange-600">Pedido Confirmado</h3>
                      <p className="text-muted-foreground">
                        Tu pedido ha sido confirmado
                      </p>
                    </div>
                  </div>

                  {/* Preparing */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                        <Package className="size-6 text-white animate-pulse" />
                      </div>
                      <div className="w-1 h-16 bg-gray-200"></div>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-orange-600">Preparando</h3>
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
                      <h3 className="text-gray-400">En Camino</h3>
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
                      <h3 className="text-gray-400">Entregado</h3>
                      <p className="text-muted-foreground">
                        Tu pedido ha sido entregado
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details Summary */}
                <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-100">
                  <h3 className="mb-4 text-orange-600">Resumen del Pedido</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nombre:</span>
                      <span className="font-medium">{customerInfo.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dirección:</span>
                      <span className="font-medium">{customerInfo.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Teléfono:</span>
                      <span className="font-medium">{customerInfo.phone}</span>
                    </div>
                    <Separator className="bg-orange-200" />
                    <div className="flex justify-between">
                      <span className="font-medium">Total Pagado:</span>
                      <span className="text-orange-500 font-semibold text-lg">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleBackToMenu}
                  className="w-full mt-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/30"
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