# Poo-Land Backend Deployment Files

## Backend Hosting on Render.com

### Quick Setup:

1. Go to https://render.com and sign up (free)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: poo-land-api
   - **Root Directory**: backend
   - **Environment**: Python 3
   - **Build Command**: pip install -r requirements.txt
   - **Start Command**: gunicorn -w 4 -b 0.0.0.0:$PORT "app:create_app()"
5. Click "Create Web Service"

Your backend URL will be: `https://poo-land-api.onrender.com`

---

## Frontend Hosting on Vercel

1. Go to https://vercel.com and sign up (free)
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: frontend
   - **Framework Preset**: Vite
   - **Build Command**: npm run build
   - **Output Directory**: dist
4. Add Environment Variable:
   - `VITE_API_URL` = `https://poo-land-api.onrender.com/api`
5. Deploy!
