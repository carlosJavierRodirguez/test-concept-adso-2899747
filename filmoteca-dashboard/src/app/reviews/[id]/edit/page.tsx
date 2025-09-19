"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, Star, Film, Tv } from "lucide-react"
import { reviewApi, movieApi, seriesApi, type Review, type Movie, type Series } from "@/lib/api"

export default function EditReviewPage() {
  return <EditReviewContent />
}

function EditReviewContent() {
  const params = useParams()
  const router = useRouter()
  const [review, setReview] = useState<Review | null>(null)
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(5)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [series, setSeries] = useState<Series | null>(null)
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [error, setError] = useState("")

  const reviewId = params.id as string

  useEffect(() => {
    if (reviewId) {
      loadReview()
    }
  }, [reviewId])

  const loadReview = async () => {
    try {
      const response = await reviewApi.getById(reviewId)
      if (response.data.status) {
        const reviewData = response.data.data

        setReview(reviewData)
        setContent(reviewData.content)
        setRating(reviewData.rating)

        // Load movie or series data
        if (reviewData.movieId) {
          const movieRes = await movieApi.getById(reviewData.movieId)
          if (movieRes.data.status) {
            setMovie(movieRes.data.data)
          }
        } else if (reviewData.seriesId) {
          const seriesRes = await seriesApi.getById(reviewData.seriesId)
          if (seriesRes.data.status) {
            setSeries(seriesRes.data.data)
          }
        }
      } else {
        setError("Reseña no encontrada")
      }
    } catch (err) {
      setError("Error al cargar la reseña")
    } finally {
      setDataLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!review) return

    setLoading(true)
    setError("")

    try {
      const response = await reviewApi.update(review.id, {
        content,
        rating,
      })

      if (response.data.status) {
        router.push("/reviews")
      } else {
        setError(response.data.message)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al actualizar la reseña")
    } finally {
      setLoading(false)
    }
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando reseña...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !review) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert variant="destructive">
            <AlertDescription>{error || "Reseña no encontrada"}</AlertDescription>
          </Alert>
          <Button className="mt-4" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    )
  }

  const selectedContent = movie || series

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a mis reseñas
        </Button>

        <Card>
          <CardHeader className="text-center">
            <Star className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Editar Reseña</CardTitle>
            <CardDescription>Actualiza tu opinión sobre este contenido</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Content Preview */}
              {selectedContent && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-16 bg-muted rounded overflow-hidden">
                        <img
                          src={
                            movie
                              ? "/generic-movie-poster.png"
                              : "/tv-series-poster-.jpg"
                          }
                          alt={selectedContent.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          {movie ? (
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
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={loading || !content.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Actualizando reseña...
                    </>
                  ) : (
                    "Actualizar Reseña"
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
