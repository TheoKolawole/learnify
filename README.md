# Learnify - MERN Stack Template

A robust, scalable MERN (MongoDB, Express, React, Node.js) template project that provides a solid foundation for building modern web applications.

![Learnify Logo](/api/placeholder/200/80)

## Features

- 🚀 Full-stack JavaScript application
- 📱 Responsive design with mobile-first approach
- 🔒 JWT Authentication system
- 🔄 RESTful API architecture
- 📊 MongoDB database integration
- 🎨 Modern UI with customizable themes
- 📄 Form validation
- 📦 Docker support for easier deployment

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios for API requests
- Styled Components / TailwindCSS
- Jest & React Testing Library

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Jest for testing

## Prerequisites

Before you start, make sure you have the following installed:
- Node.js (v16.x or higher)
- npm (v8.x or higher) or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Installation

### Clone the repository

```bash
git clone https://github.com/theokolawole/Learnify.git
cd Learnify
```

### Install dependencies

```bash
# Install backend dependencies
cd api
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

1. In the `api` directory, create a `.env` file with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/Learnify
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

2. In the `client` directory, create a `.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

```bash
# Run backend server (from the api directory)
npm run dev

# Run frontend development server (from the client directory)
npm start
```

- Backend will run on: `http://localhost:5000`
- Frontend will run on: `http://localhost:3000`

### Production Build

```bash
# Build frontend (from the client directory)
npm run build

# Run production server (from the api directory)
npm run start
```

## Project Structure

```
Learnify/
├── client/                   # React frontend
│   ├── public/               # Static files
│   ├── src/                  # Source files
│   │   ├── assets/           # Images, fonts, etc.
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React context
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Page components
│   │   ├── redux/            # Redux setup and slices
│   │   ├── services/         # API services
│   │   ├── utils/            # Utility functions
│   │   ├── App.js            # Main App component
│   │   └── index.js          # Entry point
│   └── package.json          # Frontend dependencies
│
├── api/                   # Node.js backend
│   ├── config/               # Configuration files
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   ├── validation/           # Input validation
│   ├── app.js                # Server entry point
│   └── package.json          # Backend dependencies
│
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker configuration
├── package.json              # Root package.json
└── README.md                 # Project documentation
```

## API Endpoints

The API is prefixed with `/api`

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user info

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Other Resources
- `GET /api/resources` - Get all resources
- `POST /api/resources` - Create a resource
- `GET /api/resources/:id` - Get resource by ID
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource

## Customization

### Styling

The project uses a combination of Styled Components and TailwindCSS. To customize the theme:

- Edit `client/src/assets/styles/theme.js` for Styled Components
- Modify `client/tailwind.config.js` for TailwindCSS customization

### Adding New Features

#### Frontend
1. Create new components in `client/src/components`
2. Add new pages in `client/src/pages`
3. Update routing in `client/src/App.js`
4. Add Redux slices in `client/src/redux/slices`

#### Backend
1. Create new models in `api/models`
2. Add controllers in `api/controllers`
3. Define routes in `api/routes`
4. Update the main `app.js` file if necessary

## Testing

### Frontend Tests

```bash
cd client
npm test
```

### Backend Tests

```bash
cd api
npm test
```

## Deployment

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Manual Deployment

#### Backend
1. Set up a MongoDB database (Atlas or self-hosted)
2. Update environment variables for production
3. Deploy the Node.js application to your preferred hosting service (Heroku, DigitalOcean, AWS, etc.)

#### Frontend
1. Build the React application: `npm run build`
2. Deploy the built files to a static hosting service (Netlify, Vercel, etc.)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)
- [Redux](https://redux.js.org/)
- [TailwindCSS](https://tailwindcss.com/)

## Contact

Theophilus Kolawole - [theophiluskolawole19@gmail.com](mailto:theophiluskolawole19@gmail.com)

Project Link: [https://github.com/theokolawole/Learnify](https://github.com/theokolawole/Learnify)
