import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dish } from "./components/Dish/Dish";
import { Header } from "./components/Header/Header";
import { Menu } from "./components/Menu/Menu";
import { Restaurant } from "./components/Restaurant/Restaurant";
import { Reviews } from "./components/Reviews/Reviews";
import { CartPage } from "./pages/CartPage/CartPage";
import { DishesPage } from "./pages/DishesPage/DishesPage";
import { DishPage } from "./pages/DishPage/DishPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

import { RestaurantPage } from "./pages/RestaurantPage/RestaurantPage";

export const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="restaurants" element={<RestaurantPage />}>
            <Route index element={<span>Select restaurant</span>} />
            <Route path=":restaurantId" element={<Restaurant />}>
              <Route index element={<Navigate to="menu" replace />} />
              <Route path="menu" element={<Menu />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
          <Route path="dishes" element={<DishesPage />}></Route>
          <Route path="dishes/:dishId" element={<DishPage />} replace />
          <Route path="cart" element={<CartPage />} />
          <Route path="redirect" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
