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
  const campaigns = await CampaignModel.getAllCampaigns().length();
  console.log(campaigns);
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

export const updateCampaign = async (id, newData) => {
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(id, newData, { new: true });
    return updatedCampaign;
  } catch (error) {
    console.error("Error updating campaign:", error);
    throw new Error("Could not update campaign");
  }
};