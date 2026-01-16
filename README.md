# Ajinkya Mehetre - Portfolio Website

A modern, full-stack portfolio website built with React, Vite, and Express.js.

## 📁 Project Structure

```
ajinkya-portfolio/
├── frontend/                 # React + Vite Frontend
│   ├── src/
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable UI components
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── data/            # Static data files
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   └── pages/           # Page components
│   ├── public/              # Static assets
│   │   └── images/          # Public images
│   ├── index.html           # Entry HTML
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.ts   # Tailwind CSS config
│   └── tsconfig.json        # TypeScript config
│
├── backend/                  # Express.js Backend
│   ├── controllers/         # Route handlers
│   ├── routes/              # API routes
│   ├── server.js            # Entry point
│   ├── package.json         # Backend dependencies
│   ├── .env                 # Environment variables (not in git)
│   └── .env.example         # Environment template
│
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ajinkya-m-01/ajinkya-portfolio.git
   cd ajinkya-portfolio
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Configure Environment Variables**
   ```bash
   # In backend folder
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Development

**Run Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

**Run Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

### Production Build

**Build Frontend:**
```bash
cd frontend
npm run build
```
Output: `frontend/dist/`

## 🌐 Deployment

### Frontend Deployment (Render/Vercel/Netlify)

1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Root Directory:** `frontend`

#### Render Static Site Settings:
- **Build Command:** `cd frontend && npm install && npm run build`
- **Publish Directory:** `frontend/dist`

#### Vercel Settings:
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Backend Deployment (Render)

1. **Build Command:** `npm install`
2. **Start Command:** `npm start`
3. **Root Directory:** `backend`

#### Render Web Service Settings:
- **Build Command:** `cd backend && npm install`
- **Start Command:** `cd backend && npm start`
- **Environment Variables:** Set all variables from `.env.example`

## 🛠 Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build Tool
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **shadcn/ui** - UI Components

### Backend
- **Express.js** - Web Framework
- **Node.js** - Runtime
- **Nodemailer** - Email Service
- **CORS** - Cross-Origin Support

## 📧 Contact API

The backend provides a contact form API:

```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

## 🔒 Environment Variables

### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `SMTP_HOST` | Email SMTP host | - |
| `SMTP_PORT` | Email SMTP port | `587` |
| `SMTP_USER` | Email username | - |
| `SMTP_PASS` | Email password | - |
| `CONTACT_EMAIL` | Recipient email | - |
| `FRONTEND_URL` | Frontend URL for CORS | - |

## 📝 Scripts

### Frontend
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend
| Script | Description |
|--------|-------------|
| `npm run dev` | Start with nodemon |
| `npm start` | Start production server |

## 📄 License

MIT License - Ajinkya Mehetre

## 🤝 Contact

- **Website:** [ajinkya.dev](https://ajinkya.dev)
- **LinkedIn:** [ajinkya-mhetre01](https://linkedin.com/in/ajinkya-mhetre01)
- **GitHub:** [ajinkya-m-01](https://github.com/ajinkya-m-01)
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project using any of the following platforms:

- **Vercel**: Connect your GitHub repository and deploy with zero configuration
- **Netlify**: Drag and drop your build folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployments

For the backend, consider using:
- **Railway**
- **Render**
- **Heroku**
