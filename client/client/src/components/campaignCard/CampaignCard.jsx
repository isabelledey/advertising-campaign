import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";

import "./CampaignCard.css";

export const CampaignCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["campaignCard"],
    queryFn: () =>
      newRequest.get(`/campaign/${item.id}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
  });

  console.log(item);

  return (
    <>
      <Link to={`/campaign/${item._id}`} className="link">
        <div className="campaignCard">
          <img src={item.cover} alt="" />
          <div className="info">
            <h3>{item.name}</h3>
            <p>{item.desc}</p>
          </div>
        </div>
        <hr />
      </Link>
    </>
  );
};
