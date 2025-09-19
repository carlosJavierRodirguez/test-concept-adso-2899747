import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Providers } from "@/lib/providers"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Film Library - Gestión de Filmoteca",
  description: "Sistema completo de gestión de filmoteca con películas, series, reseñas y listas de reproducción",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
          </Suspense>
          <main>{children}</main>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
