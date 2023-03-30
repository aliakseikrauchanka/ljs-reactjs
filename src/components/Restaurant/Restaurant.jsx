import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { selectRestaurantById } from "../../store/entities/restaurant/selectors";

import styles from "./styles.module.css";

const tabs = ["menu", "reviews"];

export const Restaurant = () => {
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) =>
    selectRestaurantById(state, { restaurantId })
  );

  if (!restaurant) {
    return null;
  }

  const { name } = restaurant;

  return (
    <div>
      <h2>{name}</h2>
      <div>
        {tabs.map((tab) => (
          <NavLink
            key={tab}
            to={tab}
            className={({ isActive }) =>
              classNames(styles.tab, { [styles.active]: isActive })
            }
          >
            {tab}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
};
