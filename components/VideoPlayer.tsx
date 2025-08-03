"use client"

interface VideoPlayerProps {
  videoUrl: string
  title: string
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  // Función para convertir URLs a formato embed
  const getEmbedUrl = (url: string): string => {
    // YouTube
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }

    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0]
      return `https://www.youtube.com/embed/${videoId}`
    }

    // Archive.org - múltiples formatos
    if (url.includes("archive.org")) {
      // Si ya es embed, usarlo directamente
      if (url.includes("/embed/")) {
        return url
      }

      // Si es details, convertir a embed
      if (url.includes("/details/")) {
        const identifier = url.split("details/")[1]?.split("/")[0]?.split("?")[0]
        return `https://archive.org/embed/${identifier}`
      }

      // Si solo tiene el identificador, crear embed
      const parts = url.split("/")
      const identifier = parts[parts.length - 1]?.split("?")[0]
      if (identifier) {
        return `https://archive.org/embed/${identifier}`
      }
    }

    // Para otros sitios, usar directamente
    return url
  }

  const embedUrl = getEmbedUrl(videoUrl)

  const handleIframeError = () => {
    console.log("Error loading video, trying alternative URL...")
    // Podrías implementar URLs alternativas aquí
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        onError={handleIframeError}
      />
    </div>
  )
}
