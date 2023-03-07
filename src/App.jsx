import React from "react";
import { restaurants } from "./constants/fixtures";
import { StoreProvider } from "./CustomRedux";
import { RestaurantPage } from "./pages/RestaurantPage/RestaurantPage";
import { store } from "./store";

export const App = () => {
  return (
    <StoreProvider store={store}>
      <div>
        <RestaurantPage restaurants={restaurants} />
      </div>
    </StoreProvider>
  );
};
