"use client";

import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PlanCardProps {
  label: string;
  priceLabel: string;
  planId: number;
  features: any;
  userId: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  label,
  priceLabel,
  planId,
  features,
  userId,
}) => {
  const router = useRouter();

  const transformToBody = (itemNumber: number) => {
    const body = JSON.stringify({
      items: [{ id: itemNumber, quantity: 1 }],
      userId: userId,
    });

    return body;
  };

  const handleClick = async (itemNumber: number) => {
    axios
      .post(`/api/stripe`, transformToBody(itemNumber))
      .then((response) => {
        const url = response.data.message;
        router.push(url);
        toast.success("En route !");
      })
      .catch((e) => {
        toast.error(e.error);
      });
  };

  return (
    <div className="plan" onClick={() => {
      handleClick(planId);
    }}>
      <h2 className="plan-title">{label}</h2>
      <div className="plan-price">{priceLabel}
        <span style={{ fontWeight: "lighter", fontSize: "10px" }}> /mois</span></div>
      <ul className="plan-features">
        {features.map((feature: string, index: any) => {
          return <li key={index + "feature" + planId}>{feature}</li>;
        })}
      </ul>
      <br />
      <button
        onClick={() => {
          handleClick(planId);
        }}
        className="btn plan-btn"
      >
        S&apos;abonner{" "}
      </button>
    </div>
  );
};

export default PlanCard;
