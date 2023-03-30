import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectRestaurantById } from "../../store/entities/restaurant/selectors";

import styles from "./styles.module.css";

export const RestaurantLink = ({ restaurantId, className }) => {
  const restaurant = useSelector((state) =>
    selectRestaurantById(state, { restaurantId })
  );

  if (!restaurant) {
    return null;
  }

  return (
    <Link
      to={`/restaurants/${restaurantId}`}
      className={classNames(styles.root, className)}
    >
      {restaurant.name}
    </Link>
  );
};
