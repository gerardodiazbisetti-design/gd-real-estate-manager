# GD Real Estate Manager

Base inicial de la aplicación web profesional creada con Next.js y Supabase.

## Ejecutar localmente

1. Copia `.env.example` como `.env.local`.
2. Coloca la URL y la Publishable Key de Supabase.
3. Ejecuta:

```bash
npm install
npm run dev
```

4. Abre `http://localhost:3000`.

## Publicación

El proyecto está preparado para publicarse en Vercel. Allí deben agregarse estas variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
