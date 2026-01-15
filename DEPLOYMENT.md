# Ecommerce Website with MongoDB Authentication

A fully-functional ecommerce website built with HTML, CSS, JavaScript, Node.js, and MongoDB.

## Features

✅ Product Catalog with Categories
✅ Shopping Cart
✅ Checkout System
✅ User Authentication (Login/Signup)
✅ MongoDB User Database
✅ Order Management
✅ Responsive Design

## Local Development

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm

### Setup

1. Clone the repository:
```bash
git clone <repo-url>
cd ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
PORT=3000
```

4. Start the server:
```bash
npm start
```

5. Open `http://localhost:3000` in your browser

## Deployment to Vercel

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository

### Steps

1. Push your code to GitHub:
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

2. Go to https://vercel.com and sign in

3. Click "Add New Project"

4. Import your GitHub repository

5. In Environment Variables, add:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string

6. Click "Deploy"

7. Your site will be live at: `https://<project-name>.vercel.app`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID

### Health
- `GET /api/health` - Health check

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express (via http module)
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## License

MIT License
