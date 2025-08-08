import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FreeMovies - Streaming de Cine Clásico",
  description: "Descubre películas clásicas de dominio público. Streaming gratuito de la historia del cine.",
  keywords: "cine clásico, películas gratis, dominio público, streaming, películas antiguas, free movies, classic cinema, public domain films, streaming gratuito, historia del cine, películas de culto, cine mudo, películas clásicas, cine de culto, películas históricas, películas de dominio público, cine clásico online, streaming de cine clásico, películas clásicas gratis",
  authors: [{ name: "Lautaro Emalhao" }],
  openGraph: {
    title: "FreeMovies - Streaming de Cine Clásico",
    description: "Descubre películas clásicas de dominio público",
    type: "website",
    locale: "es_ES",
  },
    generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
       <head>
        {/* Opcionales extra */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>{children}</body>
    </html>
  )
}
