import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MenuHeader } from "./components/MenuHeader";
import { HomePage } from "./components/HomePage";
import { MenuPage } from "./components/MenuPage";
import { AuthPage } from "./components/AuthPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { MenuItem } from "./components/MenuGrid";
import { Footer } from "./components/Footer";
import { CartDrawer, CartItem } from "./components/CartDrawer";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Pizza Clásica Margherita",
    description: "Salsa de tomate, mozzarella fresca, albahaca y aceite de oliva",
    price: 12.99,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1564128442383-9201fcc740eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YXxlbnwxfHx8fDE3NjA1NDY3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isPopular: true,
  },
  {
    id: "2",
    name: "Pizza Pepperoni",
    description: "Generosas rodajas de pepperoni, queso mozzarella y salsa especial",
    price: 14.99,
    rating: 5,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1676723009754-8359b42536ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBwaXp6YXxlbnwxfHx8fDE3NjA1NDY3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isPopular: true,
  },
  {
    id: "3",
    name: "Pizza Vegetariana",
    description: "Pimientos, champiñones, cebolla, aceitunas y tomates cherry",
    price: 13.5,
    rating: 4,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1617343251257-b5d709934ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFyaWFuJTIwcGl6emF8ZW58MXx8fHwxNzYwNDk3MjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "4",
    name: "Costillas BBQ",
    description: "Tiernas costillas bañadas en salsa BBQ casera con papas",
    price: 18.99,
    rating: 5,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYnElMjByaWJzfGVufDF8fHx8MTc2MDU0Njc2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isPopular: true,
  },
  {
    id: "5",
    name: "Pasta Alfredo",
    description: "Fettuccine en cremosa salsa alfredo con pollo y champiñones",
    price: 15.99,
    rating: 4,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYwNTA0MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "6",
    name: "Papas Fritas",
    description: "Crujientes papas fritas con sal marina y especias secretas",
    price: 5.99,
    rating: 4,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjA0NzYwNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "7",
    name: "Alitas Picantes",
    description: "Alitas de pollo crujientes con salsa buffalo y aderezo ranch",
    price: 11.99,
    rating: 5,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3N8ZW58MXx8fHwxNzYwNTI0MjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    isPopular: true,
  },
  {
    id: "8",
    name: "Ensalada César",
    description: "Lechuga romana, crutones, parmesano y aderezo césar casero",
    price: 9.99,
    rating: 4,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWVzYXIlMjBzYWxhZHxlbnwxfHx8fDE3NjA1MzAyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

function AppContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the auth or checkout page
  const isAuthPage = location.pathname === "/auth";
  const isCheckoutPage = location.pathname === "/checkout";

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        toast.success(`${item.name} cantidad actualizada`);
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        toast.success(`${item.name} agregado al carrito`);
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Producto eliminado del carrito");
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {!isAuthPage && !isCheckoutPage && (
        <MenuHeader cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      )}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/menu" 
          element={<MenuPage items={menuItems} onAddToCart={handleAddToCart} />} 
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/checkout" 
          element={<CheckoutPage items={cartItems} onClearCart={handleClearCart} />} 
        />
      </Routes>
      
      {!isAuthPage && !isCheckoutPage && <Footer />}
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
