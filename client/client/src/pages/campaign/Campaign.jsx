import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import { CampaignCard } from "../../components/campaignCard/CampaignCard.jsx";

export const Campaigns = () => {
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
  }, [search]);

  const handleEdit = (id) => {
    console.log(`Editing campaign with ID: ${id}`);
    // Implement edit functionality
  };

  const handlePreview = (imageUrl) => {
    console.log(`Previewing campaign image: ${imageUrl}`);
    // Implement preview functionality
  };

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
                  <tr key={campaign.id}>
                    <td>{campaign.name}</td>
                    <td>{campaign.platform}</td>
                    <td>
                      <a
                        href={campaign.landingPage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {campaign.landingPage}
                      </a>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(campaign.id)}>
                        Edit
                      </button>
                      <button onClick={() => handlePreview(campaign.imageUrl)}>
                        Preview
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
