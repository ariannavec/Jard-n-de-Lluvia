# 🚀 Deployment en Vercel

Guía completa para desplegar **Jard-n-de-Lluvia** en Vercel.

## Estructura de Despliegue

La aplicación está dividida en dos servicios:

### Frontend (React + Vite) → Vercel
- Desplegado automáticamente en Vercel
- Se buildea con Vite
- Se sirve como sitio estático

### Backend (Express.js API) → Necesita despliegue separado
- Vercel tiene limitaciones para aplicaciones Express.js en serverless
- Se recomienda desplegar en servicios especializados

## 📋 Step 1: Preparar el Repositorio

### 1.1 Eliminar dependencias de Replit (ya hecho)

El archivo `vite.config.ts` ha sido actualizado para remover:
- `@replit/vite-plugin-runtime-error-modal`
- `@replit/vite-plugin-cartographer`
- `@replit/vite-plugin-dev-banner`

### 1.2 Push a GitHub

```bash
git add .
git commit -m "Adapt for Vercel deployment"
git push origin main
```

## 🌐 Frontend: Desplegar en Vercel

### Opción 1: Con Dashboard de Vercel (Recomendado)

1. Ir a [vercel.com](https://vercel.com)
2. Conectar tu repositorio GitHub
3. Seleccionar el proyecto
4. Vercel debería detectar automáticamente:
   - Framework: Vite
   - Build command: `pnpm run build`
   - Output directory: `artifacts/jardin-de-lluvia/dist`
5. Configurar variables de entorno (si es necesario):
   - `VITE_API_URL`: URL del backend API (ej: `https://api.example.com`)
6. Click en **Deploy**

### Opción 2: CLI de Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 🔌 Backend: Opciones de Despliegue

### ⚠️ Importante
Express.js en Vercel requiere ajustes. Tienes dos opciones:

### Opción A: Railway.app (Recomendado)

Railway soporta Node.js full-stack nativamente.

1. Ir a [railway.app](https://railway.app)
2. Conectar GitHub
3. Crear nuevo proyecto
4. Seleccionar repositorio
5. Configurar variables de entorno:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://...
   PORT=3000
   ```
6. Railway detectará `package.json` automáticamente

**Ventajas:**
- Full Express.js sin limitaciones
- PostgreSQL nativo
- Muy simple de configurar

### Opción B: Render.com

Similar a Railway:

1. Conectar GitHub en [render.com](https://render.com)
2. Crear "Web Service"
3. Seleccionar el repositorio
4. Build command: `pnpm --filter @workspace/api-server run build`
5. Start command: `node --enable-source-maps ./dist/index.mjs`

### Opción C: Heroku (Legacy)
Heroku descontinuó el free tier, pero aún funciona con plan pagado.

### Opción D: Vercel API Routes (Avanzado)

Si quieres mantener todo en Vercel, puedes convertir Express a Vercel Functions:

```
api/
├── health.ts       # GET /api/health
├── data/
│   ├── [id].ts     # GET /api/data/[id]
│   └── index.ts    # POST /api/data
└── ...
```

Esto requiere refactorizar Express a funciones serverless.

## 🗄️ Base de Datos

### PostgreSQL en Vercel + Railway

Si usas Railway para el backend:

1. En Railway, agregar servicio de PostgreSQL
2. Railway proporciona `DATABASE_URL`
3. Configurar migraciones Drizzle:
   ```bash
   pnpm --filter @workspace/db run push
   ```

### PostgreSQL en Vercel (Vercel Postgres)

1. Crear base de datos en [vercel.com/postgres](https://vercel.com/dashboard/stores/postgres)
2. Vercel proporciona `POSTGRES_URL_NON_POOLING`
3. Usar en la app

## 🔧 Configuración de Variables de Entorno

### Frontend (Vercel)
```
VITE_API_URL=https://api.your-domain.com
NODE_ENV=production
```

### Backend (Railway/Render)
```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
PORT=3000
CORS_ORIGIN=https://jardin-de-lluvia.vercel.app
```

## 📝 Nota Importante: API_URL

En `artifacts/jardin-de-lluvia/src/lib/`, necesitas configurar el cliente API para apuntar al backend correcto:

```typescript
// api-client.ts o custom-fetch.ts
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3000/api';
```

## ✅ Checklist de Deployment

- [ ] Repositorio creado en GitHub
- [ ] Frontend desplegado en Vercel
- [ ] Backend desplegado en Railway/Render
- [ ] Base de datos PostgreSQL configurada
- [ ] Variables de entorno configuradas
- [ ] Certificado SSL/HTTPS activo
- [ ] CORS configurado correctamente
- [ ] API URL apunta al dominio correcto
- [ ] Pruebas en producción

## 🐛 Troubleshooting

### Build fallido en Vercel

```bash
# Verificar build local
pnpm run build

# Verificar tipos
pnpm run typecheck
```

### API no responde desde frontend

1. Verificar `VITE_API_URL` en Vercel
2. Verificar CORS en backend:
   ```typescript
   app.use(cors({
     origin: process.env.CORS_ORIGIN || '*'
   }));
   ```
3. Verificar que el backend esté ejecutándose

### Dominio personalizado

1. En Vercel: Project → Settings → Domains
2. Agregar dominio
3. Vercel da instrucciones para DNS

## 📚 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Drizzle Migrations](https://orm.drizzle.team/docs/kit-overview)
