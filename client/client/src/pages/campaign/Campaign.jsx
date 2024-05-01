import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest.js";
import axios from "axios";
import Modal from "react-modal";
// import CampaignCard from "../../components/campaignCard/CampaignCard.jsx";

const Campaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPlatform, setEditedPlatform] = useState("");
  const [editedLandingPage, setEditedLandingPage] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setEditedName(campaign.name);
    setEditedPlatform(campaign.platform);
    setEditedLandingPage(campaign.landingPage);
    setEditedImageUrl(campaign.imageUrl);
    setIsEditModalOpen(true);
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedCampaign = {
        name: editedName,
        platform: editedPlatform,
        landingPage: editedLandingPage,
        imageUrl: editedImageUrl,
      };

      const response = await axios.put(
        `/campaigns/${selectedCampaign.id}`,
        updatedCampaign
      );
      console.log("Campaign updated:", response.data);

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating campaign:", error);
    }
  };
  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["campaign"],
    queryFn: () => {
      const apiUrl = `/campaign${search}`;
      console.log(`api URL: ${apiUrl}`);
      return newRequest.get(apiUrl).then((res) => res.data);
    },
  });

  useEffect(() => {
    refetch();
  });


  return (
    <div className="campaigns">
      <div className="container">
        <span className="breadcrumbs">Campaign &gt;</span>
        <h1>Campaigns</h1>
        <div className="menu"></div>
        <div className="campaign-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Platform</th>
                <th>Landing Page</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4">Something went wrong</td>
                </tr>
              ) : (
                data.map((campaign) => (
                  <tr key={campaign._id}>
                    <td>{campaign.name}</td>
                    <td>{campaign.platform}</td>
                    <td>
                      <a href={campaign.landingPage}>{campaign.landingPage}</a>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(campaign._id)}>
                        Edit
                      </button>
                      <Link to={`/campaign/${campaign._id}`} className="link">
                        <button>
                          Preview
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Edit Modal */}
        <Modal isOpen={isEditModalOpen} onRequestClose={handleCancelEdit}>
          <h2>Edit Campaign</h2>
          <form onSubmit={handleSaveEdit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div>
              <label>Platform:</label>
              <input
                type="text"
                value={editedPlatform}
                onChange={(e) => setEditedPlatform(e.target.value)}
              />
            </div>
            <div>
              <label>Landing Page:</label>
              <input
                type="text"
                value={editedLandingPage}
                onChange={(e) => setEditedLandingPage(e.target.value)}
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                value={editedImageUrl}
                onChange={(e) => setEditedImageUrl(e.target.value)}
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Campaigns;
