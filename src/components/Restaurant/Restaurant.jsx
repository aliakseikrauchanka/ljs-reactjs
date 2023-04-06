import React from "react";
import { useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import { selectRestaurantById } from "../../store/entities/restaurant/selectors";
import { Tabs } from "../Tabs/Tabs";

export const Restaurant = () => {
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => selectRestaurantById(state, { restaurantId }));

  if (!restaurant) {
    return null;
  }

  const { name } = restaurant;

  const tabs = [
    { id: "menu", title: "Menu" },
    { id: "reviews", title: "Reviews" },
  ];

  return (
    <div>
      <h2>{name}</h2>
      <Tabs tabs={tabs} />
      <Outlet />
    </div>
  );
};
