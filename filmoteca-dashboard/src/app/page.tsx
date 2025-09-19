import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Film, Tv, Star, Users, TrendingUp, Play } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Tu Biblioteca de Películas y Series
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Descubre, organiza y disfruta de tu contenido favorito. Crea listas personalizadas, escribe reseñas y
              explora un mundo de entretenimiento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/catalog">
                  <Play className="mr-2 h-5 w-5" />
                  Explorar Catálogo
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register">Crear Cuenta</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Todo lo que necesitas para gestionar tu filmoteca
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Una plataforma completa para organizar y disfrutar de tu contenido audiovisual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Film className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Catálogo Completo</CardTitle>
                <CardDescription>
                  Explora miles de películas y series con información detallada, sinopsis y datos de directores y
                  géneros.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Sistema de Reseñas</CardTitle>
                <CardDescription>
                  Comparte tu opinión, califica contenido y descubre qué piensan otros usuarios sobre tus películas
                  favoritas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Tv className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Listas Personalizadas</CardTitle>
                <CardDescription>
                  Crea y organiza listas de reproducción personalizadas para diferentes ocasiones y estados de ánimo.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Film className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold text-foreground">10,000+</span>
              </div>
              <p className="text-muted-foreground">Películas en catálogo</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold text-foreground">5,000+</span>
              </div>
              <p className="text-muted-foreground">Usuarios activos</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold text-foreground">50,000+</span>
              </div>
              <p className="text-muted-foreground">Reseñas publicadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">¿Listo para comenzar?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Únete a nuestra comunidad y descubre tu próxima película o serie favorita
          </p>
          <Button size="lg" asChild>
            <Link href="/register">Crear Cuenta Gratis</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">FilmLibrary</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                Acerca de
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contacto
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacidad
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2025 FilmLibrary. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
