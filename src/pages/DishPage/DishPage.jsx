import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Dish } from "../../components/Dish/Dish";
import { selectIsDishLoading } from "../../store/entities/dish/selectors";
import { loadDishIfNotExist } from "../../store/entities/dish/thunks/loadDishIfNotExist";
import {
  selectIsRestaurantLoading,
  selectRestaurantLoadingStatus,
  selectRestaurantWithDish,
} from "../../store/entities/restaurant/selectors";
import { loadRestaurantIfNotExist } from "../../store/entities/restaurant/thunks/loadRestaurantsIfNotExist";

export const DishPage = () => {
  const { dishId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDishIfNotExist({ dishId }));
  }, []);

  useEffect(() => {
    dispatch(loadRestaurantIfNotExist());
  }, []);

  const isLoading = useSelector(selectIsDishLoading);
  const isRestaurantsLoading = useSelector(selectIsRestaurantLoading);
  const restaurants = useSelector((state) => selectRestaurantWithDish(state, { dishId }));

  if (isLoading) {
    return <span>Loading ...</span>;
  }

  return (
    <div>
      <h2>DISH</h2>
      <Dish dishId={dishId} />
      {isRestaurantsLoading ? (
        <div>is restaurant loading</div>
      ) : (
        <div>
          <h4>RESTAURANTS:</h4>
          <ul>
            {restaurants.map((restaurant) => (
              <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
