const http = require('http');
const { MongoClient } = require('mongodb');
const url = require('url');
require('dotenv').config();

// MongoDB Connection String
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'ecommerce_db';
const ORDERS_COLLECTION = 'orders';
const USERS_COLLECTION = 'users';

let client;
let db;

// Initialize MongoDB Connection
async function connectMongoDB() {
    try {
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db(DB_NAME);
        console.log('✅ Connected to MongoDB');
        
        // Create collections if they don't exist
        await db.createCollection(ORDERS_COLLECTION).catch(() => {});
        await db.createCollection(USERS_COLLECTION).catch(() => {});
        
        return true;
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        return false;
    }
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    try {
        // Auth Routes
        if (pathname === '/api/auth/signup' && req.method === 'POST') {
            await handleSignup(req, res);
        } else if (pathname === '/api/auth/login' && req.method === 'POST') {
            await handleLogin(req, res);
        }
        // Order Routes
        else if (pathname === '/api/orders' && req.method === 'POST') {
            await handleCreateOrder(req, res);
        } else if (pathname === '/api/orders' && req.method === 'GET') {
            await handleGetOrders(req, res);
        } else if (pathname.match(/^\/api\/orders\/[a-zA-Z0-9-]+$/) && req.method === 'GET') {
            const orderId = pathname.split('/')[3];
            await handleGetOrderById(orderId, res);
        }
        // Health Check
        else if (pathname === '/api/health' && req.method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify({ status: 'ok', message: 'Server is running' }));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Route not found' }));
        }
    } catch (error) {
        console.error('Server Error:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Internal Server Error', message: error.message }));
    }
});

// Handle Signup
async function handleSignup(req, res) {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const { username, password } = JSON.parse(body);

            if (!username || !password) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Username and password are required' }));
                return;
            }

            // Check if user already exists
            const existingUser = await db.collection(USERS_COLLECTION).findOne({ username });
            if (existingUser) {
                res.writeHead(409);
                res.end(JSON.stringify({ error: 'User already exists' }));
                return;
            }

            // Create new user
            const newUser = {
                username,
                password,
                createdAt: new Date().toISOString()
            };

            const result = await db.collection(USERS_COLLECTION).insertOne(newUser);

            res.writeHead(201);
            res.end(JSON.stringify({
                success: true,
                message: 'User registered successfully',
                userId: result.insertedId
            }));
        } catch (error) {
            console.error('Signup Error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to register user', details: error.message }));
        }
    });
}

// Handle Login
async function handleLogin(req, res) {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const { username, password } = JSON.parse(body);

            if (!username || !password) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Username and password are required' }));
                return;
            }

            // Find user by username
            const user = await db.collection(USERS_COLLECTION).findOne({ username });

            if (!user) {
                res.writeHead(401);
                res.end(JSON.stringify({ error: 'Invalid username or password' }));
                return;
            }

            // Check password (in production, use bcrypt for password hashing)
            if (user.password !== password) {
                res.writeHead(401);
                res.end(JSON.stringify({ error: 'Invalid username or password' }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify({
                success: true,
                message: 'Login successful',
                userId: user._id,
                username: user.username
            }));
        } catch (error) {
            console.error('Login Error:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to login', details: error.message }));
        }
    });
}

// Handle Create Order
async function handleCreateOrder(req, res) {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const orderData = JSON.parse(body);

            const order = {
                _id: orderData.id,
                personalInfo: orderData.personalInfo,
                items: orderData.items,
                totalAmount: orderData.totalAmount,
                createdAt: new Date(),
                status: 'confirmed',
                ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress
            };

            // Insert into MongoDB
            const result = await db.collection(ORDERS_COLLECTION).insertOne(order);

            console.log(`✅ Order created: ${order._id}`);

            res.writeHead(201);
            res.end(JSON.stringify({
                success: true,
                message: 'Order created successfully',
                orderId: order._id,
                order: order
            }));
        } catch (error) {
            console.error('Error creating order:', error);
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Failed to create order', details: error.message }));
        }
    });
}

// Handle Get All Orders
async function handleGetOrders(req, res) {
    try {
        const orders = await db.collection(ORDERS_COLLECTION).find({}).toArray();

        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            count: orders.length,
            orders: orders
        }));
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to fetch orders', details: error.message }));
    }
}

// Handle Get Order by ID
async function handleGetOrderById(orderId, res) {
    try {
        const order = await db
            .collection(ORDERS_COLLECTION)
            .findOne({ _id: orderId });

        if (!order) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Order not found' }));
            return;
        }

        res.writeHead(200);
        res.end(JSON.stringify({
            success: true,
            order: order
        }));
    } catch (error) {
        console.error('Error fetching order:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Failed to fetch order', details: error.message }));
    }
}

// Start Server
const PORT = process.env.PORT || 3000;

async function start() {
    const mongoConnected = await connectMongoDB();
    
    if (mongoConnected) {
        server.listen(PORT, () => {
            console.log(`\n🚀 Ecommerce API Server with Auth running on http://localhost:${PORT}`);
            console.log(`📊 MongoDB Database: ${DB_NAME}`);
            console.log(`\n📝 API Endpoints:`);
            console.log(`   POST   /api/auth/signup      - Register new user`);
            console.log(`   POST   /api/auth/login       - Login user`);
            console.log(`   POST   /api/orders          - Create new order`);
            console.log(`   GET    /api/orders          - Get all orders`);
            console.log(`   GET    /api/orders/:id      - Get order by ID`);
            console.log(`   GET    /api/health          - Health check\n`);
        });
    } else {
        console.error('Failed to connect to MongoDB. Please ensure MongoDB is running.');
        console.log('\nTo start MongoDB locally:');
        console.log('  - macOS (with Homebrew): brew services start mongodb-community');
        console.log('  - Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas\n');
        process.exit(1);
    }
}

// Graceful Shutdown
process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    if (client) {
        await client.close();
    }
    process.exit(0);
});

start();
