"use client"
import { Clock, Calendar, Film, Play } from "lucide-react"
import Link from "next/link"
import type { Movie } from "@/data/movies"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  // Función getGenreColor con colores vibrantes
  const getGenreColor = (genre: string) => {
    const colors = {
      Horror: "from-red-600 via-red-500 to-red-700",
      "Sci-Fi": "from-blue-500 via-cyan-400 to-blue-600",
      Drama: "from-purple-500 via-violet-400 to-purple-600",
      Comedy: "from-yellow-500 via-amber-400 to-orange-500",
      Western: "from-orange-500 via-red-400 to-yellow-500",
      Romance: "from-pink-500 via-rose-400 to-red-500",
      Thriller: "from-gray-600 via-slate-500 to-gray-700",
      Action: "from-green-500 via-emerald-400 to-teal-500",
      Adventure: "from-teal-500 via-cyan-400 to-blue-500",
      Mystery: "from-indigo-500 via-purple-400 to-violet-500",
      Fantasy: "from-violet-500 via-purple-400 to-pink-500",
      Documentary: "from-stone-500 via-gray-400 to-slate-500",
    }
    return colors[genre as keyof typeof colors] || "from-gray-500 via-slate-400 to-gray-600"
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
        {/* Card de película */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-white/10 transition-all duration-300">
          {/* Poster con colores por género */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-800">
            <div
              className={`w-full h-full bg-gradient-to-br ${getGenreColor(movie.genre)} flex flex-col items-center justify-center text-center p-6 relative overflow-hidden`}
            >
              {/* Patrón vintage específico por género */}
              <div className="absolute inset-0 opacity-25">
                {movie.genre === "Horror" && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 border-2 border-white transform rotate-45"></div>
                    <div className="absolute top-8 right-6 w-4 h-4 border-2 border-white transform rotate-45"></div>
                    <div className="absolute bottom-6 left-6 w-8 h-8 border border-white transform rotate-45"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-white transform rotate-45"></div>
                  </>
                )}
                {movie.genre === "Sci-Fi" && (
                  <>
                    <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                    <div className="absolute top-12 right-8 w-4 h-4 border border-white rounded-full"></div>
                    <div className="absolute bottom-8 left-8 w-6 h-6 border border-white rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-12 h-12 border border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
                  </>
                )}
                {movie.genre === "Comedy" && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 border-2 border-white rounded-full"></div>
                    <div className="absolute top-8 right-6 w-4 h-4 bg-white rounded-full"></div>
                    <div className="absolute bottom-6 left-6 w-5 h-5 border border-white rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full"></div>
                  </>
                )}
                {movie.genre === "Drama" && (
                  <>
                    <div className="absolute top-4 left-4 w-8 h-1 bg-white"></div>
                    <div className="absolute top-8 right-6 w-6 h-1 bg-white"></div>
                    <div className="absolute bottom-6 left-6 w-10 h-1 bg-white"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-1 bg-white"></div>
                    <div className="absolute top-1/2 left-1/4 w-12 h-1 bg-white opacity-50"></div>
                  </>
                )}
                {movie.genre === "Western" && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 border-2 border-white transform rotate-45"></div>
                    <div className="absolute top-8 right-6 w-4 h-4 border border-white"></div>
                    <div className="absolute bottom-6 left-6 w-5 h-5 border border-white transform rotate-45"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-white"></div>
                  </>
                )}
                {movie.genre === "Romance" && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 border-2 border-white rounded-full"></div>
                    <div className="absolute top-8 right-6 w-4 h-4 bg-white rounded-full"></div>
                    <div className="absolute bottom-6 left-6 w-5 h-5 border border-white rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
                  </>
                )}
                {movie.genre === "Action" && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-2 bg-white transform rotate-12"></div>
                    <div className="absolute top-8 right-6 w-4 h-2 bg-white transform -rotate-12"></div>
                    <div className="absolute bottom-6 left-6 w-8 h-2 bg-white transform rotate-45"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-white transform rotate-45"></div>
                  </>
                )}
                {movie.genre === "Adventure" && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 border-2 border-white transform rotate-12"></div>
                    <div className="absolute top-8 right-6 w-4 h-4 bg-white transform rotate-45"></div>
                    <div className="absolute bottom-6 left-6 w-5 h-5 border border-white transform -rotate-12"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-white"></div>
                    <div className="absolute top-1/3 right-1/3 w-2 h-6 bg-white transform rotate-45 opacity-50"></div>
                  </>
                )}
                {movie.genre === "Mystery" && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 border-2 border-white rounded-full"></div>
                    <div className="absolute top-8 right-6 w-4 h-4 border border-white transform rotate-45"></div>
                    <div className="absolute bottom-6 left-6 w-5 h-5 bg-white rounded-full opacity-50"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 border border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-white transform -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
                  </>
                )}
                {movie.genre === "Thriller" && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-2 bg-white transform rotate-45"></div>
                    <div className="absolute top-8 right-6 w-4 h-2 bg-white transform -rotate-45"></div>
                    <div className="absolute bottom-6 left-6 w-8 h-1 bg-white"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-white transform rotate-45"></div>
                  </>
                )}
                {movie.genre === "Fantasy" && (
                  <>
                    <div className="absolute top-4 left-4 w-6 h-6 border-2 border-white rounded-full"></div>
                    <div className="absolute top-8 right-6 w-4 h-4 bg-white transform rotate-45"></div>
                    <div className="absolute bottom-6 left-6 w-5 h-5 border border-white rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute top-1/3 right-1/3 w-2 h-8 bg-white transform rotate-45 opacity-50"></div>
                  </>
                )}
                {movie.genre === "Documentary" && (
                  <>
                    <div className="absolute top-4 left-4 w-8 h-1 bg-white"></div>
                    <div className="absolute top-8 left-4 w-6 h-1 bg-white"></div>
                    <div className="absolute top-12 left-4 w-10 h-1 bg-white"></div>
                    <div className="absolute bottom-8 right-6 w-4 h-4 border border-white"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-white"></div>
                  </>
                )}

                {/* Líneas decorativas base */}
                <div className="absolute top-0 left-1/2 w-px h-full bg-white opacity-10"></div>
                <div className="absolute left-0 top-1/2 w-full h-px bg-white opacity-10"></div>
              </div>

              {/* Icono de película vintage */}
              <div className="mb-4 p-4 bg-white/20 rounded-full border-2 border-white/30">
                <Film className="h-8 w-8 text-white" />
              </div>

              {/* Información de la película */}
              <div className="text-white text-lg font-bold mb-2 leading-tight">{movie.title}</div>
              <div className="text-white/80 text-sm mb-1">{movie.year}</div>
              <div className="text-white/60 text-xs mb-3">{movie.genre}</div>
              <div className="text-white/40 text-xs">Dir. {movie.director}</div>

              {/* Indicadores */}
              <div className="absolute top-2 left-2 bg-white/20 px-2 py-1 rounded text-xs text-white/60">
                Dominio Público
              </div>

              {/* Indicador de video disponible */}
              {movie.videoUrl && (
                <div className="absolute top-2 right-2 bg-green-500/80 px-2 py-1 rounded text-xs text-white font-medium">
                  ▶ Disponible
                </div>
              )}
            </div>

            {/* Overlay con botón de reproducir */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="h-8 w-8 text-black ml-1" />
              </div>
            </div>
          </div>

          {/* Información de la película */}
          <div className="p-6">
            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>

            <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{movie.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="inline-block bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">
                {movie.genre}
              </span>
              {movie.videoUrl && (
                <span className="inline-block bg-green-900/50 text-green-300 px-2 py-1 rounded text-xs">
                  ▶ Ver ahora
                </span>
              )}
            </div>

            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{movie.description}</p>

            <p className="text-gray-500 text-xs">Dir. {movie.director}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
