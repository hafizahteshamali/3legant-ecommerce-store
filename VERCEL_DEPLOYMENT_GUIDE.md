# Vercel Deployment Guide - Backend Setup

## Issue Fixed
Your 404 error was happening because the Vercel configuration wasn't properly set up for your project structure.

## Changes Made

1. **Updated `Backend/index.js`**:
   - Added `export default app;` for Vercel serverless functions
   - Added conditional listening (only in development)
   - Added default PORT fallback

2. **Updated `Backend/vercel.json`**:
   - Fixed paths to point to correct entry file

## Vercel Deployment Steps

### Option 1: Deploy Backend Folder Only (RECOMMENDED)

Since your backend is in the `Backend` folder, you should deploy ONLY that folder:

1. **Go to Vercel Dashboard**: https://vercel.com/
2. **Import Project** or go to your existing project settings
3. **Configure Root Directory**:
   - Go to **Settings** → **General**
   - Set **Root Directory**: `Backend`
   - Click **Save**

4. **Set Environment Variables** (CRITICAL):
   - Go to **Settings** → **Environment Variables**
   - Add all variables from your `.env` file:
     - `MONGODB_URI`
     - `CLOUD_NAME`
     - `API_KEY`
     - `API_SECRET`
     - `PORTAL_EMAIL`
     - `PORTAL_PASSWORD`
     - `SECRETKEY`
     - `STRIPE_SECRET_KEY` (most important!)
     - `CLIENT_URL` (set to your frontend URL)
     - `PORT` = `8000`
     - `NODE_ENV` = `production`

5. **Redeploy**:
   - Go to **Deployments** tab
   - Click **Redeploy** on the latest deployment

### Option 2: Using Vercel CLI (Alternative)

```bash
# Install Vercel CLI if not installed
npm install -g vercel

# Navigate to Backend folder
cd Backend

# Deploy
vercel

# Follow prompts and link to your project
```

## Important Configuration

### Environment Variables Required

Make sure these are set in Vercel dashboard:

```
MONGODB_URI=<your-mongodb-connection-string>
CLOUD_NAME=<your-cloudinary-name>
API_KEY=<your-cloudinary-api-key>
API_SECRET=<your-cloudinary-api-secret>
PORTAL_EMAIL=<your-email>
PORTAL_PASSWORD=<your-email-app-password>
SECRETKEY=<your-jwt-secret>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
CLIENT_URL=<your-frontend-url>
PORT=8000
NODE_ENV=production
```

### Project Structure on Vercel

After setting root directory to `Backend`, Vercel will see:
```
/
├── index.js (entry point)
├── vercel.json (configuration)
├── package.json
├── Routes/
├── Controllers/
├── Database/
└── ... other backend files
```

## Testing Your Deployment

1. After deployment, visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. You should see: `{"success": 200, "message": "Welcome to Backend"}`
3. Test API endpoints:
   - `GET /` - Welcome message
   - `POST /api/auth/register` - User registration
   - `GET /api/products` - Get products
   - etc.

## Troubleshooting

### Still Getting 404?

1. **Check Root Directory**:
   - Settings → General → Root Directory = `Backend`

2. **Check Build Logs**:
   - Go to Deployments → Click on deployment → View Function Logs
   - Look for errors

3. **Verify Environment Variables**:
   - Settings → Environment Variables
   - Make sure `STRIPE_SECRET_KEY` and all others are set

4. **Check vercel.json**:
   - Must be in the root of your Backend folder
   - Must have correct paths (not `Backend/index.js`, just `index.js`)

### Getting "Neither apiKey nor config.authenticator provided"?

This means environment variables are not set in Vercel. Go to Settings → Environment Variables and add them.

### CORS Issues?

Update your `cors()` configuration in `index.js` if needed:
```javascript
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
}));
```

## Frontend Configuration

Remember to update your frontend API base URL to point to your Vercel backend:
```javascript
const API_BASE_URL = "https://your-backend.vercel.app";
```

## Next Steps

1. Set Root Directory to `Backend` in Vercel settings
2. Add all environment variables
3. Redeploy
4. Test the endpoints
5. Update frontend to use new backend URL
6. Deploy frontend separately (if not already done)

## Notes

- Vercel serverless functions don't need `app.listen()` in production
- Environment variables MUST be set in Vercel dashboard
- `.env` file is only for local development
- Each deployment needs a few minutes to build and deploy
