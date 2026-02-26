# Vercel Environment Variables Setup Guide

## The Problem
Your Vercel deployment is failing because environment variables are not configured in Vercel. The `.env` file only works locally - **Vercel requires environment variables to be set in the dashboard**.

## Error You're Seeing
```
Error: Neither apiKey nor config.authenticator provided
[dotenv@17.2.3] injecting env (0) from .env
```

The `(0)` means **zero environment variables were loaded**.

## Solution: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/
2. Login to your account
3. Select your project: **elegant-ecommerce-store**

### Step 2: Navigate to Environment Variables
1. Click on **Settings** tab
2. Click on **Environment Variables** in the left sidebar

### Step 3: Add Each Environment Variable

Add the following variables one by one:

#### Database Configuration
- **Name**: `MONGODB_URI`
- **Value**: Copy from your local `.env` file
- **Environment**: Select all (Production, Preview, Development)

#### Cloudinary Configuration
- **Name**: `CLOUD_NAME`
- **Value**: Copy from your local `.env` file
- **Environment**: Select all

- **Name**: `API_KEY`
- **Value**: Copy from your local `.env` file
- **Environment**: Select all

- **Name**: `API_SECRET`
- **Value**: Copy from your local `.env` file
- **Environment**: Select all

#### Email Configuration
- **Name**: `PORTAL_EMAIL`
- **Value**: Copy from your local `.env` file
- **Environment**: Select all

- **Name**: `PORTAL_PASSWORD`
- **Value**: Copy from your local `.env` file
- **Environment**: Select all

#### Application Secret
- **Name**: `SECRETKEY`
- **Value**: Copy from your local `.env` file
- **Environment**: Select all

#### Stripe Configuration (CRITICAL)
- **Name**: `STRIPE_SECRET_KEY`
- **Value**: Copy from your local `.env` file (your Stripe secret key, e.g. sk_test_...)
- **Environment**: Select all

#### Client URL (Update this!)
- **Name**: `CLIENT_URL`
- **Value**: `https://your-frontend-domain.vercel.app` (replace with your actual frontend URL)
- **Environment**: Select all

#### Port (Optional for Vercel, but good to have)
- **Name**: `PORT`
- **Value**: `8000`
- **Environment**: Select all

### Step 4: Redeploy Your Application

After adding all environment variables:

1. Go to the **Deployments** tab
2. Click on the three dots (•••) next to the latest deployment
3. Click **Redeploy**
4. Or simply push a new commit to trigger a deployment

### Step 5: Verify the Deployment

After redeployment:
1. Check the deployment logs
2. You should see environment variables being loaded successfully
3. The Stripe error should be gone

## Security Note

⚠️ **IMPORTANT**: The credentials in this file should be kept secure. Consider:
1. Rotating your API keys regularly
2. Using different keys for development and production
3. Never committing this file to a public repository

## Additional Notes

- Vercel automatically injects these environment variables at runtime
- No `.env` file is needed in production
- Each time you update an environment variable, you need to redeploy
- Environment variables are encrypted and secure in Vercel

## Troubleshooting

If you still see errors after setting environment variables:

1. **Verify all variables are added**: Go back to Settings → Environment Variables
2. **Check spelling**: Variable names must match exactly (case-sensitive)
3. **Redeploy**: Always redeploy after changing environment variables
4. **Check logs**: Go to Deployments → Click on latest deployment → View Function Logs

## Contact

If you need help, check:
- Vercel Documentation: https://vercel.com/docs/environment-variables
- Your deployment logs for specific errors
