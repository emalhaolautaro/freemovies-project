"use client"

import { useState, useMemo } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getGenres, filterMoviesByGenre, movies } from "@/data/movies"
import MovieCarousel from "@/components/MovieCarousel"
import GenreFilter from "@/components/GenreFilter"
import SearchBar from "@/components/SearchBar"
import SearchSuggestion from "@/components/SearchSuggestion"
import NotFoundPage from "@/components/NotFoundPage"
import Footer from "@/components/Footer"
import { findSuggestion } from "@/utils/search"
import DiscoverButton from "@/components/DiscoverButton"

export default function CatalogPage() {
  const [selectedGenre, setSelectedGenre] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotFound, setShowNotFound] = useState(false)

  const genres = getGenres()

  // Obtener todos los títulos para sugerencias
  const allTitles = useMemo(() => movies.map((movie) => movie.title), [])

  // Filtrar películas por género y búsqueda
  const filteredMovies = useMemo(() => {
    let result = filterMoviesByGenre(selectedGenre)

    if (searchQuery.trim()) {
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return result
  }, [selectedGenre, searchQuery])

  // Verificar si mostrar sugerencia
  const suggestion = useMemo(() => {
    if (searchQuery.trim() && filteredMovies.length === 0) {
      return findSuggestion(searchQuery, allTitles, 0.3)
    }
    return null
  }, [searchQuery, filteredMovies.length, allTitles])

  // Agrupar películas por género para el carousel
  const moviesByGenre = useMemo(() => {
    const grouped: { [key: string]: typeof movies } = {}

    if (searchQuery.trim()) {
      // Si hay búsqueda, mostrar solo resultados
      return { "Resultados de búsqueda": filteredMovies }
    }

    if (selectedGenre === "Todos") {
      // Agrupar por género
      genres.slice(1).forEach((genre) => {
        grouped[genre] = movies.filter((movie) => movie.genre === genre)
      })
    } else {
      // Mostrar solo el género seleccionado
      grouped[selectedGenre] = filteredMovies
    }

    return grouped
  }, [selectedGenre, searchQuery, filteredMovies, genres])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setShowNotFound(false)

    // Si hay búsqueda y no hay resultados, mostrar página de error después de un delay
    if (query.trim() && filteredMovies.length === 0) {
      setTimeout(() => setShowNotFound(true), 300)
    }
  }

  const handleAcceptSuggestion = (suggestedTitle: string) => {
    setSearchQuery(suggestedTitle)
    setShowNotFound(false)
  }

  const handleBackToSearch = () => {
    setSearchQuery("")
    setShowNotFound(false)
    setSelectedGenre("Todos")
  }

  // Si hay búsqueda sin resultados pero con sugerencia, mostrar sugerencia
  if (searchQuery.trim() && filteredMovies.length === 0 && suggestion && !showNotFound) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Header */}
        <header className="relative z-10 px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 text-white" />
            <span className="text-white">Volver</span>
          </Link>
          <div className="flex items-center space-x-3">
            <span className="text-xl font-medium text-white">FreeMovies</span>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="flex-1">
          {/* Título y búsqueda */}
          <div className="px-8 py-12">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-8 text-center">
              Catálogo de Películas Clásicas
            </h1>
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* Sugerencia */}
          <SearchSuggestion
            originalQuery={searchQuery}
            suggestedTitle={suggestion}
            onAcceptSuggestion={handleAcceptSuggestion}
          />

          {/* Botón para mostrar página de error */}
          <div className="text-center px-8">
            <button
              onClick={() => setShowNotFound(true)}
              className="text-gray-400 hover:text-white transition-colors text-sm underline"
            >
              No, busco exactamente "{searchQuery}"
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer searchQuery={searchQuery} movieCount={filteredMovies.length} />
      </div>
    )
  }

  // Si hay búsqueda sin resultados y sin sugerencia, mostrar página de error
  if (searchQuery.trim() && filteredMovies.length === 0 && showNotFound) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Header */}
        <header className="relative z-10 px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 text-white" />
            <span className="text-white">Volver</span>
          </Link>
          <div className="flex items-center space-x-3">
            <span className="text-xl font-medium text-white">FreeMovies</span>
          </div>
        </header>

        <div className="flex-1">
          <NotFoundPage searchQuery={searchQuery} onBackToSearch={handleBackToSearch} />
        </div>

        {/* Footer */}
        <Footer searchQuery={searchQuery} movieCount={0} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header con navegación */}
      <header className="relative z-10 px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <ArrowLeft className="h-5 w-5 text-white" />
          <span className="text-white">Volver</span>
        </Link>

        <div className="flex items-center space-x-3">
          <span className="text-xl font-medium text-white">FreeMovies</span>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="flex-1">
        {/* Título y búsqueda */}
        <div className="px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-8 text-center">Catálogo de Películas Clásicas</h1>

          {/* Barra de búsqueda */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          <p className="text-gray-400 text-lg text-center">
            {searchQuery ? (
              <>
                Resultados para "{searchQuery}" • {filteredMovies.length} película{filteredMovies.length !== 1 ? "s" : ""}
              </>
            ) : (
              <>
                Descubre joyas del cine de dominio público
                {selectedGenre !== "Todos" && <span className="ml-2 text-white">• {selectedGenre}</span>}
              </>
            )}
          </p>
        </div>

        {/* BOTÓN DESCUBRIR: solo si no hay búsqueda */}
        {!searchQuery && (
          <div className="flex justify-center mb-6">
            <DiscoverButton />
          </div>
        )}

        {/* Filtro de géneros (solo si no hay búsqueda) */}
        {!searchQuery && (
          <GenreFilter genres={genres} selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
        )}

        {/* Carousels de películas */}
        <main className="py-12 space-y-12">
          {Object.entries(moviesByGenre).map(
            ([genreName, genreMovies]) =>
              genreMovies.length > 0 && <MovieCarousel key={genreName} title={genreName} movies={genreMovies} />,
          )}
        </main>
      </div>

      {/* Footer con botón de donación */}
      <Footer searchQuery={searchQuery} movieCount={filteredMovies.length} />
    </div>
  )
}