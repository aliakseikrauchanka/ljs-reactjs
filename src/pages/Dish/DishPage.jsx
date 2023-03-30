import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dish } from '../../components/Dish/Dish';
import { RestaurantList } from '../../components/RestaurantList/RestaurantList';
import { loadDishById } from '../../store/entities/dish/thunks/loadDishById';

import styles from './styles.module.css';

export const DishPage = () => {
  const { dishId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDishById(dishId));
  }, [dishId]);

  return (
    <div className={styles.root}>
      <Dish dishId={dishId} className={styles.dish} />
      <RestaurantList dishId={dishId} />
    </div>
  );
};
