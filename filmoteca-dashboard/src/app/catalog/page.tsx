"use client"
import { Tv } from "lucide-react" // Import Tv icon

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Clock, Calendar, Play, Plus } from "lucide-react"
import Link from "next/link"
import {
  movieApi,
  seriesApi,
  genreApi,
  directorApi,
  type Movie,
  type Series,
  type Genre,
  type Director,
} from "@/lib/api"

export default function CatalogPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [directors, setDirectors] = useState<Director[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [selectedDirector, setSelectedDirector] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("movies")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [moviesRes, seriesRes, genresRes, directorsRes] = await Promise.all([
        movieApi.getAll(),
        seriesApi.getAll(),
        genreApi.getAll(),
        directorApi.getAll(),
      ])

      if (moviesRes.data.status) setMovies(moviesRes.data.data)
      if (seriesRes.data.status) setSeries(seriesRes.data.data)
      if (genresRes.data.status) setGenres(genresRes.data.data)
      if (directorsRes.data.status) setDirectors(directorsRes.data.data)
    } catch (error) {
      console.error("Error loading catalog data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.synopsis.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "all" || movie.genreId === selectedGenre
    const matchesDirector = selectedDirector === "all" || movie.directorId === selectedDirector
    return matchesSearch && matchesGenre && matchesDirector && movie.status
  })

  const filteredSeries = series.filter((show) => {
    const matchesSearch =
      show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      show.synopsis.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "all" || show.genreId === selectedGenre
    const matchesDirector = selectedDirector === "all" || show.directorId === selectedDirector
    return matchesSearch && matchesGenre && matchesDirector && show.status
  })

  const getGenreName = (genreId: string) => {
    return genres.find((g) => g.id === genreId)?.name || "Desconocido"
  }

  const getDirectorName = (directorId: string) => {
    return directors.find((d) => d.id === directorId)?.name || "Desconocido"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando catálogo...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Catálogo</h1>
          <p className="text-muted-foreground">Explora nuestra colección de películas y series</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar películas y series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los géneros</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDirector} onValueChange={setSelectedDirector}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Director" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los directores</SelectItem>
                  {directors.map((director) => (
                    <SelectItem key={director.id} value={director.id}>
                      {director.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="movies">Películas ({filteredMovies.length})</TabsTrigger>
            <TabsTrigger value="series">Series ({filteredSeries.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="movies" className="mt-6">
            {filteredMovies.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron películas con los filtros seleccionados</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    genreName={getGenreName(movie.genreId)}
                    directorName={getDirectorName(movie.directorId)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="series" className="mt-6">
            {filteredSeries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron series con los filtros seleccionados</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSeries.map((show) => (
                  <SeriesCard
                    key={show.id}
                    series={show}
                    genreName={getGenreName(show.genreId)}
                    directorName={getDirectorName(show.directorId)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function MovieCard({ movie, genreName, directorName }: { movie: Movie; genreName: string; directorName: string }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-[2/3] bg-muted rounded-t-lg relative overflow-hidden">
        <img
          src="/generic-movie-poster.png"
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button size="sm" asChild>
              <Link href={`/catalog/movie/${movie.id}`}>
                <Play className="h-4 w-4 mr-1" />
                Ver Detalles
              </Link>
            </Button>
            <Button size="sm" variant="secondary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{movie.title}</CardTitle>
        <CardDescription className="line-clamp-2">{movie.synopsis}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {movie.releaseYear}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {movie.duration} min
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="secondary" className="text-xs">
            {genreName}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">Dir: {directorName}</p>
      </CardContent>
    </Card>
  )
}

function SeriesCard({ series, genreName, directorName }: { series: Series; genreName: string; directorName: string }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-[2/3] bg-muted rounded-t-lg relative overflow-hidden">
        <img
          src="/tv-series-poster-.jpg"
          alt={series.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button size="sm" asChild>
              <Link href={`/catalog/series/${series.id}`}>
                <Play className="h-4 w-4 mr-1" />
                Ver Detalles
              </Link>
            </Button>
            <Button size="sm" variant="secondary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-1">{series.title}</CardTitle>
        <CardDescription className="line-clamp-2">{series.synopsis}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <div className="flex items-center">
            <Tv className="h-3 w-3 mr-1" />
            {series.seasons} temporada{series.seasons !== 1 ? "s" : ""}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge variant="secondary" className="text-xs">
            {genreName}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">Dir: {directorName}</p>
      </CardContent>
    </Card>
  )
}
