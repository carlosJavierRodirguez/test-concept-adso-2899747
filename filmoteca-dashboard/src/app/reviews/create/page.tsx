"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2, Star, Film, Tv } from "lucide-react"
import { reviewApi, movieApi, seriesApi, type Movie, type Series } from "@/lib/api"

export default function CreateReviewPage() {
  return <CreateReviewContent />
}

function CreateReviewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(5)
  const [selectedMovieId, setSelectedMovieId] = useState<string>("")
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState("")

  // Get pre-selected content from URL params
  const movieId = searchParams.get("movieId")
  const seriesId = searchParams.get("seriesId")

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (movieId) {
      setSelectedMovieId(movieId)
      setSelectedSeriesId("")
    } else if (seriesId) {
      setSelectedSeriesId(seriesId)
      setSelectedMovieId("")
    }
  }, [movieId, seriesId])

  const loadData = async () => {
    try {
      const [moviesRes, seriesRes] = await Promise.all([movieApi.getAll(), seriesApi.getAll()])

      if (moviesRes.data.status) {
        setMovies(moviesRes.data.data.filter((m) => m.status))
      }
      if (seriesRes.data.status) {
        setSeries(seriesRes.data.data.filter((s) => s.status))
      }
    } catch (err) {
      setError("Error al cargar el contenido")
    } finally {
      setDataLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedMovieId && !selectedSeriesId) {
      setError("Debes seleccionar una película o serie")
      return
    }

    setLoading(true)
    setError("")

    try {
      const reviewData = {
        content,
        rating,
        date: new Date().toISOString(),
        userId: "1", // Using mock user ID since authentication is removed
        status: true,
        ...(selectedMovieId ? { movieId: selectedMovieId } : {}),
        ...(selectedSeriesId ? { seriesId: selectedSeriesId } : {}),
      }

      const response = await reviewApi.create(reviewData)

      if (response.data.status) {
        router.push("/reviews")
      } else {
        setError(response.data.message)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear la reseña")
    } finally {
      setLoading(false)
    }
  }

  const selectedContent = selectedMovieId
    ? movies.find((m) => m.id === selectedMovieId)
    : selectedSeriesId
      ? series.find((s) => s.id === selectedSeriesId)
      : null

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <Card>
          <CardHeader className="text-center">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Escribir Reseña</CardTitle>
            <CardDescription>Comparte tu opinión sobre una película o serie</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Content Selection */}
              <div className="space-y-4">
                <Label>Selecciona el contenido a reseñar</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="movie">Película</Label>
                    <Select
                      value={selectedMovieId}
                      onValueChange={(value) => {
                        setSelectedMovieId(value)
                        setSelectedSeriesId("")
                      }}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar película" />
                      </SelectTrigger>
                      <SelectContent>
                        {movies.map((movie) => (
                          <SelectItem key={movie.id} value={movie.id}>
                            {movie.title} ({movie.releaseYear})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="series">Serie</Label>
                    <Select
                      value={selectedSeriesId}
                      onValueChange={(value) => {
                        setSelectedSeriesId(value)
                        setSelectedMovieId("")
                      }}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar serie" />
                      </SelectTrigger>
                      <SelectContent>
                        {series.map((show) => (
                          <SelectItem key={show.id} value={show.id}>
                            {show.title} ({show.seasons} temporadas)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Selected Content Preview */}
                {selectedContent && (
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-16 bg-muted rounded overflow-hidden">
                          <img
                            src={
                              selectedMovieId
                                ? "/generic-movie-poster.png"
                                : "/tv-series-poster-.jpg"
                            }
                            alt={selectedContent.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            {selectedMovieId ? (
                              <Film className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Tv className="h-4 w-4 text-muted-foreground" />
                            )}
                            <h3 className="font-medium">{selectedContent.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{selectedContent.synopsis}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Calificación</Label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                      disabled={loading}
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">{rating}/5 estrellas</span>
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Tu reseña *</Label>
                <Textarea
                  id="content"
                  placeholder="Escribe tu opinión sobre esta película o serie..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  disabled={loading}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Comparte tus pensamientos, lo que te gustó o no te gustó, y por qué lo recomendarías o no.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading || !content.trim() || (!selectedMovieId && !selectedSeriesId)}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publicando reseña...
                    </>
                  ) : (
                    "Publicar Reseña"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
