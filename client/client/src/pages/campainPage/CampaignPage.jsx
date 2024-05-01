import React from "react";
import "./CampaignPage.scss";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import { useParams } from "react-router-dom";

export const CampaignPage = () => {
  const { id } = useParams();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["campaignPage"],
    queryFn: () =>
      newRequest.get(`/campaign/single/${id}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
  });

  console.log(data);

  return (
    <div className="campaign">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
            
              <h3>{data.name}</h3>
              <p>{data.desc}</p>
              <img src={data.cover} alt="campaignImage"/>
          
        </div>
      )}
    </div>
  );
};
