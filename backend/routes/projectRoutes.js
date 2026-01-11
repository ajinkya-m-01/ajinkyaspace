const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET all projects
router.get('/', projectController.getAllProjects);

// GET single project by ID
router.get('/:id', projectController.getProjectById);

module.exports = router;
