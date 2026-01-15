# Backend Setup & MongoDB Integration

This document explains how to set up the Node.js backend server with MongoDB to store customer orders.

## 📦 What's Installed

✅ **MongoDB Driver** (`mongodb` v7.0.0) - Official MongoDB Node.js driver
✅ **Node.js HTTP Server** - No external dependencies like Express
✅ **CORS Support** - Cross-Origin Resource Sharing enabled

## 🗂️ Backend Files

- **server.js** - Node.js HTTP server with MongoDB integration
- **app-with-backend.js** - Frontend JavaScript that connects to backend
- **package.json** - Node.js project configuration

## 🚀 Getting Started

### Option 1: Using MongoDB Locally (macOS)

**1. Install MongoDB Community Edition**
```bash
# Using Homebrew (if not installed)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running
brew services list
```

**2. Start the Backend Server**
```bash
cd /Users/indracyberschool/ecommerce
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Ecommerce API Server running on http://localhost:3000
```

### Option 2: Using MongoDB Atlas (Cloud)

**1. Create a Free MongoDB Atlas Account**
- Go to https://www.mongodb.com/cloud/atlas
- Sign up for free
- Create a cluster
- Get your connection string

**2. Set Environment Variable**
```bash
export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/"
npm start
```

## 📡 API Endpoints

Once the server is running at `http://localhost:3000`:

### Create Order
```bash
POST /api/orders
Content-Type: application/json

{
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "United States"
  },
  "items": [
    {
      "id": "1",
      "name": "Wireless Headphones",
      "price": 99.99,
      "quantity": 1
    }
  ],
  "totalAmount": 109.99
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "ORD-1705273257123",
  "order": {
    "_id": "ORD-1705273257123",
    "personalInfo": { ... },
    "items": [ ... ],
    "totalAmount": 109.99,
    "status": "confirmed",
    "createdAt": "2026-01-14T23:00:57.123Z"
  }
}
```

### Get All Orders
```bash
GET /api/orders
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "orders": [ ... ]
}
```

### Get Order by ID
```bash
GET /api/orders/ORD-1705273257123
```

### Health Check
```bash
GET /api/health
```

## 🔗 Using the Backend from Frontend

The frontend can use either:
1. **Local Storage** (default) - No backend required
2. **MongoDB Backend** - Orders stored in database

### Switch to Backend Version

Replace the script in `index.html`:
```html
<!-- Original (uses localStorage only) -->
<script src="app.js"></script>

<!-- Change to (uses MongoDB) -->
<script src="app-with-backend.js"></script>
```

Then make sure the backend server is running on port 3000.

## 📊 MongoDB Database Structure

**Database:** `ecommerce_db`
**Collection:** `orders`

**Order Document:**
```json
{
  "_id": "ORD-1705273257123",
  "personalInfo": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "items": [
    {
      "id": "string",
      "name": "string",
      "price": number,
      "emoji": "string",
      "quantity": number
    }
  ],
  "totalAmount": number,
  "status": "confirmed",
  "ipAddress": "string",
  "createdAt": Date
}
```

## 🔒 Security Best Practices

### Current Setup (Development)
- ✅ CORS enabled for all origins (development only)
- ✅ Basic input validation
- ✅ Error handling

### For Production:
1. **Add Authentication**
   ```javascript
   // Verify API key or JWT token
   if (!req.headers.authorization) {
     res.writeHead(401);
     res.end(JSON.stringify({ error: 'Unauthorized' }));
     return;
   }
   ```

2. **Restrict CORS**
   ```javascript
   const allowedOrigins = ['https://yourdomain.com'];
   if (allowedOrigins.includes(req.headers.origin)) {
       res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
   }
   ```

3. **Add Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

4. **Validate Input**
   ```javascript
   const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   ```

5. **Use HTTPS**
   - Deploy with SSL certificate
   - Use `https` module instead of `http`

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
❌ MongoDB Connection Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Make sure MongoDB is running: `brew services start mongodb-community`
- Or use MongoDB Atlas with connection string

### Port 3000 Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### CORS Error in Browser Console
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Ensure server is running
- Check API_URL in JavaScript matches server address
- Server has CORS headers enabled

### Backend Not Saving Orders
- Check MongoDB is connected (should see ✅ in console)
- Verify order data is valid
- Check MongoDB collection with:
  ```bash
  mongo
  use ecommerce_db
  db.orders.find()
  ```

## 📈 Scaling Considerations

### For Production Deployment:

1. **Use Express.js** (simpler than raw HTTP)
   ```bash
   npm install express
   ```

2. **Add Logging** (Winston, Morgan)
   ```bash
   npm install morgan
   ```

3. **Add Data Validation** (Joi)
   ```bash
   npm install joi
   ```

4. **Deploy Options:**
   - Heroku (free tier available)
   - Railway.app
   - Render
   - AWS EC2
   - DigitalOcean

5. **CI/CD Pipeline:**
   - GitHub Actions
   - GitLab CI
   - CircleCI

## 📚 Next Steps

1. ✅ Install MongoDB locally or create Atlas account
2. ✅ Run `npm start` to start the backend
3. ✅ Update `index.html` to use `app-with-backend.js`
4. ✅ Run frontend on `http://localhost:8000` (different port)
5. ✅ Test creating orders through the website
6. ✅ View stored orders at `http://localhost:3000/api/orders`

## 🔧 Advanced: Modify server.js

Add more routes or features:

```javascript
// Example: Get customer stats
if (pathname === '/api/stats' && req.method === 'GET') {
    const stats = await db.collection(ORDERS_COLLECTION).aggregate([
        { $group: { _id: null, totalOrders: { $sum: 1 }, totalRevenue: { $sum: '$totalAmount' } } }
    ]).toArray();
    res.end(JSON.stringify(stats[0]));
}
```

---

**Happy building! 🚀**
