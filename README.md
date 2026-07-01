# 📝 Full Stack Task Manager

A full-stack Task Manager application built using the MERN stack. It allows users to register, log in securely, and manage their personal tasks with features like search, filtering, sorting, editing, deleting, and pagination.

#frontend-link : 
---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt

### Task Management
- Create Task
- View Tasks
- Update Task
- Delete Task

### Task Utilities
- Search Tasks
- Filter by Status
- Filter by Priority
- Sort by Newest/Oldest
- Pagination

### Security
- JWT Verification Middleware
- Authorization (Users can only access their own tasks)
- Passwords stored as hashed values
- Protected Backend APIs

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv

---

## 📂 Project Structure

```
FullStackTaskManager/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <your-repository-url>
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server.

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---




## 📸 Screenshots



## 📌 Future Improvements

- Due Dates
- Task Categories
- Dark Mode
- Profile Management
- Email Verification
- Forgot Password
- Drag and Drop Tasks

---

## 👨‍💻 Author

**Divya Raj**

GitHub: https://github.com/divyaraj6952-hub

LinkedIn: www.linkedin.com/in/divya-raj-238073328

project link : https://taskmanager-frontend-zeta.vercel.app/login

---

## 📄 License

This project is created for learning and portfolio purposes.
