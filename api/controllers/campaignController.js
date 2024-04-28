import campaignModel from "../models/campaign.model";

exports.getAllCampaigns = (req, res) => {
    res.json(campaigns);
  };
  
  exports.createCampaign = (req, res) => {
    const { name, platform, landingPage, imageUrl } = req.body;
    const id = campaigns.length + 1;
    const newCampaign = new Campaign(id, name, platform, landingPage, imageUrl);
    campaigns.push(newCampaign);
    res.status(201).json(newCampaign);
  };
  