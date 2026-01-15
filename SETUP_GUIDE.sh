#!/bin/bash

# ===============================================
#  🛍️  ECOMMERCE WEBSITE - COMPLETE SETUP GUIDE
# ===============================================

cat << 'EOF'

╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║          ✅ MONGODB INSTALLATION COMPLETE                     ║
║                                                                ║
║   Your ecommerce website is ready with MongoDB backend!       ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

📦 INSTALLED PACKAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ mongodb@7.0.0 - Official MongoDB driver for Node.js
  
  Location: /Users/indracyberschool/ecommerce/node_modules/mongodb
  
  Verify: npm list mongodb


📁 PROJECT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ecommerce/
  ├── Frontend Files
  │   ├── index.html           ← Main website
  │   ├── app.js               ← Frontend (localStorage)
  │   ├── app-with-backend.js  ← Frontend (MongoDB backend)
  │   └── styles.css           ← Website styling
  │
  ├── Backend Files
  │   ├── server.js            ← Node.js API server
  │   ├── package.json         ← Node.js configuration
  │   └── node_modules/        ← Installed packages
  │
  └── Documentation
      ├── README.md                    ← Project overview
      ├── BACKEND_SETUP.md             ← Backend setup guide
      ├── API_EXAMPLES.md              ← API examples
      ├── INSTALLATION_COMPLETE.md     ← Installation summary
      ├── MONGODB_INSTALLED.md         ← This file
      └── start.sh                     ← Quick start script


🚀 QUICK START (Choose One)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Option 1: Frontend Only (No Backend Needed)
───────────────────────────────────────────
  cd /Users/indracyberschool/ecommerce
  python3 -m http.server 8000
  
  Then visit: http://localhost:8000
  
  ✅ Works offline
  ✅ No backend required
  ❌ Data stored locally per browser

Option 2: With MongoDB Backend
────────────────────────────────
  Terminal 1 - Start MongoDB:
    brew services start mongodb-community
  
  Terminal 2 - Start Backend Server:
    cd /Users/indracyberschool/ecommerce
    npm start
  
  Terminal 3 - Start Frontend:
    cd /Users/indracyberschool/ecommerce
    python3 -m http.server 8000
  
  Then visit: http://localhost:8000
  
  ✅ Orders stored in MongoDB
  ✅ Shared across users
  ✅ Persistent storage
  ⚠️  Requires MongoDB running

Option 3: Use the Quick Start Script
─────────────────────────────────────
  bash /Users/indracyberschool/ecommerce/start.sh
  
  This will guide you through setup interactively


📡 API ENDPOINTS (Backend Mode Only)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When backend server is running on http://localhost:3000:

  GET     /api/health              ← Check if server is running
  POST    /api/orders              ← Create new order
  GET     /api/orders              ← Get all orders
  GET     /api/orders/:id          ← Get specific order

Example:
  curl http://localhost:3000/api/health
  curl http://localhost:3000/api/orders


⚙️  NPM SCRIPTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  npm start         ← Start backend server on port 3000
  npm run dev       ← Start backend server (alternative)
  npm list mongodb  ← Verify MongoDB is installed


🔄 HOW IT WORKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend (HTML/CSS/JavaScript)
  ↓ User shops and adds to cart
  ↓ Fills checkout form
  ↓
Backend Server (Node.js)
  ↓ Validates order data
  ↓ Stores in MongoDB
  ↓
MongoDB Database
  ↓ Persists customer orders
  ↓
Confirmation page shows to user


📊 MONGODB DATABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Database Name: ecommerce_db
Collection Name: orders

Each order contains:
  - Order ID (unique identifier)
  - Customer personal info (name, email, phone, address, etc.)
  - Items ordered (product details and quantities)
  - Order total amount
  - Status (confirmed, shipped, etc.)
  - Timestamp (when order was created)

View orders in MongoDB:
  mongo
  use ecommerce_db
  db.orders.find()


✅ VERIFICATION CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MongoDB installed:
  npm list mongodb
  ✅ Should show: mongodb@7.0.0

Backend server starts:
  npm start
  ✅ Should show: ✅ Connected to MongoDB

Frontend loads:
  python3 -m http.server 8000
  ✅ Should load at http://localhost:8000

API responds:
  curl http://localhost:3000/api/health
  ✅ Should return: {"status":"ok",...}


🆘 TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MongoDB not starting?
  → brew services start mongodb-community
  → Check: brew services list
  → Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas

Port 3000 already in use?
  → lsof -i :3000
  → kill -9 <PID>

Backend not connecting?
  → Check MongoDB is running
  → Verify port 3000 is available
  → Check browser console for errors

CORS errors?
  → Ensure backend server is running
  → Make sure both frontend and backend are on correct ports
  → Hard refresh browser (Cmd+Shift+R)


📚 DOCUMENTATION FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read these for more detailed information:

  README.md
    → Project overview
    → Features list
    → Browser support

  BACKEND_SETUP.md
    → Detailed backend configuration
    → MongoDB connection options
    → Production deployment guide

  API_EXAMPLES.md
    → Complete API usage examples
    → curl commands
    → JavaScript fetch examples
    → MongoDB queries

  INSTALLATION_COMPLETE.md
    → Installation summary
    → Quick reference
    → Next steps

  start.sh
    → Interactive startup script
    → Choose between different setups


💡 SWITCHING BETWEEN MODES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend Only Mode (localStorage):
  Edit index.html and change:
    <script src="app.js"></script>

With MongoDB Backend:
  Edit index.html and change:
    <script src="app-with-backend.js"></script>

Then restart the website.


🎯 NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Choose your setup option above
2. Follow the Quick Start instructions
3. Test adding products to cart
4. Go through the checkout process
5. Enter your personal information
6. View the order confirmation
7. Check backend for stored orders:
   curl http://localhost:3000/api/orders


📞 HELP & SUPPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If something doesn't work:

1. Check browser console for errors (F12)
2. Check terminal output for server errors
3. Verify MongoDB is running
4. Make sure ports 3000 and 8000 are available
5. Read the documentation files for detailed help


═══════════════════════════════════════════════════════════════════

Ready to get started? Run one of the Quick Start commands above!

Your ecommerce website with MongoDB backend is ready to use! 🚀

═══════════════════════════════════════════════════════════════════

EOF
