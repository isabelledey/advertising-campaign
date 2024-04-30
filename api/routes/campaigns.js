import express from 'express';
import campaignsController from '../controllers/campaignsController';

const router = express.Router();
router.get('/', campaignsController.getAllCampaigns);
router.get('/:id', campaignsController.getCampaign);
router.post('/', campaignsController.createCampaign);

// Add more routes for update, delete, etc.

export default router;