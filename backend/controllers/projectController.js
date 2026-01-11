// Mock data - Replace with MongoDB queries in production
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    projectUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/username/ecommerce"
  },
  {
    id: 2,
    title: "AI-Powered Analytics Dashboard",
    description: "Real-time analytics dashboard with machine learning insights. Provides predictive analytics and data visualization for business intelligence.",
    technologies: ["React", "Python", "TensorFlow", "D3.js", "PostgreSQL"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    projectUrl: "https://example.com/analytics",
    githubUrl: "https://github.com/username/analytics"
  },
  {
    id: 3,
    title: "Social Media App",
    description: "A modern social networking platform with real-time messaging, post sharing, and user profiles. Built with responsive design and optimized performance.",
    technologies: ["Next.js", "TypeScript", "Socket.io", "Redis", "AWS"],
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    projectUrl: "https://example.com/social",
    githubUrl: "https://github.com/username/social"
  },
  {
    id: 4,
    title: "Task Management System",
    description: "Collaborative project management tool with drag-and-drop functionality, team collaboration, and progress tracking features.",
    technologies: ["Vue.js", "Node.js", "MySQL", "WebSockets"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    projectUrl: "https://example.com/taskmanager",
    githubUrl: "https://github.com/username/taskmanager"
  },
  {
    id: 5,
    title: "Video Streaming Platform",
    description: "Netflix-like streaming service with video uploads, transcoding, adaptive streaming, and user subscriptions.",
    technologies: ["React", "Node.js", "FFmpeg", "AWS S3", "CloudFront"],
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
    projectUrl: "https://example.com/streaming",
    githubUrl: "https://github.com/username/streaming"
  },
  {
    id: 6,
    title: "Fitness Tracking App",
    description: "Mobile-first fitness application with workout tracking, nutrition planning, and progress analytics. Includes wearable device integration.",
    technologies: ["React Native", "Firebase", "GraphQL", "Node.js"],
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
    projectUrl: "https://example.com/fitness",
    githubUrl: "https://github.com/username/fitness"
  }
];

// Controller functions
const projectController = {
  // Get all projects
  getAllProjects: (req, res) => {
    try {
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ 
        status: 'error', 
        message: 'Failed to fetch projects',
        error: error.message 
      });
    }
  },

  // Get single project by ID
  getProjectById: (req, res) => {
    try {
      const { id } = req.params;
      const project = projects.find(p => p.id === parseInt(id));
      
      if (!project) {
        return res.status(404).json({ 
          status: 'error', 
          message: 'Project not found' 
        });
      }
      
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ 
        status: 'error', 
        message: 'Failed to fetch project',
        error: error.message 
      });
    }
  }
};

module.exports = projectController;

/* 
  FUTURE DATABASE INTEGRATION (MongoDB):
  
  const Project = require('../models/Project');
  
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
*/
