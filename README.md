# MERN Blog Platform

A full-stack blog application built using the **MERN stack (MongoDB, Express, React, Node.js)** — allowing users to register, log in, create posts, edit or delete them, and like other users’ posts in a responsive, modern interface.

---

## 🚀 Features

- 🔐 JWT Authentication (Login / Register / Logout)
- 📝 Create, edit, delete personal blog posts
- ❤️ Like or unlike posts
- 👤 Profile page displaying user’s own posts
- 🌗 Responsive for both desktop and mobile
- 🔁 Token refresh for persistent login
- ⚙️ RESTful API with Express + MongoDB

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React (Vite), Axios, CSS |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Auth | JSON Web Tokens (JWT) |
| Tools | Git, GitHub, VS Code |

---

## 📂 Project Structure

<code>blog/
│
├── blog-api/ # Backend (Express + MongoDB)
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── server.js
│
└── blog-frontend/ # Frontend (React + Vite)
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── assets/
│ └── main.jsx
├── public/
└── package.json
</code>


---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/rajathacharya/mern-blog-app.git
cd mern-blog-app
```
### 2️⃣ Backend setup
```bash
cd blog-api
npm install
# Add your MongoDB URI and JWT secrets to .env
npm run dev
```

### 3️⃣ Frontend setup
```bash
cd ../blog-frontend
npm install
npm run dev
```
### 🌐 Environment Variables
Inside blog-api/.env
```bash
cd blog-api
npm install
# Add your MongoDB URI and JWT secrets to .env
npm run dev
```




