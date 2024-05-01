import React from "react";

import "./CampaignCard.css";
import { useQuery } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";

const CampaignCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["campaignCard"],
    queryFn: () =>
      newRequest.get(`/single/${item._Id}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
  });
  console.log(item);

  return (
    <>
      <div className="campaignCard">
        <img src={item.cover} alt="" />
        <div className="info">
          <h3>{item.name}</h3>
          <p>{item.desc}</p>
        </div>
      </div>
    </>
  );
};

export default CampaignCard;
