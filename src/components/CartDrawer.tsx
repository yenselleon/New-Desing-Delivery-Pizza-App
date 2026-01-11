import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Tu Carrito ({itemCount})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="size-16 text-muted-foreground mb-4" />
            <h3 className="text-muted-foreground mb-2">Tu carrito está vacío</h3>
            <p className="text-muted-foreground">
              Agrega algunos deliciosos platillos para comenzar
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-lg border bg-card"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="size-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-1 truncate">{item.name}</h4>
                    <p className="text-orange-500">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-7"
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                        }
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-7"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-8"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>

            <SheetFooter className="flex-col gap-4">
              <div className="w-full space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Total</span>
                  <span className="text-orange-500">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={handleCheckout}
              >
                Proceder al Pago
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
