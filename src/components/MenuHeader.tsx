import { Pizza, ShoppingCart, User, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

interface MenuHeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export function MenuHeader({ cartCount, onCartClick }: MenuHeaderProps) {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="size-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Pizza className="size-6 text-white" />
            </div>
            <div>
              <h2 className="text-orange-500">PizzaTime</h2>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar pizzas, pastas..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <User className="size-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 bg-orange-500 hover:bg-orange-500">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
