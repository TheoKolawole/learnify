
# Learnify - Modern LMS Platform (MERN Stack)

**Learnify** is a modern, full-featured Learning Management System (LMS) built with the MERN stack. Designed to be scalable and developer-friendly, it serves as a foundation for building educational platforms where instructors can create courses, and students can enroll, learn, and track progress.

![Learnify Logo](/api/placeholder/200/80)

## 🌟 Features

- 👨‍🏫 Instructor & Student Roles
- 📚 Course creation, enrollment, and management
- 🔒 Secure JWT-based authentication
- 🎨 Customizable themes and responsive UI
- 💾 MongoDB for persistent data storage
- 📊 Student progress tracking (quizzes, completion status, etc.)
- 🧪 Built-in testing support (Jest)
- 🐳 Docker-ready for easy deployment

## 🧱 Tech Stack

### Frontend
- React 18
- React Router v6
- Redux Toolkit
- Axios for HTTP requests
- TailwindCSS for modern styling
- Jest & React Testing Library

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT + Bcrypt for secure auth
- REST API structure
- Jest for backend testing

## ✅ Prerequisites

- Node.js v16+
- npm v8+ or yarn
- MongoDB (local or Atlas)
- Git

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/theokolawole/Learnify.git
cd Learnify
```

### Install Dependencies

```bash
# Backend
cd api
npm install

# Frontend
cd ../client
npm install
```

### Configure Environment Variables

**Backend (`api/.env`)**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/Learnify
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

**Frontend (`client/.env`)**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Run in Development

```bash
# Backend (api/)
npm run dev

# Frontend (client/)
npm start
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 🏗 Project Structure

```
Learnify/
├── client/        # React LMS frontend
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   └── utils/
├── api/           # Node.js backend API
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── validation/
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users
- `GET /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Courses
- `GET /api/courses`
- `POST /api/courses`
- `GET /api/courses/:id`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`

### Enrollments
- `POST /api/enroll`
- `GET /api/enrollments/:userId`

## 🎨 Customization

### Styling
- Tailwind config: `client/tailwind.config.js`
- Theme support via context and utility classes

### Feature Extensions
- Add new pages in `client/src/pages`
- Create new APIs in `api/routes` and `api/controllers`
- Update state via Redux slices in `client/src/redux`

## 🧪 Testing

**Frontend:**

```bash
cd client
npm test
```

**Backend:**

```bash
cd api
npm test
```

## 🚢 Deployment

### Docker (recommended)

```bash
docker-compose up -d
```

### Manual

- Deploy backend on Heroku, Render, or DigitalOcean
- Deploy frontend on Netlify or Vercel

## 🤝 Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

Licensed under the MIT License.

## 🙌 Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)

## 📬 Contact

**Theophilus Kolawole**  
📧 [theophiluskolawole19@gmail.com](mailto:theophiluskolawole19@gmail.com)  
🔗 [GitHub Repo](https://github.com/theokolawole/Learnify)
