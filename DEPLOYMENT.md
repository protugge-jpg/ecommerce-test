# Ecommerce Website - Deployment Guide

## Deployment to Vercel (Recommended)

### Step 1: Go to Vercel Dashboard
- Visit https://vercel.com
- Sign in with your GitHub account

### Step 2: Create New Project
1. Click "Add New Project"
2. Click "Import Git Repository"
3. Search for and select `ecommerce-test` repository
4. Click "Import"

### Step 3: Configure Project
- **Framework Preset**: Select "Other"
- **Build Command**: Leave empty (no build needed)
- **Output Directory**: Leave empty
- **Root Directory**: Leave empty

### Step 4: Add Environment Variables
1. In the Environment Variables section, click "Add Environment Variable"
2. Set the following:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB Atlas connection string (see below for format)
   - **Environments**: Select "Production"

### Step 5: Deploy
1. Click the "Deploy" button
2. Wait for deployment to complete (2-3 minutes)
3. You'll receive a live URL: `https://your-project-name.vercel.app`

---

## Getting MongoDB Atlas Connection String

### 1. Create MongoDB Atlas Account
- Go to https://www.mongodb.com/cloud/atlas
- Sign up (free tier available)

### 2. Create a Cluster
- Click "Create" → Select free tier
- Choose your cloud provider and region
- Click "Create Cluster"

### 3. Create Database User
- Go to "Database Access"
- Click "Add New Database User"
- Username: `your_username`
- Password: `your_secure_password`
- Click "Add User"

### 4. Allow Network Access
- Go to "Network Access"
- Click "Add IP Address"
- Select "Allow access from anywhere" (0.0.0.0/0)
- Click "Confirm"

### 5. Get Connection String
- Click "Databases" → "Connect"
- Select "Connect your application"
- Copy the connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 6. Modify Connection String
- Replace `username` and `password` with your database user credentials
- Add database name before `?`:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce_db?retryWrites=true&w=majority
```

---

## Local Development

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas account)
- npm

### Setup
1. Clone the repository:
```bash
git clone https://github.com/protugge-jpg/ecommerce-test.git
cd ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root directory:
```
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/ecommerce_db?retryWrites=true&w=majority
PORT=3000
```

4. Start the server:
```bash
npm start
```

5. Open http://localhost:3000 in your browser

---

## Testing the Deployment

### Health Check
```bash
curl https://your-project-name.vercel.app/api/health
```

Expected response:
```json
{"status":"healthy","timestamp":"2026-01-15T10:00:00.000Z"}
```

### Test Sign Up
```bash
curl -X POST https://your-project-name.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123"}'
```

### Test Login
```bash
curl -X POST https://your-project-name.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test@example.com","password":"password123"}'
```

---

## Troubleshooting

### Error: "MONGODB_URI is undefined"
- **Solution**: Add the environment variable in Vercel dashboard
- Go to Settings → Environment Variables
- Make sure `MONGODB_URI` is set correctly
- Redeploy the project

### Error: "Cannot connect to MongoDB"
- Check your MongoDB connection string is correct
- Verify MongoDB cluster network access allows Vercel IPs (set to 0.0.0.0/0)
- Ensure your database user credentials are correct

### 404 Errors
- Check the Vercel deployment logs
- Verify `server.js` and `index.html` exist in repository
- Verify `vercel.json` is configured correctly

### Site loads but API endpoints fail
- Open browser DevTools → Console
- Check for CORS errors
- Verify MongoDB connection is working (check Vercel logs)

---

## Project Structure

```
ecommerce/
├── index.html          # Main frontend
├── app.js              # Frontend JavaScript
├── styles.css          # Frontend CSS
├── server.js           # Node.js backend
├── package.json        # Dependencies
├── vercel.json         # Vercel configuration
├── .env                # Environment variables (local only)
└── DEPLOYMENT.md       # This file
```

---

## API Endpoints

All endpoints respond with JSON.

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID

### Health
- `GET /api/health` - Server health check

---

## Features

✅ Product catalog with categories
✅ Shopping cart
✅ Checkout system
✅ User authentication (signup/login)
✅ MongoDB user database
✅ Order management
✅ Responsive design

---

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Node.js (built-in http module)
- **Database**: MongoDB Atlas
- **Deployment**: Vercel
- **Version Control**: Git/GitHub

---

## Support

For issues or questions, check:
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com
- GitHub Repository: https://github.com/protugge-jpg/ecommerce-test

---

## License

MIT License
