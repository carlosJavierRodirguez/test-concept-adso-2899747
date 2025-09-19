"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Edit, Trash2, Plus, Film, Tv, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import {
  playlistApi,
  playlistItemApi,
  movieApi,
  seriesApi,
  type Playlist,
  type PlaylistItem,
  type Movie,
  type Series,
} from "@/lib/api"

export default function PlaylistDetailPage() {
  return <PlaylistDetailContent />
}

function PlaylistDetailContent() {
  const params = useParams()
  const router = useRouter()
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [items, setItems] = useState<PlaylistItem[]>([])
  const [moviesData, setMoviesData] = useState<{ [key: string]: Movie }>({})
  const [seriesData, setSeriesData] = useState<{ [key: string]: Series }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const playlistId = params.id as string

  useEffect(() => {
    if (playlistId) {
      loadPlaylistData()
    }
  }, [playlistId])

  const loadPlaylistData = async () => {
    try {
      const [playlistRes, itemsRes] = await Promise.all([
        playlistApi.getById(playlistId),
        playlistItemApi.getByPlaylistId(playlistId),
      ])

      if (playlistRes.data.status) {
        const playlistData = playlistRes.data.data
        setPlaylist(playlistData)
      } else {
        setError("Lista no encontrada")
        return
      }

      if (itemsRes.data.status) {
        const itemsData = itemsRes.data.data
        setItems(itemsData)

        // Load movie and series data
        const movieIds = itemsData.filter((item) => item.movieId).map((item) => item.movieId!)
        const seriesIds = itemsData.filter((item) => item.seriesId).map((item) => item.seriesId!)

        const moviePromises = movieIds.map((id) => movieApi.getById(id))
        const seriesPromises = seriesIds.map((id) => seriesApi.getById(id))

        const [movieResults, seriesResults] = await Promise.all([
          Promise.allSettled(moviePromises),
          Promise.allSettled(seriesPromises),
        ])

        const movies: { [key: string]: Movie } = {}
        const series: { [key: string]: Series } = {}

        movieResults.forEach((result, index) => {
          if (result.status === "fulfilled" && result.value.data.status) {
            movies[movieIds[index]] = result.value.data.data
          }
        })

        seriesResults.forEach((result, index) => {
          if (result.status === "fulfilled" && result.value.data.status) {
            series[seriesIds[index]] = result.value.data.data
          }
        })

        setMoviesData(movies)
        setSeriesData(series)
      }
    } catch (err) {
      setError("Error al cargar la lista")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("¿Quieres eliminar este elemento de la lista?")) return

    try {
      await playlistItemApi.delete(itemId)
      setItems(items.filter((item) => item.id !== itemId))
    } catch (err) {
      setError("Error al eliminar el elemento")
    }
  }

  const handleDeletePlaylist = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta lista completa?")) return

    try {
      await playlistApi.delete(playlistId)
      router.push("/playlists")
    } catch (err) {
      setError("Error al eliminar la lista")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando lista...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !playlist) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert variant="destructive">
            <AlertDescription>{error || "Lista no encontrada"}</AlertDescription>
          </Alert>
          <Button className="mt-4" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a mis listas
        </Button>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Playlist Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{playlist.name}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <span>
                {items.length} elemento{items.length !== 1 ? "s" : ""}
              </span>
              <Badge variant={playlist.status ? "default" : "secondary"}>
                {playlist.status ? "Activa" : "Inactiva"}
              </Badge>
            </div>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" asChild>
              <Link href={`/playlists/${playlist.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Link>
            </Button>
            <Button variant="outline" onClick={handleDeletePlaylist} className="text-destructive bg-transparent">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar Lista
            </Button>
          </div>
        </div>

        {/* Add Content Button */}
        <div className="mb-6">
          <Button asChild>
            <Link href={`/catalog?addToPlaylist=${playlist.id}`}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Contenido
            </Link>
          </Button>
        </div>

        {/* Playlist Items */}
        {items.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Film className="h-16 w-16 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Lista vacía</h2>
                <p>Esta lista no tiene contenido aún. Agrega películas y series para comenzar.</p>
              </div>
              <Button asChild>
                <Link href={`/catalog?addToPlaylist=${playlist.id}`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar contenido
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
              const movie = item.movieId ? moviesData[item.movieId] : null
              const series = item.seriesId ? seriesData[item.seriesId] : null
              const content = movie || series

              if (!content) return null

              return (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-[2/3] bg-muted rounded-t-lg relative overflow-hidden">
                    <img
                      src={
                        movie
                          ? "/generic-movie-poster.png"
                          : "/tv-series-poster-.jpg"
                      }
                      alt={content.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div className="flex space-x-2">
                        <Button size="sm" asChild>
                          <Link href={movie ? `/catalog/movie/${movie.id}` : `/catalog/series/${series!.id}`}>
                            Ver Detalles
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteItem(item.id)}
                          className="opacity-90"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-1">{content.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{content.synopsis}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <div className="flex items-center">
                        {movie ? (
                          <>
                            <Film className="h-3 w-3 mr-1" />
                            <Calendar className="h-3 w-3 mr-1 ml-2" />
                            {movie.releaseYear}
                          </>
                        ) : (
                          <>
                            <Tv className="h-3 w-3 mr-1" />
                            {series!.seasons} temporada{series!.seasons !== 1 ? "s" : ""}
                          </>
                        )}
                      </div>
                      {movie && (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {movie.duration} min
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Agregado: {new Date(item.addedAt).toLocaleDateString("es-ES")}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
