# Bazar-Dor

## Environment variables

Create a local `.env` file beside `package.json` for local development. Do not commit it.

```env
MONGODB_URI=your_mongodb_atlas_connection_string
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

In Vercel, open **Project → Settings → Environment Variables** and add all four variables for the environments you use. For Production, set both URL variables to your own actual deployed domain. Do not use a placeholder URL.

`MONGODB_URI` must be the complete MongoDB Atlas connection string. Ensure Atlas Network Access allows connections from your deployment (for Vercel, configure an appropriate network access policy) and the database user has the required permissions.

After saving Vercel variables, redeploy. Environment variables are not copied from your local `.env` file automatically.

The auth route initializes MongoDB on request rather than while Next.js collects build-time page data, so a missing secret/URI should not cause the specific build-time configuration error. The variables are still required for authentication to work at runtime.
