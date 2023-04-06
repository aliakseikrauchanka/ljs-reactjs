import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useSearchParams } from "react-router-dom";
import { Dish } from "../../components/Dish/Dish";
import { selectDishesBySearch, selectIsDishLoading } from "../../store/entities/dish/selectors";
import { loadDishes } from "../../store/entities/dish/thunks/loadDishes";

export const DishesPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(loadDishes());
  }, []);

  const dishes = useSelector((state) => selectDishesBySearch(state, { search: searchParams.get("search") }));
  const isLoading = useSelector((state) => selectIsDishLoading(state));

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <input
        value={searchParams.get("search")}
        onChange={(event) =>
          setSearchParams({
            search: event.target.value,
          })
        }
      />
      {dishes.map((dish) => (
        <Dish dishId={dish.id} key={dish.id} />
      ))}
      <Outlet />
    </div>
  );
};
