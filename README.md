# 🛍️ E-Commerce Admin Panel (Node.js + Express + MongoDB)

A complete **Admin Panel** backend for an e-commerce system built using **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **EJS views**. This project allows admins to manage categories, subcategories, products, and other related data through a clean and modular structure.

---

## 📁 Project Structure
```
├── config/
│   └── dbconfig.js
│
├── controllers/
│   ├── admin.controller.js
│   ├── category.controller.js
│   ├── extraproduct.controller.js
│   ├── product.controller.js
│   └── subcategory.controller.js
│
├── middlewares/
│   ├── fileUpload.js
│   ├── imageUpload.js
│   └── userAuth.js
│
├── models/
│   ├── category.model.js
│   ├── extraproduct.model.js
│   ├── product.model.js
│   ├── subcategory.model.js
│   └── user.model.js
│
├── public/
│   ├── assets/
│   ├── extra files/
│   ├── images/
│   └── dist/css
│
├── routes/
│   ├── admin.route.js
│   ├── category.route.js
│   ├── extraproduct.route.js
│   ├── product.route.js
│   └── subcategory.route.js
│
├── uploads/
│
├── views/
│   ├── addcategory.ejs
│   ├── addsubcategory.ejs
│   ├── addproduct.ejs
│   ├── editcategory.ejs
│   ├── editsubcategory.ejs
│   ├── editproduct.ejs
│   ├── product-detail.ejs
│   ├── viewcategory.ejs
│   ├── viewsubcategory.ejs
│   ├── viewproduct.ejs
│   └── pages/ (login, dashboard etc.)
│
├── partials/
│   ├── footer.ejs
│   └── header.ejs
│
├── app.js
├── package.json
└── README.md
```

---

## 🚀 Features
### **Admin Functionalities**
- Add / Edit / Delete **Categories**
- Add / Edit / Delete **Subcategories**
- Add / Edit / Delete **Extracategories**
- Add / Edit / Delete **Products**
- Upload product images (Multer)
- Dashboard UI with EJS
- Admin Authentication

### **Tech Stack**
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **EJS Template Engine**
- **Multer (Image Uploads)**
- **Express Session**
- **BCrypt (Password Hashing)**

---

## ⚙️ Installation & Setup

### **1. Clone the Repository**
```bash
 git clone <https://github.com/devanshi78/PR-9-Make-Admin-Panel-on-Requirement>
 cd <PR-9-Make-Admin-Panel-on-Requiremen>
```

### **2. Install Dependencies**
```bash
 npm install
```

### **3. Configure Environment Variables**
Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce-admin
SESSION_SECRET=YourSecretKey
```

### **4. Start the Server**
```bash
 npm start   # or
 node app.js
```

Server will run at: **http://localhost:5000**

---

## 📦 API & Route Overview

### **Admin Routes**
```
/admin/login
/admin/signup
/admin/profile
/admin/dashboard
```

### **Category Management**
```
/category/add
/category/view
/category/edit/:id
/category/delete/:id
```

### **Subcategory Management**
```
/subcategory/add
/subcategory/view
/subcategory/edit/:id
/subcategory/delete/:id
```

### **Extracategory Management**
```
/extracategory/add
/extracategory/view
/extracategory/edit/:id
/extracategory/delete/:id
```

### **Product Management**
```
/product/add
/product/view
/product/details/:id
/product/edit/:id
/product/delete/:id
```

---

## 🖼️ Image Uploads
This project uses **Multer** for handling image uploads.
- Uploaded files stored in **/uploads/** folder
- Filename auto-renamed for uniqueness

---

## 🧩 Middleware Used
- **userAuth.js** → Admin session validation
- **fileUpload.js / imageUpload.js** → Handling images
- **Error handling middleware** built-in

---

## 📚 Future Enhancements
- Add role-based access control
- Add pagination for products
- Add search/filter options
- Convert EJS to React admin panel
- Add analytics dashboard

---

## 🤝 Contributing
Pull requests are welcome! For major changes, open an issue first to discuss.

---

## 📄 License
This project is licensed under the **MIT License**.
```