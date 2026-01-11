import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";

export function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-yellow-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full">
              ¡Oferta Especial!
            </div>
            <h1 className="text-orange-600">
              Las Mejores Pizzas de la Ciudad
            </h1>
            <p className="text-muted-foreground">
              Ingredientes frescos, masa artesanal y entrega rápida. Disfruta de sabores auténticos en la comodidad de tu hogar.
            </p>
            <div className="flex gap-4">
              <Link
                to="/menu"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Ordenar Ahora
              </Link>
              <Link
                to="/menu"
                className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Ver Menú
              </Link>
            </div>
          </div>
          <div className="relative h-[400px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1676723009754-8359b42536ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBwaXp6YXxlbnwxfHx8fDE3NjA1NDY3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Delicious Pizza"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
