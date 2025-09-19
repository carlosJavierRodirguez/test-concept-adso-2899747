import axios from "axios"

// API Base Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8085/api"

// Create axios instance with default configuration
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// API Response Type (matches backend ApiResponseDto<T>)
export interface ApiResponse<T> {
  status: boolean
  data: T
  message: string
}

// Base DTOs (matching backend structure)
export interface BaseDTO {
  name: string
  status: boolean
}

export interface BaseResponseContentDto extends BaseDTO {
  id: string
}

export interface BaseDTOInteractions {
  status: boolean
}

export interface BaseResponseInteractionsDto extends BaseDTOInteractions {
  id: string
}

export interface BaseDTOUsers {
  status: boolean
}

// Entity Types (matching exact backend DTOs)
export interface Movie extends BaseResponseContentDto {
  title: string
  releaseYear: number
  duration: number
  synopsis: string
  directorId: string
  genreId: string
}

export interface Series extends BaseResponseContentDto {
  title: string
  seasons: number
  synopsis: string
  directorId: string
  genreId: string
}

export interface Director extends BaseResponseContentDto {
  nationality: string
}

export interface Genre extends BaseResponseContentDto {
  description: string
}

export interface User extends BaseDTOUsers {
  id: string
  name: string
  email: string
  passwordHash: string
  roleId: string
  profileId: string
}

export interface Role extends BaseDTOUsers {
  id: string
  name: string
  description?: string
}

export interface Profile extends BaseDTOUsers {
  id: string
  firstName?: string
  lastName?: string
  avatar?: string
  bio?: string
}

export interface Playlist extends BaseResponseInteractionsDto {
  name: string
  userId: string
}

export interface PlaylistItem extends BaseResponseInteractionsDto {
  playlistId: string
  movieId?: string
  seriesId?: string
  addedAt: string
}

export interface Review extends BaseResponseInteractionsDto {
  content: string
  rating: number
  date: string
  userId: string
  movieId?: string
  seriesId?: string
}

// API Functions
export const movieApi = {
  getAll: () => api.get<ApiResponse<Movie[]>>("/movie"),
  getById: (id: string) => api.get<ApiResponse<Movie>>(`/movie/${id}`),
  create: (movie: Omit<Movie, "id">) => api.post<ApiResponse<Movie>>("/movie", movie),
  update: (id: string, movie: Partial<Movie>) => api.put<ApiResponse<Movie>>(`/movie/${id}`, movie),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/movie/${id}`),
}

export const seriesApi = {
  getAll: () => api.get<ApiResponse<Series[]>>("/series"),
  getById: (id: string) => api.get<ApiResponse<Series>>(`/series/${id}`),
  create: (series: Omit<Series, "id">) => api.post<ApiResponse<Series>>("/series", series),
  update: (id: string, series: Partial<Series>) => api.put<ApiResponse<Series>>(`/series/${id}`, series),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/series/${id}`),
}

export const directorApi = {
  getAll: () => api.get<ApiResponse<Director[]>>("/director"),
  getById: (id: string) => api.get<ApiResponse<Director>>(`/director/${id}`),
  create: (director: Omit<Director, "id">) => api.post<ApiResponse<Director>>("/director", director),
  update: (id: string, director: Partial<Director>) => api.put<ApiResponse<Director>>(`/director/${id}`, director),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/director/${id}`),
}

export const genreApi = {
  getAll: () => api.get<ApiResponse<Genre[]>>("/genre"),
  getById: (id: string) => api.get<ApiResponse<Genre>>(`/genre/${id}`),
  create: (genre: Omit<Genre, "id">) => api.post<ApiResponse<Genre>>("/genre", genre),
  update: (id: string, genre: Partial<Genre>) => api.put<ApiResponse<Genre>>(`/genre/${id}`, genre),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/genre/${id}`),
}

export const userApi = {
  getAll: () => api.get<ApiResponse<User[]>>("/user"),
  getById: (id: string) => api.get<ApiResponse<User>>(`/user/${id}`),
  create: (user: Omit<User, "id">) => api.post<ApiResponse<User>>("/user", user),
  update: (id: string, user: Partial<User>) => api.put<ApiResponse<User>>(`/user/${id}`, user),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/user/${id}`),
}

export const playlistApi = {
  getAll: () => api.get<ApiResponse<Playlist[]>>("/playlist"),
  getById: (id: string) => api.get<ApiResponse<Playlist>>(`/playlist/${id}`),
  getByUserId: (userId: string) => api.get<ApiResponse<Playlist[]>>(`/playlist/user/${userId}`),
  create: (playlist: Omit<Playlist, "id">) => api.post<ApiResponse<Playlist>>("/playlist", playlist),
  update: (id: string, playlist: Partial<Playlist>) => api.put<ApiResponse<Playlist>>(`/playlist/${id}`, playlist),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/playlist/${id}`),
}

export const playlistItemApi = {
  getByPlaylistId: (playlistId: string) =>
    api.get<ApiResponse<PlaylistItem[]>>(`/playlist-item/playlist/${playlistId}`),
  create: (item: Omit<PlaylistItem, "id">) => api.post<ApiResponse<PlaylistItem>>("/playlist-item", item),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/playlist-item/${id}`),
}

export const reviewApi = {
  getAll: () => api.get<ApiResponse<Review[]>>("/review"),
  getById: (id: string) => api.get<ApiResponse<Review>>(`/review/${id}`),
  getByMovieId: (movieId: string) => api.get<ApiResponse<Review[]>>(`/review/movie/${movieId}`),
  getBySeriesId: (seriesId: string) => api.get<ApiResponse<Review[]>>(`/review/series/${seriesId}`),
  getByUserId: (userId: string) => api.get<ApiResponse<Review[]>>(`/review/user/${userId}`),
  create: (review: Omit<Review, "id">) => api.post<ApiResponse<Review>>("/review", review),
  update: (id: string, review: Partial<Review>) => api.put<ApiResponse<Review>>(`/review/${id}`, review),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/review/${id}`),
}

export const roleApi = {
  getAll: () => api.get<ApiResponse<Role[]>>("/role"),
  getById: (id: string) => api.get<ApiResponse<Role>>(`/role/${id}`),
  create: (role: Omit<Role, "id">) => api.post<ApiResponse<Role>>("/role", role),
  update: (id: string, role: Partial<Role>) => api.put<ApiResponse<Role>>(`/role/${id}`, role),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/role/${id}`),
}

export const profileApi = {
  getAll: () => api.get<ApiResponse<Profile[]>>("/profile"),
  getById: (id: string) => api.get<ApiResponse<Profile>>(`/profile/${id}`),
  create: (profile: Omit<Profile, "id">) => api.post<ApiResponse<Profile>>("/profile", profile),
  update: (id: string, profile: Partial<Profile>) => api.put<ApiResponse<Profile>>(`/profile/${id}`, profile),
  delete: (id: string) => api.delete<ApiResponse<void>>(`/profile/${id}`),
}

// Utility functions for API responses
export const handleApiResponse = <T>(response: ApiResponse<T>) => {
  if (!response.status) {
    throw new Error(response.message || "API request failed")
  }
  return response.data
}

export const handleApiError = (error: unknown) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } }
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message
    }
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as Error).message
  }
  return "An unexpected error occurred"
}
