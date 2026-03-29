# Jard-n-de-Lluvia

Proyecto que potencia el uso de espacios recreativos afectados por condiciones climáticas mediante un sistema inteligente de microclima para la mitigación del calor que aprende las necesidades de la vegetación.

## Descripción

**Jard-n-de-Lluvia** es una aplicación full-stack que permite monitorear y controlar sistemas de microclima en espacios verdes. El sistema integra una interfaz web para visualización de datos, un backend API RESTful y una base de datos para persistencia de información sobre condiciones climáticas y necesidades de vegetación.

## Arquitectura del Proyecto

```
Frontend (React + Vite)
    ↓
API Client (TanStack React Query)
    ↓
Backend (Express.js)
    ↓
Database Layer (Drizzle ORM + PostgreSQL)
```

**Componentes principales:**

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **UI Components**: Radix UI con componentes accesibles
- **Mapas**: Leaflet para visualización geoespacial
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL con Drizzle ORM
- **Validación**: Zod schemas
- **API**: OpenAPI spec con Orval codegen

## Estructura del Proyecto

```
Jard-n-de-Lluvia/
├── artifacts/
│   ├── api-server/              # Backend API Express
│   │   ├── src/
│   │   │   ├── app.ts          # Configuración Express
│   │   │   ├── index.ts        # Punto de entrada
│   │   │   ├── routes/         # Rutas API
│   │   │   └── lib/            # Utilidades
│   │   └── build.mjs           # Build config
│   │
│   ├── jardin-de-lluvia/        # Frontend React + Vite
│   │   ├── src/
│   │   │   ├── App.tsx         # Componente raíz
│   │   │   ├── pages/          # Páginas (Landing, Home)
│   │   │   ├── components/     # Componentes React
│   │   │   ├── context/        # Context API
│   │   │   └── hooks/          # Custom hooks
│   │   └── vite.config.ts
│   │
│   └── mockup-sandbox/          # Zona de pruebas para componentes
│
├── lib/
│   ├── api-client-react/        # Cliente API para React
│   ├── api-spec/                # Especificación OpenAPI
│   ├── api-zod/                 # Schemas Zod para validación
│   └── db/                      # Configuración Drizzle ORM
│
└── scripts/                     # Scripts auxiliares
```

## Tecnologías Principales

### Frontend
- React 18 - Librería UI
- Vite - Build tool y dev server
- TypeScript - Tipado estático
- TailwindCSS - Estilos
- Radix UI - Componentes accesibles
- TanStack React Query - Gestión de estado servidor
- Leaflet - Mapas interactivos
- Wouter - Router minimalista
- React Hook Form - Gestión de formularios

### Backend
- Node.js - Runtime JavaScript
- Express.js - Framework web
- TypeScript - Tipado estático
- Drizzle ORM - ORM para base de datos
- Pino - Logger
- CORS - Cross-origin requests

### Compartido
- Zod - Validación de schemas
- OpenAPI - Especificación API

## Primeros Pasos

### Instalación

```bash
# Instalar dependencias (requiere pnpm)
pnpm install
```

### Desarrollo

```bash
# Ejecutar todos los servicios en desarrollo
pnpm run dev

# O ejecutar servicios individuales
cd artifacts/jardin-de-lluvia && pnpm run dev      # Frontend
cd artifacts/api-server && pnpm run dev            # Backend
```

### Build

```bash
# Compilar todo el proyecto
pnpm run build
```

### Type Checking

```bash
# Verificar tipos TypeScript
pnpm run typecheck
```

## Características Principales

- Visualización en Mapas - Panel interactivo con Leaflet
- Dashboard de Datos - Monitoreo en tiempo real
- Control de Microclima - Gestión inteligente del clima
- Responsive Design - Compatible con móviles
- API RESTful - Backend escalable
- Tipado Fuerte - TypeScript en frontend y backend
- UI Moderna - Componentes Radix UI + Tailwind

## Despliegue en Vercel

La aplicación ha sido adaptada para desplegarse en Vercel.

**Guías de despliegue:**

- **Quick Deploy Guide** [QUICK-DEPLOY.md](QUICK-DEPLOY.md) - Para desplegar en 2-5 minutos
- **Complete Guide** [VERCEL-DEPLOY.md](VERCEL-DEPLOY.md) - Con todos los detalles y opciones

**Resumen:**

- **Frontend**: Vercel (automático desde GitHub)
- **Backend**: Railway.app o Render (Node.js + PostgreSQL)
- **Base de Datos**: PostgreSQL (incluido en Railway)

### Cambios realizados para Vercel:

1. Removidos plugins de Replit (@replit/vite-plugin-*)
2. Configuración flexible de variables de entorno en vite.config.ts
3. Output directory optimizado para Vercel (artifacts/jardin-de-lluvia/dist)
4. Archivos .env.example agregados para referencia
5. vercel.json con configuración automática
6. .vercelignore para ignorar archivos innecesarios

### Variables de Entorno

**Frontend (Vercel):**
```
VITE_API_URL=https://api.tu-dominio.com
NODE_ENV=production
```

**Backend (Railway/Render):**
```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/db
PORT=3000
CORS_ORIGIN=https://tu-proyecto.vercel.app
```

## Licencia

MIT
