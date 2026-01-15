# API Examples - MongoDB Ecommerce Backend

## Prerequisites
- Backend server running: `npm start` (on port 3000)
- MongoDB running or MongoDB Atlas connection string set

## 🔄 API Endpoints

### 1. Create Order (POST)

**Endpoint:** `POST http://localhost:3000/api/orders`

**Request:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 123-4567",
      "address": "123 Main Street",
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
        "emoji": "🎧",
        "quantity": 2
      },
      {
        "id": "3",
        "name": "USB-C Cable",
        "price": 19.99,
        "emoji": "🔌",
        "quantity": 1
      }
    ],
    "totalAmount": 229.77
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "orderId": "ORD-1705273257123",
  "order": {
    "_id": "ORD-1705273257123",
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 123-4567",
      "address": "123 Main Street",
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
        "emoji": "🎧",
        "quantity": 2
      },
      {
        "id": "3",
        "name": "USB-C Cable",
        "price": 19.99,
        "emoji": "🔌",
        "quantity": 1
      }
    ],
    "totalAmount": 229.77,
    "status": "confirmed",
    "ipAddress": "::1",
    "createdAt": "2026-01-14T23:10:57.123Z"
  }
}
```

---

### 2. Get All Orders (GET)

**Endpoint:** `GET http://localhost:3000/api/orders`

**Request:**
```bash
curl http://localhost:3000/api/orders
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "orders": [
    {
      "_id": "ORD-1705273257123",
      "personalInfo": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+1 (555) 123-4567",
        "address": "123 Main Street",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "United States"
      },
      "items": [...],
      "totalAmount": 229.77,
      "status": "confirmed",
      "createdAt": "2026-01-14T23:10:57.123Z"
    },
    {
      "_id": "ORD-1705273234567",
      "personalInfo": {
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane@example.com",
        ...
      },
      "items": [...],
      "totalAmount": 119.89,
      "status": "confirmed",
      "createdAt": "2026-01-14T23:05:34.567Z"
    }
  ]
}
```

---

### 3. Get Order by ID (GET)

**Endpoint:** `GET http://localhost:3000/api/orders/:orderId`

**Request:**
```bash
curl http://localhost:3000/api/orders/ORD-1705273257123
```

**Response (200 OK):**
```json
{
  "success": true,
  "order": {
    "_id": "ORD-1705273257123",
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 123-4567",
      "address": "123 Main Street",
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
        "emoji": "🎧",
        "quantity": 2
      }
    ],
    "totalAmount": 229.77,
    "status": "confirmed",
    "ipAddress": "::1",
    "createdAt": "2026-01-14T23:10:57.123Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Order not found"
}
```

---

### 4. Health Check (GET)

**Endpoint:** `GET http://localhost:3000/api/health`

**Request:**
```bash
curl http://localhost:3000/api/health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## 🧪 Testing with JavaScript/Frontend

### Fetch Example (Creating Order)

```javascript
const orderData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States"
  },
  items: [
    {
      id: "1",
      name: "Wireless Headphones",
      price: 99.99,
      emoji: "🎧",
      quantity: 2
    }
  ],
  totalAmount: 229.77
};

fetch('http://localhost:3000/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(orderData)
})
.then(response => response.json())
.then(data => {
  console.log('Order created:', data.orderId);
  console.log('Full response:', data);
})
.catch(error => console.error('Error:', error));
```

### Fetch Example (Getting All Orders)

```javascript
fetch('http://localhost:3000/api/orders')
  .then(response => response.json())
  .then(data => {
    console.log('Total orders:', data.count);
    console.log('Orders:', data.orders);
  })
  .catch(error => console.error('Error:', error));
```

### Fetch Example (Getting Specific Order)

```javascript
const orderId = 'ORD-1705273257123';

fetch(`http://localhost:3000/api/orders/${orderId}`)
  .then(response => response.json())
  .then(data => {
    console.log('Order:', data.order);
    console.log('Customer:', data.order.personalInfo.firstName);
    console.log('Total:', data.order.totalAmount);
  })
  .catch(error => console.error('Error:', error));
```

---

## 🧬 MongoDB Database Queries

### Connect to MongoDB

```bash
# If MongoDB installed locally
mongo

# If using MongoDB Atlas, use the connection string provided
```

### View Database Structure

```bash
# Show databases
show databases

# Use ecommerce database
use ecommerce_db

# Show collections
show collections

# Count total orders
db.orders.count()
```

### Query Orders

```bash
# Get all orders
db.orders.find()

# Get orders for specific customer
db.orders.find({ "personalInfo.email": "john@example.com" })

# Get orders by total amount (greater than $100)
db.orders.find({ "totalAmount": { $gt: 100 } })

# Get specific order by ID
db.orders.findOne({ "_id": "ORD-1705273257123" })

# Sort orders by date (newest first)
db.orders.find().sort({ "createdAt": -1 })

# Get last 5 orders
db.orders.find().sort({ "createdAt": -1 }).limit(5)

# Count orders from specific country
db.orders.count({ "personalInfo.country": "United States" })

# Get total revenue
db.orders.aggregate([
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$totalAmount" },
      totalOrders: { $sum: 1 },
      averageOrder: { $avg: "$totalAmount" }
    }
  }
])
```

### Update Orders

```bash
# Update order status
db.orders.updateOne(
  { "_id": "ORD-1705273257123" },
  { $set: { "status": "shipped" } }
)

# Update multiple orders
db.orders.updateMany(
  { "status": "confirmed" },
  { $set: { "status": "processing" } }
)
```

### Delete Orders

```bash
# Delete specific order
db.orders.deleteOne({ "_id": "ORD-1705273257123" })

# Delete all orders (be careful!)
db.orders.deleteMany({})
```

---

## 📊 Advanced Queries

### Get Revenue by Country

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$personalInfo.country",
      revenue: { $sum: "$totalAmount" },
      orders: { $sum: 1 }
    }
  },
  { $sort: { revenue: -1 } }
])
```

### Get Best Selling Products

```javascript
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.name",
      totalSold: { $sum: "$items.quantity" },
      totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
    }
  },
  { $sort: { totalSold: -1 } }
])
```

### Get Orders by Date Range

```javascript
db.orders.find({
  createdAt: {
    $gte: new Date("2026-01-01"),
    $lte: new Date("2026-01-31")
  }
})
```

---

## 🔧 Node.js Client Example

```javascript
const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb://localhost:27017';
const client = new MongoClient(MONGODB_URI);

async function getAllOrders() {
  try {
    await client.connect();
    const db = client.db('ecommerce_db');
    const orders = await db.collection('orders').find({}).toArray();
    console.log('Orders:', orders);
  } finally {
    await client.close();
  }
}

getAllOrders();
```

---

## 📝 Error Handling Examples

### Invalid Order Data
```json
{
  "error": "Invalid order data"
}
```

### Order Not Found
```json
{
  "error": "Order not found"
}
```

### Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Database connection failed"
}
```

---

## 🎯 Common Use Cases

### Track Order
```bash
# Get specific order details
curl http://localhost:3000/api/orders/ORD-1705273257123
```

### View Sales Stats
```bash
# Get all orders for aggregation
curl http://localhost:3000/api/orders | jq '.orders | length'
```

### Export Orders
```bash
# Save all orders to JSON file
curl http://localhost:3000/api/orders | jq '.orders' > orders.json
```

---

**Ready to test your API! 🚀**
