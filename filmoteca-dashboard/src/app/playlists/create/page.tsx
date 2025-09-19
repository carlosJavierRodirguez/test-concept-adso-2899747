"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, List } from "lucide-react"
import { playlistApi } from "@/lib/api"

export default function CreatePlaylistPage() {
  return <CreatePlaylistContent />
}

function CreatePlaylistContent() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError("")

    try {
      const response = await playlistApi.create({
        name,
        userId: "1", // Using mock user ID since authentication is removed
        status: true,
      })

      if (response.data.status) {
        router.push(`/playlists/${response.data.data.id}`)
      } else {
        setError(response.data.message)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear la lista")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a listas
        </Button>

        <Card>
          <CardHeader className="text-center">
            <List className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Crear Nueva Lista</CardTitle>
            <CardDescription>Organiza tu contenido favorito en una lista personalizada</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Lista *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ej: Mis películas favoritas, Para ver más tarde..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el contenido de tu lista..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                  rows={3}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={loading || !name.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando lista...
                    </>
                  ) : (
                    "Crear Lista"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Consejos para crear listas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Usa nombres descriptivos como "Comedias para el fin de semana" o "Clásicos del cine"</p>
            <p>• Puedes agregar películas y series a tu lista desde sus páginas de detalle</p>
            <p>• Las listas te ayudan a organizar y encontrar rápidamente tu contenido favorito</p>
            <p>• Puedes editar o eliminar tus listas en cualquier momento</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
