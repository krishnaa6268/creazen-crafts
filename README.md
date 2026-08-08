# Creazen Crafts — Where Ideas Take Shape

> **An artisan marketplace & handcrafted bespoke creations web application.**  
> *Crafted with passion, designed for seamless shopping, and optimized across every screen resolution.*

---

## Overview

**Creazen Crafts** is a premium e-commerce platform built to showcase handcrafted products, wedding invitations, hamper baskets, ring ceremony platters, and custom artisan gifts. The application features a glassmorphic design system, persistent shopping bag drawer, multi-step checkout flow, quick-view product modal, user authentication session management, and responsive navigation across all mobile, tablet, and desktop viewports.

---

## Key Features

### E-Commerce & Shopping Cart Engine
- **Persistent Shopping Bag (`localStorage`)**: Cart items, quantities, and subtotal remain saved across page refreshes and sub-page navigations.
- **Slide-Out Shopping Bag Drawer**: Accessible from the persistent header cart button with a dynamic red badge counter.
- **Free Express Shipping Progress Meter**: Real-time progress bar encouraging customers to add items to unlock free shipping (`₹999` threshold).
- **Interactive Quantity Steppers**: Increase, decrease, or remove items directly within the drawer.

### 3-Step Checkout System
- **Step 1: Shipping Address**: Form validation for recipient name, contact number, street address, city, and postal code.
- **Step 2: Flexible Payment Methods**: Support for UPI / Google Pay / PhonePe (with instant cashback discount), Credit/Debit Card, or Cash on Delivery (COD).
- **Step 3: Order Confirmation**: Interactive order placement generating a unique tracking ID (`CRZ-XXXXX`), estimated delivery timeframe, and auto-clearing the cart.

### Quick View Modal
- Click **"Quick View"** on any product card across the store to open an overlay displaying high-resolution images, star ratings, price comparisons, craft story descriptions, and an instant **"Add to Bag"** button.

### User Authentication Engine
- **Session Management**: Logged-in session status stored in `localStorage`.
- **Header Avatar Dropdown**: Upon logging in, default authentication action buttons transform into a user initial avatar with a drop-down menu for orders and sign-out.
- **Pre-Loaded Demo Account**:
  - **Email**: `user@creazen.com`
  - **Password**: `password123`

### Responsive Mobile Drawer Navigation
- Sticky glassmorphic header bar (`backdrop-filter: blur(14px)`).
- Touch-friendly mobile hamburger menu drawer with smooth backdrop blur overlay and mobile category accordions.

---

## Tech Stack & Architecture

- **Frontend**: HTML5, Vanilla JavaScript (ES6+ Modules & OOP)
- **Styling**: Vanilla CSS3 (Design Tokens, Custom CSS Variables, Glassmorphism, CSS Grid, Flexbox)
- **Iconography & Fonts**: FontAwesome v6.7.1, Google Fonts (`Outfit` & `Plus Jakarta Sans`)
- **Carousel & Animations**: Swiper.js v11

---

## Repository Directory Structure

```text
creazen-crafts/
├── index.html                  # Main E-Commerce Homepage
├── README.md                   # Project Documentation
├── assets/                     # Stylesheets, Scripts & Media Assets
│   ├── css/
│   │   ├── global.css          # Design System Tokens, Cart Drawer, Modals & Toast UI
│   │   ├── index.css           # Homepage Styles, Hero Swiper & Video Showcase
│   │   ├── catagory.css        # Product Catalog & Sub-header Navigation Styles
│   │   ├── about.css           # About Us Page Layout & Story Cards
│   │   ├── become-partner.css  # Seller Onboarding & Application Form
│   │   ├── career.css          # Career Jobs List & Perks Grid
│   │   ├── contact-us.css      # Contact Info Cards & Map Styles
│   │   ├── login.css           # Split-Card Authentication Interface
│   │   └── privacy.css        # Policy Toc & Document Sections
│   ├── js/
│   │   ├── cart.js             # Global CartEngine (Bag, Checkout, Quick View & Toast)
│   │   ├── auth.js             # Global AuthEngine (Login, Signup, User Session & Avatar)
│   │   ├── index.js            # Mobile Drawer Toggle & Hero Carousel Logic
│   │   ├── catagory.js         # Dynamic Product Grid Generator & Category Filters
│   │   ├── login.js            # Login Form Controller
│   │   ├── signup.js           # Signup Form Controller
│   │   ├── become-partner.js   # Partner Application Form Handler
│   │   └── career.js           # Job Application Form Handler
│   ├── images/                 # Product Showcase, Banners & Logo Assets
│   └── video/                  # Artisanal Crafting Video Backgrounds
└── src/                        # Sub-Page Modules
    ├── catagory.html           # Handcrafted Products Showcase & Categories
    ├── about-us.html           # Brand Story, Team & Vision
    ├── become-partner.html     # Artisan Seller Registration Page
    ├── career-with-creazen.html# Open Job Roles & Culture
    ├── contact.html            # Customer Support & Contact Form
    ├── login.html              # Customer Login Page
    ├── signup.html             # Customer Account Registration
    ├── policy.html             # Privacy & Store Policies
    └── request-services.html   # Bespoke Custom Orders & Services Request
```

---

## Getting Started

### Prerequisites
- Any modern web browser (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).

### Running Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/krishnaa6268/creazen-crafts.git
   cd creazen-crafts
   ```
2. **Open in Browser**:
   - Open `index.html` directly in your browser, OR start a simple static web server:
   ```bash
   npx serve .
   ```
   - Navigate to `http://localhost:3000`.

---

## Route Links & Navigation Map

| Page | File Route | Description |
| :--- | :--- | :--- |
| **Home** | `index.html` | Hero slider, product categories, craft video grid & CTAs |
| **Product Catalog** | `src/catagory.html` | Filterable product showcase with Quick View & Add to Bag |
| **About Us** | `src/about-us.html` | Brand origin, artisan stories & vision |
| **Become a Seller** | `src/become-partner.html` | Artisan partner application & seller perks |
| **Careers** | `src/career-with-creazen.html` | Open positions & workplace perks |
| **Custom Orders** | `src/request-services.html` | Request customized wedding invitations & hampers |
| **Contact Us** | `src/contact.html` | Customer support, contact form & location details |
| **Log In** | `src/login.html` | User login page (Demo: `user@creazen.com` / `password123`) |
| **Sign Up** | `src/signup.html` | Account registration page |
| **Policies** | `src/policy.html` | Privacy, shipping, & return policies |

---

## License & Attribution

© 2025 **Creazen Crafts**. All Rights Reserved.  
*Handcrafted with ❤️ for artisans and craft lovers everywhere.*
