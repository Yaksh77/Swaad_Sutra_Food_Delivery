# 🍽️ Swaad Sutra – Food Delivery Platform

### 🚀 Full Stack MERN Project (Multi-Role: User | Shop Owner | Delivery Boy)

Swaad Sutra is a full-fledged **Food Delivery Web Application** built using the **MERN Stack**, integrating **Socket.IO**, **JWT Authentication**, **Real-Time Order Tracking**, **Delivery Assignment**, and **Google GeoAPI Location System**.

---

## 🌿 Themed UI

The project follows a **Green Theme** for consistency and freshness:

- **Primary Color:** `#43A047`
- **Hover Color:** `#2E7D32`
- **Background Color:** `#F1F8E9`
- **Border Color:** `#A5D6A7`

### 💚 Design Philosophy
- Minimalistic, fresh, and modern UI.
- Rounded corners, smooth shadows.
- Consistent typography and button shapes.
- Success screens and delivery dashboards use animated green tick icons and success messages.

---

## 🧠 Tech Stack

### **Frontend:**
- React.js (Vite)
- Redux Toolkit
- Axios
- Socket.IO Client
- Tailwind CSS
- Firebase Auth (for Google Sign-In)
- React Router DOM
- Geoapify Reverse Geocoding API

### **Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt.js
- Cookie Parser
- Socket.IO Server
- CORS
- Dotenv

---

## ⚙️ Project Setup Guide

### 🖥️ Prerequisites
Make sure you have installed:
- **Node.js (v18 or later)**
- **MongoDB (local or Atlas URI)**
- **npm or yarn**

---

## 🧩 Backend Setup

### 📁 Navigate to the backend folder
```bash
cd backend
```

📦 Install dependencies

```bash
npm install
```

⚙️ Create .env file

Inside /backend, create a .env file and add:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

▶️ Run the backend server
```
npm run dev
```

The server will start on:
👉 http://localhost:3000

## 💻 Frontend Setup

### 📁 Navigate to the frontend folder
```
cd frontend
```

### 📦 Install dependencies
```
npm install
```

### ⚙️ Create .env file Inside /frontend, add:
```
VITE_GEO_API_KEY=your_geoapify_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_APP_ID=your_firebase_app_id
VITE_SERVER_API=http://localhost:3000/api
```

### ▶️ Run the frontend (Vite)
```
npm run dev
```
The app will open at:
👉 http://localhost:5173

### 🔐 Authentication Flow

Sign Up: Creates new user, hashes password using bcrypt, and stores JWT token in cookie.
Sign In: Validates user and sets token cookie.
Auto Sign-In (useGetCurrentUser): Fetches logged-in user from token on refresh.
Sign Out: Clears token cookie.

### 🚚 Delivery Flow
User places an order → shop receives it.
When shop changes status to Out for Delivery, backend:
Finds nearby delivery boys using MongoDB Geo Query.
Assigns or broadcasts to available ones.
Delivery boy accepts and delivers → Order status updated live via Socket.IO.

### 🔔 Real-Time Features
Socket.IO integration for:
Order status updates
Delivery assignments
Real-time communication between shop, delivery boy, and customer

### 🌍 Location Tracking
Uses Navigator Geolocation API in browser.
Fetches City, State, and Address via Geoapify API.
Sends updated coordinates to backend /api/user/update-user-location.

💚 Delivery Success Page (Example UI Text)
✅ Delivery Completed Successfully!
“Your effort brings smiles and satisfaction to our customers. Keep it up!”

### Buttons:
Return to Dashboard
View Next Delivery
Track Earnings

### 🧰 Common Developer Commands
Command	Description
npm run dev	Run server in development mode
npm start	Run production build
npm run build	Build frontend for production
npm install	Install all dependencies
npx kill-port 3000	Free port if server doesn’t start

### 🧠 Troubleshooting
1️⃣ CORS / Cookie Issue
Make sure both frontend and backend run on localhost.

Set credentials: true in all Axios and CORS configs.

In res.cookie(), use:

sameSite: "lax",
secure: false
2️⃣ Unauthorized (401) on Refresh
User’s token might be missing or expired.

Ensure axios.defaults.withCredentials = true in frontend.

3️⃣ Geoapify CORS Error
Add withCredentials: false for Geoapify request:
axios.get(url, { withCredentials: false })

### 🏗️ Folder Structure
```
Swaad_Sutra/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── components/
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
│
└── README.md
```

### 👨‍💻 Developed by
- Yaksh Chudasama
- Full Stack Developer | MERN | AI & Automation Enthusiast

🌐 GitHub | LinkedIn

“Delivering taste with technology — Swaad Sutra connects hearts through food!” 🍱💚
