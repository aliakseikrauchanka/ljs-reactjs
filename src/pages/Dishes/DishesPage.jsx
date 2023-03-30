import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dish } from "../../components/Dish/Dish";
import { selectDishIds } from "../../store/entities/dish/selectors";
import { loadDishes } from "../../store/entities/dish/thunks/loadDishes";

import styles from "./styles.module.css";

export const DishesPage = () => {
  const dishIds = useSelector((state) => selectDishIds(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDishes());
  }, []);

  return (
    <div className={styles.root}>
      <h2>Dishes</h2>
      {dishIds.map((dishId) => (
        <Dish
          key={dishId}
          dishId={dishId}
          route={`/dish/${dishId}`}
          className={styles.dish}
        />
      ))}
    </div>
  );
};
