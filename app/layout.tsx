import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FreeMovies - Streaming de Cine Clásico",
  description: "Descubre miles de películas clásicas de dominio público. Streaming gratuito de la historia del cine.",
  keywords: "cine clásico, películas gratis, dominio público, streaming, películas antiguas",
  authors: [{ name: "FreeMovies" }],
  openGraph: {
    title: "FreeMovies - Streaming de Cine Clásico",
    description: "Descubre miles de películas clásicas de dominio público",
    type: "website",
    locale: "es_ES",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-black text-white antialiased`}>{children}</body>
    </html>
  )
}
