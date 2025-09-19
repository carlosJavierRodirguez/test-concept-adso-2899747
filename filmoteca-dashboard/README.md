# Film Library Management System

Sistema completo de gestión de filmoteca desarrollado con Next.js que se integra con una API REST en Spring Boot.

## 🚀 Características

### Funcionalidades Principales
- **Catálogo de Contenido**: Navegación y búsqueda de películas y series
- **Sistema de Autenticación**: Registro, login y gestión de perfiles de usuario
- **Listas de Reproducción**: Creación y gestión de listas personalizadas
- **Sistema de Reseñas**: Calificación y reseñas de contenido con sistema de estrellas
- **Panel de Administración**: Gestión completa de contenido para administradores
- **Dashboard Personal**: Estadísticas y actividad reciente del usuario

### Características Técnicas
- **Responsive Design**: Optimizado para móvil, tablet y escritorio
- **Navegación Intuitiva**: Menú responsive con navegación móvil
- **Búsqueda Avanzada**: Filtros por género, director y búsqueda por texto
- **Gestión de Estado**: Context API para autenticación y estado global
- **Manejo de Errores**: Mensajes claros y manejo robusto de errores
- **Loading States**: Indicadores de carga y estados de skeleton

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router) con TypeScript
- **Estilos**: Tailwind CSS v4 con componentes shadcn/ui
- **HTTP Client**: Axios con interceptores para autenticación
- **Iconos**: Lucide React
- **Fuentes**: Geist Sans y Geist Mono
- **Analytics**: Vercel Analytics

## 📋 Requisitos Previos

- Node.js 18+ 
- API Backend en Spring Boot ejecutándose en `http://localhost:8085/api/`

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
\`\`\`bash
git clone <repository-url>
cd film-library-frontend
\`\`\`

### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno
\`\`\`bash
cp .env.example .env.local
\`\`\`

Editar `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8085/api
\`\`\`

### 4. Ejecutar en desarrollo
\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estructura del Proyecto

\`\`\`
├── app/                          # App Router de Next.js
│   ├── admin/                    # Panel de administración
│   ├── catalog/                  # Catálogo de películas y series
│   ├── dashboard/                # Dashboard del usuario
│   ├── login/                    # Página de login
│   ├── playlists/                # Gestión de listas de reproducción
│   ├── profile/                  # Perfil de usuario
│   ├── register/                 # Página de registro
│   ├── reviews/                  # Sistema de reseñas
│   ├── globals.css               # Estilos globales y tokens de diseño
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página de inicio
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes de UI (shadcn/ui)
│   ├── navigation.tsx            # Navegación principal
│   └── protected-route.tsx       # Componente para rutas protegidas
├── lib/                          # Utilidades y configuración
│   ├── api.ts                    # Cliente API y tipos TypeScript
│   ├── auth-context.tsx          # Context de autenticación
│   └── utils.ts                  # Utilidades generales
└── public/                       # Archivos estáticos
\`\`\`

## 🔐 Autenticación y Autorización

### Sistema de Autenticación
- **JWT Tokens**: Almacenados en localStorage
- **Interceptores**: Automáticamente agregan tokens a las requests
- **Refresh automático**: Redirección automática en caso de token expirado
- **Rutas protegidas**: Middleware para proteger rutas que requieren autenticación

### Roles de Usuario
- **Usuario Regular**: Acceso a catálogo, listas, reseñas y dashboard
- **Administrador**: Acceso completo incluyendo panel de administración

## 📱 Diseño Responsive

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Características Responsive
- Navegación móvil con menú lateral (Sheet)
- Grids adaptables para catálogo y listas
- Formularios optimizados para móvil
- Tipografía escalable

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Primario**: Emerald 600 (#059669) - Botones principales y highlights
- **Secundario**: Emerald 500 (#10b981) - Elementos interactivos
- **Neutrales**: Blancos, grises y negros para fondos y texto
- **Destructivo**: Rojo para acciones de eliminación

### Tipografía
- **Headings**: Geist Sans Bold
- **Body**: Geist Sans Regular
- **Monospace**: Geist Mono

## 🔌 Integración con API

### Endpoints Principales
- **Autenticación**: `/auth/login`, `/auth/register`
- **Contenido**: `/movie`, `/series`, `/director`, `/genre`
- **Usuarios**: `/user`, `/role`, `/profile`
- **Interacciones**: `/playlist`, `/playlist-item`, `/review`

### Formato de Respuesta
\`\`\`typescript
interface ApiResponse<T> {
  message: string
  data: T
  success: boolean
}
\`\`\`

## 🧪 Testing y Desarrollo

### Scripts Disponibles
\`\`\`bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
\`\`\`

### Recomendaciones de Testing
- Jest y React Testing Library para tests unitarios
- Cypress para tests end-to-end
- MSW para mocking de API en tests

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push

### Variables de Entorno en Producción
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
\`\`\`

## 🔧 Configuración Avanzada

### Personalización de Temas
Los tokens de diseño están definidos en `app/globals.css` y pueden ser modificados para cambiar la apariencia:

\`\`\`css
:root {
  --primary: oklch(0.598 0.207 164.989); /* Emerald 600 */
  --secondary: oklch(0.696 0.17 162.48); /* Emerald 500 */
  /* ... más tokens */
}
\`\`\`

### Interceptores de API
El cliente Axios incluye interceptores para:
- Agregar automáticamente tokens de autenticación
- Manejar errores 401 (no autorizado)
- Redirección automática al login

## 📚 Documentación Adicional

### Componentes UI
Los componentes están basados en shadcn/ui y Radix UI:
- Totalmente accesibles (ARIA compliant)
- Personalizables con Tailwind CSS
- TypeScript nativo

### Gestión de Estado
- **Context API**: Para estado de autenticación global
- **useState/useEffect**: Para estado local de componentes
- **SWR/React Query**: Recomendado para caché de datos del servidor

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Para reportar bugs o solicitar nuevas funcionalidades, crear un issue en el repositorio de GitHub.

---

**Desarrollado con ❤️ usando Next.js y TypeScript**
