import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-red-500 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p>&copy; 2025 PizzaTime. Todos los derechos reservados.</p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="size-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="size-5" />
            </a>
            <a
              href="#"
              className="size-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href="#"
              className="size-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
