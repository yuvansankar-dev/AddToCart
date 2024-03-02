import { createContext, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./Component/Card/Card";
import { productInfo } from "./Dataset";

export const Context = createContext();
function App() {
  const [productsData, setProductsData] = useState(productInfo.products);
  const totalCost = useMemo(
    () => productInfo.products.reduce((acc, val) => acc + val.price, 0),
    []
  );
  const [cartInfo, setCartInfo] = useState({
    totalQuantity: productInfo.products.length,
    totalCost,
  });
  return (
    <div className='mainContainer'>
      <div className='header'>
        <div>totalQuantity : {cartInfo.totalQuantity}</div>
        <div>totalCost : {cartInfo.totalCost}</div>
        <div>{">"}</div>
      </div>
      <Context.Provider value={{ setCartInfo, cartInfo, setProductsData }}>
        <div className='container'>
          {productsData.map((product) => (
            <Card key={product.id} productInfo={product} />
          ))}
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;
