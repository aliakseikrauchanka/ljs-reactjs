import { Button } from "../Button/Button";
import classnames from "classnames";

import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectDishById } from "../../store/entities/dish/selectors";
import { selectDishCount } from "../../store/cart/selectors";
import { cartSlice } from "../../store/cart";
import { memo } from "react";

export const Dish = ({ dishId, route, className }) => {
  const dish = useSelector((state) => selectDishById(state, { dishId }));
  const count = useSelector((state) => selectDishCount(state, { dishId }));
  const dispatch = useDispatch();

  if (!dish) {
    return null;
  }

  const decrement = () => dispatch(cartSlice.actions.decrementDish(dishId));
  const increment = () => dispatch(cartSlice.actions.incrementDish(dishId));

  const { name, ingredients } = dish;

  return (
    <div
      className={classnames(styles.root, className, {
        [styles.rootBig]: count > 4,
      })}
    >
      <div>
        {route ? (
          <Link to={route} className={classnames(styles.name, styles.link)}>
            {name}
          </Link>
        ) : (
          <span className={styles.name}>{name}</span>
        )}
        <div>{ingredients?.join(", ")}</div>
      </div>
      <div className={styles.actions}>
        <Button onClick={decrement}>-</Button>
        <span className={styles.count}>{count}</span>
        <Button onClick={increment}>+</Button>
      </div>
    </div>
  );
};

export const DishWithMemo = memo(Dish);
