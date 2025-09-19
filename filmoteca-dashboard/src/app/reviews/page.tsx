"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, Search, Edit, Trash2, Film, Tv, Plus, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { reviewApi, movieApi, seriesApi, handleApiError, type Review, type Movie, type Series } from "@/lib/api"

export default function ReviewsPage() {
  return <ReviewsContent />
}

function ReviewsContent() {
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch reviews from API
  const reviewsQuery = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await reviewApi.getAll()
      return response.data
    },
  })

  // Fetch movies data
  const moviesQuery = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await movieApi.getAll()
      return response.data
    },
  })

  // Fetch series data
  const seriesQuery = useQuery({
    queryKey: ['series'],
    queryFn: async () => {
      const response = await seriesApi.getAll()
      return response.data
    },
  })

  // Create lookup maps for movies and series
  const moviesData = moviesQuery.data?.status ?
    moviesQuery.data.data.reduce((acc, movie) => {
      acc[movie.id] = movie
      return acc
    }, {} as { [key: string]: Movie }) : {}

  const seriesData = seriesQuery.data?.status ?
    seriesQuery.data.data.reduce((acc, series) => {
      acc[series.id] = series
      return acc
    }, {} as { [key: string]: Series }) : {}

  // Get reviews data
  const allReviews = reviewsQuery.data?.status ? reviewsQuery.data.data : []

  // Check loading states
  const isLoading = reviewsQuery.isLoading || moviesQuery.isLoading || seriesQuery.isLoading

  // Check error states
  const hasError = reviewsQuery.isError || moviesQuery.isError || seriesQuery.isError
  const errorMessage = reviewsQuery.error ? handleApiError(reviewsQuery.error) :
                     moviesQuery.error ? handleApiError(moviesQuery.error) :
                     seriesQuery.error ? handleApiError(seriesQuery.error) : ""

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta reseña?")) return

    try {
      await reviewApi.delete(reviewId)
      // Invalidate and refetch reviews
      reviewsQuery.refetch()
    } catch (err) {
      console.error("Error deleting review:", err)
    }
  }

  const filteredAllReviews = allReviews.filter((review) => {
    const movie = review.movieId ? moviesData[review.movieId] : null
    const series = review.seriesId ? seriesData[review.seriesId] : null
    const title = movie?.title || series?.title || ""
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando reseñas...</p>
          </div>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error al cargar las reseñas: {errorMessage}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Reseñas</h1>
            <p className="text-muted-foreground">Descubre opiniones sobre películas y series</p>
          </div>
          <Button asChild>
            <Link href="/reviews/create">
              <Plus className="h-4 w-4 mr-2" />
              Escribir Reseña
            </Link>
          </Button>
        </div>


        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar reseñas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Reviews List */}
        {filteredAllReviews.length === 0 ? (
          <div className="text-center py-12">
            <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              {searchTerm ? "No se encontraron reseñas" : "No hay reseñas disponibles"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Intenta con otros términos de búsqueda" : "Sé el primero en escribir una reseña"}
            </p>
            {!searchTerm && (
              <Button asChild>
                <Link href="/reviews/create">Escribir primera reseña</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAllReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                movie={review.movieId ? moviesData[review.movieId] : undefined}
                series={review.seriesId ? seriesData[review.seriesId] : undefined}
                showActions={true}
                onDelete={() => handleDeleteReview(review.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface ReviewCardProps {
  review: Review
  movie?: Movie
  series?: Series
  showActions: boolean
  onDelete?: () => void
}

function ReviewCard({ review, movie, series, showActions, onDelete }: ReviewCardProps) {
  const content = movie || series
  if (!content) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
              <img
                src={
                  movie
                    ? "/generic-movie-poster.png"
                    : "/tv-series-poster-.jpg"
                }
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Link
                  href={movie ? `/catalog/movie/${movie.id}` : `/catalog/series/${series!.id}`}
                  className="hover:underline"
                >
                  <CardTitle className="text-lg">{content.title}</CardTitle>
                </Link>
                <Badge variant="outline" className="text-xs">
                  {movie ? <Film className="h-3 w-3 mr-1" /> : <Tv className="h-3 w-3 mr-1" />}
                  {movie ? "Película" : "Serie"}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2">{review.rating}/5</span>
                </div>
                <span>Por Usuario</span>
                <span>{new Date(review.date).toLocaleDateString("es-ES")}</span>
              </div>
            </div>
          </div>
          {showActions && (
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" asChild>
                <Link href={`/reviews/${review.id}/edit`}>
                  <Edit className="h-3 w-3 mr-1" />
                  Editar
                </Link>
              </Button>
              <Button size="sm" variant="outline" onClick={onDelete} className="text-destructive bg-transparent">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground leading-relaxed">{review.content}</p>
      </CardContent>
    </Card>
  )
}
