import { HeroBanner } from "./HeroBanner";

export function HomePage() {
  return (
    <div>
      <HeroBanner />
      
      {/* Featured Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-orange-600">¿Por qué elegirnos?</h2>
          <p className="text-muted-foreground">
            Nos apasiona la buena comida y nos comprometemos a brindarte la mejor experiencia de delivery
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Entrega Rápida</h3>
            <p className="text-muted-foreground">
              Tu pedido llega caliente en menos de 30 minutos
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Ingredientes Frescos</h3>
            <p className="text-muted-foreground">
              Seleccionamos los mejores ingredientes diariamente
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Sabor Garantizado</h3>
            <p className="text-muted-foreground">
              100% satisfacción o te devolvemos tu dinero
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2>¿Listo para ordenar?</h2>
          <p className="text-orange-50 max-w-2xl mx-auto">
            Descubre nuestro menú completo y haz tu pedido ahora. ¡La mejor pizza te está esperando!
          </p>
          <a
            href="/menu"
            className="inline-block px-8 py-4 bg-white text-orange-500 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Ver Menú Completo
          </a>
        </div>
      </section>
    </div>
  );
}
