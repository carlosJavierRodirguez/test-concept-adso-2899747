"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Calendar, Clock, Star, Plus, Play, User } from "lucide-react"
import Link from "next/link"
import {
  movieApi,
  reviewApi,
  genreApi,
  directorApi,
  type Movie,
  type Review,
  type Genre,
  type Director,
} from "@/lib/api"

export default function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [genre, setGenre] = useState<Genre | null>(null)
  const [director, setDirector] = useState<Director | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const movieId = params.id as string

  useEffect(() => {
    if (movieId) {
      loadMovieData()
    }
  }, [movieId])

  const loadMovieData = async () => {
    try {
      const [movieRes, reviewsRes] = await Promise.all([movieApi.getById(movieId), reviewApi.getByMovieId(movieId)])

      if (movieRes.data.status) {
        const movieData = movieRes.data.data
        setMovie(movieData)

        // Load genre and director details
        const [genreRes, directorRes] = await Promise.all([
          genreApi.getById(movieData.genreId),
          directorApi.getById(movieData.directorId),
        ])

        if (genreRes.data.status) setGenre(genreRes.data.data)
        if (directorRes.data.status) setDirector(directorRes.data.data)
      } else {
        setError("Película no encontrada")
      }

      if (reviewsRes.data.status) {
        setReviews(reviewsRes.data.data)
      }
    } catch (err) {
      setError("Error al cargar los datos de la película")
    } finally {
      setLoading(false)
    }
  }

  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando película...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert variant="destructive">
            <AlertDescription>{error || "Película no encontrada"}</AlertDescription>
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
          Volver al catálogo
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="aspect-[2/3] bg-muted rounded-lg overflow-hidden">
              <img
                src="/generic-movie-poster.png"
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {movie.releaseYear}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {movie.duration} minutos
                </div>
                {reviews.length > 0 && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {averageRating.toFixed(1)} ({reviews.length} reseña{reviews.length !== 1 ? "s" : ""})
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {genre && <Badge variant="secondary">{genre.name}</Badge>}
                <Badge variant="outline">Película</Badge>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Sinopsis</h2>
              <p className="text-muted-foreground leading-relaxed">{movie.synopsis}</p>
            </div>

            {director && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Director</h2>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{director.name}</span>
                  {director.nationality && (
                    <Badge variant="outline" className="text-xs">
                      {director.nationality}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button size="lg">
                <Play className="h-4 w-4 mr-2" />
                Reproducir
              </Button>
              <Button size="lg" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Agregar a Lista
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/reviews/create?movieId=${movie.id}`}>
                  <Star className="h-4 w-4 mr-2" />
                  Escribir Reseña
                </Link>
              </Button>
            </div>

            <Separator />

            {/* Reviews Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Reseñas {reviews.length > 0 && `(${reviews.length})`}</h2>

              {reviews.length === 0 ? (
                <p className="text-muted-foreground">No hay reseñas aún. ¡Sé el primero en escribir una!</p>
              ) : (
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Usuario</CardTitle>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <CardDescription>{new Date(review.date).toLocaleDateString("es-ES")}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{review.content}</p>
                      </CardContent>
                    </Card>
                  ))}

                  {reviews.length > 3 && (
                    <Button variant="outline" asChild>
                      <Link href={`/reviews?movieId=${movie.id}`}>Ver todas las reseñas ({reviews.length})</Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
