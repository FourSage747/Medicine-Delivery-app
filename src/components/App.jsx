import { Route, Routes } from "react-router";
import { Layout } from "./Layout";
import { Shop } from "./Shop";
import { ShoppingCart } from "./ShoppingCart";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Shop />} />
          <Route path="ShoppingCart" element={<ShoppingCart />} />
        </Route>
      </Routes>
    </div>
  );
};
