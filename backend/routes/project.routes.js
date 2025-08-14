import { Router } from 'express'
import { body } from 'express-validator'
import * as projectController from '../controllers/project.controller.js';
import * as authMiddleware from '../middleware/auth.middlewares.js'; 

const router = Router();

router.post('/create', 
    authMiddleware.authUser,
    body('name').isString().notEmpty().withMessage('Project name is required'),
    projectController.createProject
);

router.get('/all', 
    authMiddleware.authUser,
    projectController.getAllProject
);

router.put('/add-user',
    authMiddleware.authUser,
    body('users').isArray({ min: 1 }).withMessage('At least one user is required').bail()
        .custom(users => users.every(user => typeof user === 'string')).withMessage('All users must be strings'),
    body('projectId').isString().notEmpty().withMessage('Project ID is required'),
    projectController.addUserToProject
);

router.get('/get-project/:projectId',
    authMiddleware.authUser,
    projectController.getProjectById
);

router.put('/update-file-tree',
    authMiddleware.authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('fileTree').isObject().withMessage('File tree is required'),
    projectController.updateFileTree
);

export default router;
