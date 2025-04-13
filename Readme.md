# 🧠 MERN Stack Social Media App – Backend

This is the **backend** of a full-stack Social Media Application built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. The backend provides APIs for user authentication, post creation, likes, comments, and user profile management.

---

## 🔥 Features

- 🔐 JWT-based user authentication (Sign Up, Login)
- 👤 Profile picture upload using Cloudinary
- 📝 Create, edit, delete posts with images
- 👍 Like and unlike posts
- 💬 Add, delete, and fetch comments
- 🔒 Protected routes with middleware
- 🧾 Pagination for feed
- 🗃️ MongoDB with Mongoose models
- 📁 Clean modular folder structure

---


---

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/vishnu010603/Social_media_backend.git
cd Social_media_backend
```

2. **Install dependices**

```bash
npm i
```
3. **Create .env file with given data**
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
4. ** Run the Project**
```bash
    npm run start
````
# 🌐 API Endpoints – MERN Social Media App Backend

---

## 🔐 Auth Routes (`/api/auth`)

- `POST /signup`
- `POST /login`
- `PUT /profile-pic`

---

## 📝 Post Routes (`/api/posts`)

- `GET /`
- `POST /`
- `PUT /:id/like`
- `DELETE /:id`

---

## 💬 Comment Routes (`/api/comments`)

- `GET /:postId`
- `POST /:postId`
- `PUT /:commentId`
- `DELETE /:commentId`


## Created BY Vishnu Vardhan Kattameedi - kattameedivishnuvardhan@gmail.com
