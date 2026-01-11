# Portfolio Backend API

Backend server for the portfolio website built with Node.js and Express.

## Features

- RESTful API for projects
- CORS enabled for frontend integration
- Clean MVC architecture
- MongoDB-ready structure
- Environment-based configuration

## Installation

```bash
npm install
```

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Get All Projects
```
GET /api/projects
```

### Get Single Project
```
GET /api/projects/:id
```

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
NODE_ENV=development
```

## Future Enhancements

- MongoDB integration
- Authentication & authorization
- Image upload functionality
- Admin panel for project management
- Rate limiting
- Caching with Redis

## Project Structure

```
backend/
├── controllers/       # Request handlers
├── routes/           # API routes
├── models/           # Database models (future)
├── middleware/       # Custom middleware (future)
├── config/           # Configuration files (future)
├── .env              # Environment variables
├── server.js         # Entry point
└── package.json      # Dependencies
```

## Tech Stack

- Node.js
- Express.js
- CORS
- dotenv
- (MongoDB - future integration)
