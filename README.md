# EcoStore - Ecommerce Website

A complete, fully-functional ecommerce website built with pure HTML, CSS, and JavaScript. No frameworks or dependencies required!

## Features

✨ **Core Features:**
- 🏪 Product catalog with 6 sample products
- 🛍️ Shopping cart with local storage persistence
- 🔍 Product search and category filtering
- 📱 Responsive design (mobile, tablet, desktop)
- ✅ Checkout form with personal information collection
- 📋 Order confirmation page
- 💾 Data saved locally in browser

## 📋 Pages & Functionality

### Home Page
- Hero section with call-to-action
- Category navigation
- Featured products showcase
- Feature highlights (Free Shipping, Secure Checkout, Quality Guaranteed)

### Products Page
- Full product catalog
- Category filter sidebar
- Search functionality
- Product cards with pricing and stock information
- Add to cart with quantity selector

### Shopping Cart
- View all items in cart
- Adjust quantities
- Remove items
- Order summary with subtotal, tax, and total
- Proceed to checkout button

### Checkout
- Professional checkout form requesting personal information:
  - First Name & Last Name
  - Email & Phone Number
  - Address, City, State, ZIP Code
  - Country selection
- Form validation with error messages
- Order summary
- Complete purchase button

### Order Confirmation
- Order ID display
- Customer information summary
- Order total
- Success message

## 🚀 How to Run

### Option 1: Simple File Opening
1. Open `index.html` in any modern web browser

### Option 2: Local Server (Recommended)
Using Python 3:
```bash
cd /Users/indracyberschool/ecommerce
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser

Using Node.js (with http-server):
```bash
npx http-server
```

## 📁 File Structure

```
ecommerce/
├── index.html       # Main HTML file with all page structures
├── styles.css       # Complete styling with responsive design
├── app.js           # JavaScript logic for all functionality
└── README.md        # This file
```

## 🛒 Product Catalog

The site includes 6 sample products:
1. **Wireless Headphones** - $99.99 (Electronics)
2. **Smart Watch** - $199.99 (Electronics)
3. **USB-C Cable** - $19.99 (Accessories)
4. **Phone Case** - $29.99 (Accessories)
5. **Portable Charger** - $49.99 (Electronics)
6. **Screen Protector** - $9.99 (Accessories)

To add more products, edit the `products` array in `app.js`.

## 💡 Key JavaScript Features

- **LocalStorage Integration**: Cart persists even after browser refresh
- **Form Validation**: Comprehensive client-side validation with error messages
- **Dynamic Rendering**: All pages rendered dynamically from data
- **Page Navigation**: Single-page application with multiple views
- **Responsive Design**: Mobile-first CSS with media queries
- **Search & Filter**: Real-time search and category filtering

## 🎨 Customization

### Change Products
Edit the `products` array in `app.js` to add, remove, or modify products.

### Change Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;
    --success-color: #16a34a;
    --danger-color: #dc2626;
    /* ... etc */
}
```

### Add Payment Processing
To implement real payments, modify the `submitCheckout()` function in `app.js` to integrate with Stripe, PayPal, or your payment provider.

## 🔒 Security Notes

This is a frontend demo. For production use:
- Implement backend server for order processing
- Use HTTPS for all transactions
- Never expose sensitive credentials in frontend code
- Add server-side form validation
- Integrate with a real payment processor
- Store customer data securely

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Features Overview

| Feature | Status |
|---------|--------|
| Product Display | ✅ Complete |
| Shopping Cart | ✅ Complete |
| Search Function | ✅ Complete |
| Category Filter | ✅ Complete |
| Checkout Form | ✅ Complete |
| Personal Info Collection | ✅ Complete |
| Order Confirmation | ✅ Complete |
| Local Storage | ✅ Complete |
| Responsive Design | ✅ Complete |
| Payment Gateway | ⏳ Not Implemented |

## 📞 Support

For customization or modifications, simply edit the HTML, CSS, or JavaScript files. No build process or dependencies required!

## 📄 License

Free to use and modify for personal or commercial projects.

---

**Built with ❤️ using pure HTML, CSS, and JavaScript**
# ecommerce-test
