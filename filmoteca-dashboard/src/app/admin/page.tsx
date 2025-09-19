"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Film, Tv, Users, Star, BarChart3, TrendingUp, AlertCircle } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  movieApi,
  seriesApi,
  userApi,
  reviewApi,
  directorApi,
  genreApi,
  playlistApi,
  handleApiError,
  type Movie,
  type Series,
  type User,
  type Review,
  type Playlist,
} from "@/lib/api"

export default function AdminPage() {
  return <AdminContent />
}

function AdminContent() {
  // Fetch all data using React Query
  const moviesQuery = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await movieApi.getAll()
      return response.data
    },
  })

  const seriesQuery = useQuery({
    queryKey: ['series'],
    queryFn: async () => {
      const response = await seriesApi.getAll()
      return response.data
    },
  })

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await userApi.getAll()
      return response.data
    },
  })

  const reviewsQuery = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const response = await reviewApi.getAll()
      return response.data
    },
  })

  const directorsQuery = useQuery({
    queryKey: ['directors'],
    queryFn: async () => {
      const response = await directorApi.getAll()
      return response.data
    },
  })

  const genresQuery = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const response = await genreApi.getAll()
      return response.data
    },
  })

  const playlistsQuery = useQuery({
    queryKey: ['playlists'],
    queryFn: async () => {
      const response = await playlistApi.getAll()
      return response.data
    },
  })

  // Calculate stats
  const stats = {
    movies: moviesQuery.data?.status ? moviesQuery.data.data.length : 0,
    series: seriesQuery.data?.status ? seriesQuery.data.data.length : 0,
    users: usersQuery.data?.status ? usersQuery.data.data.length : 0,
    reviews: reviewsQuery.data?.status ? reviewsQuery.data.data.length : 0,
    directors: directorsQuery.data?.status ? directorsQuery.data.data.length : 0,
    genres: genresQuery.data?.status ? genresQuery.data.data.length : 0,
    playlists: playlistsQuery.data?.status ? playlistsQuery.data.data.length : 0,
  }

  // Get recent items
  const recentMovies = moviesQuery.data?.status ? moviesQuery.data.data.slice(-10).reverse() : []
  const recentSeries = seriesQuery.data?.status ? seriesQuery.data.data.slice(-5).reverse() : []
  const recentUsers = usersQuery.data?.status ? usersQuery.data.data.slice(-5).reverse() : []
  const recentReviews = reviewsQuery.data?.status ? reviewsQuery.data.data.slice(-5).reverse() : []

  // Process chart data
  const genreData = genresQuery.data?.status ? genresQuery.data.data.map(genre => ({
    name: genre.name,
    count: moviesQuery.data?.status ?
      moviesQuery.data.data.filter(movie => movie.genreId === genre.id).length : 0
  })) : []

  const ratingData = reviewsQuery.data?.status ? [
    { name: '1 estrella', count: reviewsQuery.data.data.filter(r => r.rating === 1).length },
    { name: '2 estrellas', count: reviewsQuery.data.data.filter(r => r.rating === 2).length },
    { name: '3 estrellas', count: reviewsQuery.data.data.filter(r => r.rating === 3).length },
    { name: '4 estrellas', count: reviewsQuery.data.data.filter(r => r.rating === 4).length },
    { name: '5 estrellas', count: reviewsQuery.data.data.filter(r => r.rating === 5).length },
  ] : []

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  // Check if any query is loading
  const isLoading = moviesQuery.isLoading || seriesQuery.isLoading || usersQuery.isLoading ||
                   reviewsQuery.isLoading || directorsQuery.isLoading || genresQuery.isLoading ||
                   playlistsQuery.isLoading

  // Check if any query has error
  const hasError = moviesQuery.isError || seriesQuery.isError || usersQuery.isError ||
                  reviewsQuery.isError || directorsQuery.isError || genresQuery.isError ||
                  playlistsQuery.isError

  const errorMessage = moviesQuery.error ? handleApiError(moviesQuery.error) :
                     seriesQuery.error ? handleApiError(seriesQuery.error) :
                     usersQuery.error ? handleApiError(usersQuery.error) :
                     reviewsQuery.error ? handleApiError(reviewsQuery.error) :
                     directorsQuery.error ? handleApiError(directorsQuery.error) :
                     genresQuery.error ? handleApiError(genresQuery.error) :
                     playlistsQuery.error ? handleApiError(playlistsQuery.error) : ""

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando panel de administración...</p>
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
              Error al cargar los datos: {errorMessage}
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona el contenido y usuarios de la plataforma</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Películas</CardTitle>
              <Film className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.movies}</div>
              <p className="text-xs text-muted-foreground">total en catálogo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Series</CardTitle>
              <Tv className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.series}</div>
              <p className="text-xs text-muted-foreground">total en catálogo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
              <p className="text-xs text-muted-foreground">registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reseñas</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reviews}</div>
              <p className="text-xs text-muted-foreground">publicadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Directores</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.directors}</div>
              <p className="text-xs text-muted-foreground">en base de datos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Géneros</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.genres}</div>
              <p className="text-xs text-muted-foreground">disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Listas</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.playlists}</div>
              <p className="text-xs text-muted-foreground">de reproducción</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Género</CardTitle>
              <CardDescription>Películas por género disponible</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={genreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Calificaciones</CardTitle>
              <CardDescription>Reseñas por calificación</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ratingData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {ratingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="movies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="movies">Películas</TabsTrigger>
            <TabsTrigger value="series">Series</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            <TabsTrigger value="playlists">Listas</TabsTrigger>
          </TabsList>

          <TabsContent value="movies">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Películas</CardTitle>
                <CardDescription>Administra el catálogo de películas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">Películas recientes agregadas:</div>
                  {recentMovies.length === 0 ? (
                    <p className="text-muted-foreground">No hay películas recientes</p>
                  ) : (
                    <div className="space-y-2">
                      {recentMovies.map((movie) => (
                        <div key={movie.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{movie.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {movie.releaseYear} • {movie.duration} min
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">{movie.status}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="series">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Series</CardTitle>
                <CardDescription>Administra el catálogo de series</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">Series recientes agregadas:</div>
                  {recentSeries.length === 0 ? (
                    <p className="text-muted-foreground">No hay series recientes</p>
                  ) : (
                    <div className="space-y-2">
                      {recentSeries.map((show) => (
                        <div key={show.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{show.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {show.seasons} temporada{show.seasons !== 1 ? "s" : ""}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">{show.status}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>Administra los usuarios de la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">Usuarios recientes registrados:</div>
                  {recentUsers.length === 0 ? (
                    <p className="text-muted-foreground">No hay usuarios recientes</p>
                  ) : (
                    <div className="space-y-2">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                           <div className="text-sm text-muted-foreground capitalize">user</div>
                           <div className="text-sm text-muted-foreground capitalize">{user.status ? "activo" : "inactivo"}</div>
                         </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Reseñas</CardTitle>
                <CardDescription>Modera las reseñas de usuarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">Reseñas recientes:</div>
                  {recentReviews.length === 0 ? (
                    <p className="text-muted-foreground">No hay reseñas recientes</p>
                  ) : (
                    <div className="space-y-2">
                      {recentReviews.map((review: Review) => (
                        <div key={review.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">Usuario</h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString("es-ES")}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playlists">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Listas de Reproducción</CardTitle>
                <CardDescription>Administra las listas de reproducción de usuarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">Listas recientes:</div>
                  {playlistsQuery.data?.status && playlistsQuery.data.data.length > 0 ? (
                    <div className="space-y-2">
                      {playlistsQuery.data.data.slice(-5).reverse().map((playlist: Playlist) => (
                        <div key={playlist.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{playlist.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Por Usuario • 0 elementos
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">{playlist.status ? "activa" : "inactiva"}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No hay listas recientes</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
