# 🚀 Despliegue Rápido - Guía Corta

## Requisitos
- GitHub (para alojar el código)
- Vercel account (para frontend)
- Railway account (para backend + DB)

## Paso 1: GitHub

```bash
# En el repo local
git add .
git commit -m "Adapt for Vercel deployment"
git push origin main
```

## Paso 2: Frontend en Vercel (2 minutos)

1. Ir a [vercel.com](https://vercel.com)
2. Click **Import Project**
3. Seleccionar tu repositorio de GitHub
4. Click **Deploy**

✅ Tu frontend está vivo en `https://[tu-proyecto].vercel.app`

## Paso 3: Backend en Railway (5 minutos)

1. Ir a [railway.app](https://railway.app)
2. Login con GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Seleccionar el repositorio
5. Railway debería detectar:
   - **Monorepo Type**: pnpm
   - **Root Directory**: `artifacts/api-server`
6. Railway automáticamente crea PostgreSQL
7. Click **Deploy**

✅ Tu backend está en `https://[tu-railway-url]/api`

## Paso 4: Conectar Frontend con Backend

En Vercel:

1. Ir a tu proyecto → **Settings** → **Environment Variables**
2. Agregar:
   ```
   VITE_API_URL=https://[tu-railway-url]
   ```
3. Redeploy

## ✅ Listo!

- Frontend: `https://[tu-proyecto].vercel.app`
- Backend: `https://[tu-railway-url]/api`
- Database: PostgreSQL en Railway

## Problemas Comunes

**Frontend no conecta con Backend**
- Verificar `VITE_API_URL` en Vercel
- Verificar CORS en Backend (debe incluir el dominio de Vercel)

**Base de datos vacía**
- En Railway, correr migraciones:
  ```bash
  pnpm --filter @workspace/db run push
  ```

**Build fallido**
- Run localmente: `pnpm run build`
- Ver logs en Vercel dashboard

---

Para una guía más detallada, ver [VERCEL-DEPLOY.md](VERCEL-DEPLOY.md)
