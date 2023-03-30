import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurantIdsFilteredByDishId } from "../../store/entities/restaurant/selectors";
import { loadRestaurantIfNotExist } from "../../store/entities/restaurant/thunks/loadRestaurantsIfNotExist";

import { RestaurantLink } from "../RestaurantLink/RestaurantLink";

import styles from "./styles.module.css";

export const RestaurantList = ({ dishId }) => {
  const dispatch = useDispatch();
  const restaurantIds = useSelector((state) =>
    selectRestaurantIdsFilteredByDishId(state, { dishId })
  );

  useEffect(() => {
    dispatch(loadRestaurantIfNotExist());
  }, []);

  return (
    <div>
      <h3>Доступно в:</h3>
      {restaurantIds.map((restaurantId) => (
        <RestaurantLink
          key={restaurantId}
          restaurantId={restaurantId}
          className={styles.restaurant}
        />
      ))}
    </div>
  );
};
