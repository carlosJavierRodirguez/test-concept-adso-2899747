"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Search, List, Trash2, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { playlistApi, type Playlist } from "@/lib/api"

export default function PlaylistsPage() {
  return <PlaylistsContent />
}

function PlaylistsContent() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadPlaylists()
  }, [])

  const loadPlaylists = async () => {
    try {
      const mockPlaylists: Playlist[] = [
        {
          id: "1",
          name: "Mis Favoritas",
          userId: "1",
          status: true,
        },
        {
          id: "2",
          name: "Para Ver Después",
          userId: "1",
          status: true,
        },
        {
          id: "3",
          name: "Clásicos",
          userId: "1",
          status: true,
        },
        {
          id: "4",
          name: "Comedias",
          userId: "1",
          status: true,
        },
      ]
      setPlaylists(mockPlaylists)
    } catch (err) {
      setError("Error al cargar las listas de reproducción")
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePlaylist = async (playlistId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta lista?")) return

    try {
      await playlistApi.delete(playlistId)
      setPlaylists(playlists.filter((p) => p.id !== playlistId))
    } catch (err) {
      setError("Error al eliminar la lista")
    }
  }

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando listas...</p>
          </div>
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Listas de Reproducción</h1>
            <p className="text-muted-foreground">Organiza tu contenido favorito en listas personalizadas</p>
          </div>
          <Button asChild>
            <Link href="/playlists/create">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Lista
            </Link>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar listas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Playlists Grid */}
        {filteredPlaylists.length === 0 ? (
          <div className="text-center py-12">
            <List className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              {searchTerm ? "No se encontraron listas" : "No hay listas disponibles"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {searchTerm
                ? "Intenta con otros términos de búsqueda"
                : "Crea tu primera lista para organizar tu contenido favorito"}
            </p>
            {!searchTerm && (
              <Button asChild>
                <Link href="/playlists/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear mi primera lista
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map((playlist) => (
              <Card key={playlist.id} className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">{playlist.name}</CardTitle>
                      <CardDescription className="mt-1">
                        Lista personalizada
                      </CardDescription>
                    </div>
                    <Badge variant={playlist.status ? "default" : "secondary"} className="ml-2">
                      {playlist.status ? "Activa" : "Inactiva"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/playlists/${playlist.id}`}>
                          <Eye className="h-3 w-3 mr-1" />
                          Ver
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/playlists/${playlist.id}/edit`}>
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Link>
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeletePlaylist(playlist.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
