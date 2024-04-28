import mongoose from "mongoose";
const { Schema } = mongoose;

const CampaignSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  platform: {
    type: String,
    required: true,
    unique: true,
  },
  landingPage: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Campaign", CampaignSchema);
