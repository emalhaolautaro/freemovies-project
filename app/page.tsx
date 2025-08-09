"use client"

import { Play, Film } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function StreamingLanding() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Efectos de fondo minimalistas */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-32 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header minimalista coherente */}
      <header className="relative z-20 px-8 h-20 flex items-center">
        <div className="flex items-center space-x-3">
          <Film className="h-7 w-7 text-white" />
          <span className="text-xl font-medium text-white">FreeMovies</span>
        </div>
      </header>

      {/* Hero Section cinematográfica */}
      <main className="flex items-center justify-center min-h-[calc(100vh-5rem)] relative z-10">
        <div className="text-center px-8 max-w-4xl mx-auto">
          {/* Título principal minimalista */}
          <div className="relative mb-16 animate-fade-in">
            <h1 className="text-7xl md:text-8xl font-light text-white mb-12 tracking-tight">
              FreeMovies
            </h1>
          </div>

          {/* Descripción simple */}
          <p className="text-lg text-gray-400 mb-16 leading-relaxed max-w-lg mx-auto animate-fade-in-delayed">
            Películas clásicas de dominio público.
            <br />
            Streaming gratuito.
          </p>

          {/* Botón mejorado pero coherente */}
          <div className="relative inline-block animate-fade-in-slow">
            <Link href="/catalog">
              <button 
                className="group relative inline-flex items-center justify-center bg-white text-black hover:bg-gray-100 px-12 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-white/20"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Efecto sutil de brillo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                
                {/* Contenido del botón */}
                <div className="relative flex items-center">
                  <div className={`mr-3 transition-all duration-300 ${isHovered ? 'rotate-180' : ''}`}>
                    <Play className="h-5 w-5" />
                  </div>
                  <span>Ingresar</span>
                </div>
              </button>
            </Link>
          </div>

          {/* Footer simple coherente */}
          <footer className="text-center py-8">
            <p className="text-gray-600 text-sm">FreeMovies 2025 - Todos los derechos reservados</p>
          </footer>

          {/* Estilos mínimos */}
          <style jsx>{`        
            .floating-particle {
              animation: float 8s ease-in-out infinite;
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px); opacity: 0.1; }
              50% { transform: translateY(-30px); opacity: 0.3; }
            }
          `}</style>
        </div>
      </main>
    </div>
  )
}