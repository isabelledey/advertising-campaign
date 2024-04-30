import campaignModel from "../models/campaign.model";

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await CampaignModel.findAll();
    res.status(200).send(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
  }
};

export const getCampaign = async (req, res, next) => {
  try {
    const campaign = await campaignModel.findById(req.params.id);
    console.log(campaign);
    if (!campaign) {
      return next(createError(404, "campaign not found!"));
    }

    res.status(200).json(campaign);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const createCampaign = async (req, res) => {
  const { name, platform, landingPage, imageUrl } = req.body;
  const id = campaigns.length + 1;
  const newCampaign = new campaignModel(
    id,
    name,
    platform,
    landingPage,
    imageUrl
  );
  await newCampaign.save();
  res.status(201).json(newCampaign);
};
