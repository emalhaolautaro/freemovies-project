import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Film, Play, Shield, Globe } from "lucide-react"
import { getMovieById } from "@/data/movies"
import VideoPlayer from "@/components/VideoPlayer"
import LicenseInfo from "@/components/LicenseInfo"

interface MoviePageProps {
  params: Promise<{ id: string }>
}

// Componente para el logo de Creative Commons - Dominio Público
const PublicDomainLogo = () => (
  <div className="flex items-center space-x-2 text-sm text-gray-300">
    <div className="flex items-center space-x-1">
      {/* Logo CC */}
      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
        <span className="text-black font-bold text-xs">CC</span>
      </div>
      {/* Logo PD (Public Domain) */}
      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
        <span className="text-black font-bold text-xs">PD</span>
      </div>
    </div>
    <span>Dominio Público</span>
  </div>
)

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params
  const movieId = Number.parseInt(id)
  const movie = getMovieById(movieId)

  if (!movie) {
    notFound()
  }

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
    <div className="min-h-screen bg-black">
      <header className="relative z-10 px-8 h-20 flex items-center justify-between">
        <Link href="/catalog" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <ArrowLeft className="h-5 w-5 text-white" />
          <span className="text-white">Volver al catálogo</span>
        </Link>

        <div className="flex items-center space-x-3">
          <Film className="h-7 w-7 text-white" />
          <span className="text-xl font-medium text-white">FreeMovies</span>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                {movie.posterUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={movie.posterUrl}
                      alt={`Póster de ${movie.title}`}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${getGenreColor(movie.genre)} flex flex-col items-center justify-center text-center p-8 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-6 left-6 w-8 h-8 border-2 border-white rounded-full"></div>
                      <div className="absolute top-12 right-8 w-6 h-6 border border-white rounded-full"></div>
                      <div className="absolute bottom-8 left-8 w-10 h-10 border border-white rounded-full"></div>
                      <div className="absolute bottom-6 right-6 w-4 h-4 bg-white rounded-full"></div>
                      <div className="absolute top-0 left-1/2 w-px h-full bg-white opacity-10"></div>
                      <div className="absolute left-0 top-1/2 w-full h-px bg-white opacity-10"></div>
                    </div>

                    <div className="mb-6 p-6 bg-white/20 rounded-full border-2 border-white/30">
                      <Film className="h-12 w-12 text-white" />
                    </div>
                    <div className="text-white text-2xl font-bold mb-3 leading-tight">{movie.title}</div>
                    <div className="text-white/80 text-lg mb-2">{movie.year}</div>
                    <div className="text-white/60 text-sm mb-4">{movie.genre}</div>
                    <div className="text-white/50 text-sm">Dir. {movie.director}</div>

                    <div className="absolute top-3 left-3 bg-green-600/80 px-3 py-1.5 rounded-lg text-xs text-white font-medium flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold text-[10px]">CC</span>
                        </div>
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold text-[10px]">PD</span>
                        </div>
                      </div>
                      <span>Dominio Público</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Información detallada */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{movie.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="h-5 w-5" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="h-5 w-5" />
                  <span>{movie.duration}</span>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${getGenreColor(movie.genre)} text-white`}
                >
                  {movie.genre}
                </span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">{movie.description}</p>

              <div className="text-gray-400 mb-6">
                <p>
                  <strong>Director:</strong> {movie.director}
                </p>
                <p>
                  <strong>Año:</strong> {movie.year}
                </p>
                <p>
                  <strong>Duración:</strong> {movie.duration}
                </p>
                <p>
                  <strong>Género:</strong> {movie.genre}
                </p>
              </div>

              {/* Información de licencia */}
              <div className="mb-6">
                <LicenseInfo type="public-domain" />
              </div>

              {movie.videoUrl && (
                <div className="mt-6">
                  <div className="flex items-center space-x-2 text-green-400 mb-2">
                    <Play className="h-5 w-5" />
                    <span className="font-medium">Película disponible para ver</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reproductor de video */}
          {movie.videoUrl ? (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Ver película</h2>
              <VideoPlayer videoUrl={movie.videoUrl} title={movie.title} />
            </div>
          ) : (
            <div className="mb-8 p-8 bg-gray-900 rounded-2xl text-center">
              <Film className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-400 mb-2">Video no disponible</h2>
              <p className="text-gray-500">Esta película aún no tiene un enlace de video configurado.</p>
            </div>
          )}

          {/* Información adicional */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
            <h2 className="text-2xl font-semibold text-white mb-6">Información técnica</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
                  <Film className="h-5 w-5 text-gray-400" />
                  <span>Detalles de la película</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Año de producción</span>
                    <span className="text-white font-medium">{movie.year}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Duración</span>
                    <span className="text-white font-medium">{movie.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Género</span>
                    <span className="text-white font-medium">{movie.genre}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400">Director</span>
                    <span className="text-white font-medium">{movie.director}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4 flex items-center space-x-2">
                  <Play className="h-5 w-5 text-gray-400" />
                  <span>Disponibilidad</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Streaming</span>
                    <span className={`font-medium ${movie.videoUrl ? 'text-green-400' : 'text-red-400'}`}>
                      {movie.videoUrl ? "Disponible" : "No disponible"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400">Calidad</span>
                    <span className="text-white font-medium">Variable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de licencia destacada */}
            <div className="border-t border-gray-800 pt-8">
              <h3 className="text-lg font-medium text-white mb-6 flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span>Licencia y derechos de uso</span>
              </h3>
              
              {/* Logo CC destacado en la sección final */}
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-700/50 rounded-xl p-6 mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-gray-800 font-bold text-lg">CC</span>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-gray-800 font-bold text-lg">PD</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium text-lg mb-1">Creative Commons - Dominio Público</div>
                    <div className="text-gray-300 mb-3">Esta obra forma parte del dominio público mundial</div>
                    <LicenseInfo type="public-domain" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Uso comercial permitido</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Modificación permitida</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Distribución libre</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Sin atribución requerida</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                Esta película forma parte del dominio público, lo que significa que puedes verla, descargarla,
                compartirla y usarla libremente sin restricciones de derechos de autor.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}