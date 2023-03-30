import React from "react";
import { useSelector } from "react-redux";
import { selectCartIds } from "../../store/cart/selectors";
import { Dish } from "../Dish/Dish";

import styles from "./styles.module.css";

export const Cart = () => {
  const cart = useSelector(selectCartIds);

  return (
    <div className={styles.root}>
      {cart.map((dishId) => (
        <Dish className={styles.dish} dishId={dishId} />
      ))}
    </div>
  );
};
