import React, {
  useEffect,
  memo,
  useLayoutEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
  useContext,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectIsDishLoading } from "../../store/entities/dish/selectors";
import { loadDishesByRestaurantId } from "../../store/entities/dish/thunks/loadDishesByRestaurantId";
import { selectRestaurantMenuById } from "../../store/entities/restaurant/selectors";
import { Button } from "../Button/Button";
import { Dish } from "../Dish/Dish";

import styles from "./styles.module.css";

export const Menu = () => {
  const ref = useRef();
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const menu = useSelector((state) =>
    selectRestaurantMenuById(state, { restaurantId })
  );
  const isLoading = useSelector(selectIsDishLoading);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadDishesByRestaurantId(restaurantId));
  }, [restaurantId]);

  const onRender = useCallback((element) => {}, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div ref={onRender}>
      <h3>Menu</h3>
      <Button onClick={() => clearInterval(ref.current)}>Cancel</Button>
      <div className={styles.dishes}>
        {menu.map((dishId) => (
          <Dish key={dishId} dishId={dishId} className={styles.dish} />
        ))}
      </div>
      <Button onClick={() => navigate("/cart")}>Перейти к заказу</Button>
    </div>
  );
};

// const Toggle = ({ children }) => {
//   const [isOn, setIsOn] = useState(false);

//   const value = useMemo(() => ({ isOn, setIsOn }), [isOn]);

//   return (
//     <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
//   );
// };

// const TogglePart = () => {
//   const { isOn, setIsOn } = useContext(ToggleContext);

//   if (!isOn) {
//     return null;
//   }

//   return <button onClick={() => setIsOn(false)}>On</button>;
// };

// <Toggle>
//   <TogglePart />
// </Toggle>;
