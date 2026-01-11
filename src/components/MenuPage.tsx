import { MenuGrid, MenuItem } from "./MenuGrid";

interface MenuPageProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export function MenuPage({ items, onAddToCart }: MenuPageProps) {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-orange-600">Nuestro Menú Completo</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra deliciosa selección de pizzas, pastas y acompañamientos. Todos nuestros platillos están preparados con ingredientes frescos y de la más alta calidad.
          </p>
        </div>
      </section>
      
      {/* Menu Grid */}
      <MenuGrid items={items} onAddToCart={onAddToCart} />
    </div>
  );
}
