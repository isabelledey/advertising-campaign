import express from 'express';
import campaignsController from '../controllers/campaignsController';

const router = express.Router();
router.get('/', campaignsController.getAllCampaigns);
router.post('/', campaignsController.createCampaign);

// Add more routes for update, delete, etc.

export default router;