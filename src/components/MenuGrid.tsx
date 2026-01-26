import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getMenuPageSize } from "../lib/menu-utils";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  isPopular?: boolean;
}

interface MenuGridProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export function MenuGrid({ items, onAddToCart }: MenuGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(getMenuPageSize(typeof window !== "undefined" ? window.innerWidth : 1024));

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getMenuPageSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(items.length / pageSize);

  // Ensure current page is valid after resize
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = items.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid logic could go here
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2>Nuestro Menú</h2>
        <p className="text-muted-foreground">
          Selecciona tus platillos favoritos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-square overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.isPopular && (
                <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-500">
                  POPULAR
                </Badge>
              )}
              <Button
                size="icon"
                className="absolute bottom-3 right-3 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onAddToCart(item)}
              >
                <Plus className="size-5" />
              </Button>
            </div>
            <CardContent className="p-4 space-y-2">
              <h3>{item.name}</h3>
              <p className="text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < Math.floor(item.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="ml-2 text-muted-foreground">
                  {item.reviews} reviews
                </span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-orange-500">${item.price.toFixed(2)}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="md:hidden"
                  onClick={() => onAddToCart(item)}
                >
                  <Plus className="size-4 mr-1" />
                  Agregar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </section>
  );
}