import { Play, Film } from "lucide-react"
import Link from "next/link"

export default function StreamingLanding() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header minimalista */}
      <header className="relative z-10 px-8 h-20 flex items-center">
        <div className="flex items-center space-x-3">
          <Film className="h-7 w-7 text-white" />
          <span className="text-xl font-medium text-white">FreeMovies</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="text-center px-8 max-w-2xl mx-auto">
          {/* Título principal */}
          <h1 className="text-7xl md:text-8xl font-light text-white mb-12 tracking-tight animate-fade-in">
            FreeMovies
          </h1>

          {/* Descripción simple */}
          <p className="text-lg text-gray-400 mb-16 leading-relaxed max-w-lg mx-auto animate-fade-in-delayed">
            Películas clásicas de dominio público.
            <br />
            Streaming gratuito.
          </p>

          {/* Botón con navegación */}
          <Link href="/catalog">
            <button className="inline-flex items-center justify-center bg-white text-black hover:bg-gray-100 px-12 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 animate-fade-in-slow">
              <Play className="mr-3 h-5 w-5" />
              Ingresar
            </button>
          </Link>
        </div>
      </main>

      {/* Footer simple */}
      <footer className="text-center py-8">
        <p className="text-gray-600 text-sm">FreeMovies 2024</p>
      </footer>
    </div>
  )
}
