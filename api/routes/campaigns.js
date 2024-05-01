import express from "express";
import campaignsController from "../controllers/campaignsController";

const router = express.Router();
router.get("/", campaignsController.getAllCampaigns);
router.get("/:id", campaignsController.getCampaign);
router.post("/", campaignsController.createCampaign);
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
  
    try {
      const updatedCampaign = await campaignsController.updateCampaign(id, newData);
      res.status(200).json(updatedCampaign);
    } catch (error) {
      console.error("Error updating campaign:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

export default router;
