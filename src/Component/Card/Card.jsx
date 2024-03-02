import viteLogo from "/vite.svg";
import "./Card.css";
import { useCallback, useContext, useEffect } from "react";
import { Context } from "../../App";

const Card = ({ productInfo }) => {
  const { cartInfo, setCartInfo, setProductsData } = useContext(Context);
  useEffect(() => {
    setCartInfo((pre) => {
      return {
        ...pre,
        [productInfo.id]: { quantity: 1, totalCost: productInfo.price },
      };
    });
  }, []);

  const addProduct = useCallback(() => {
    setCartInfo((pre) => {
      var newPre = JSON.parse(JSON.stringify(pre));
      newPre[productInfo.id].quantity += 1;
      newPre[productInfo.id].totalCost += productInfo.price;
      newPre.totalQuantity += 1;
      newPre.totalCost += productInfo.price;
      return newPre;
    });
  }, [productInfo.id, productInfo.price, setCartInfo]);

  const reduceProduct = useCallback(() => {
    setCartInfo((pre) => {
      var newPre = JSON.parse(JSON.stringify(pre));
      newPre[productInfo.id].quantity -= 1;
      newPre[productInfo.id].totalCost -= productInfo.price;
      newPre.totalQuantity -= 1;
      newPre.totalCost -= productInfo.price;
      return newPre;
    });
  }, [productInfo.id, productInfo.price, setCartInfo]);

  const removeProduct = useCallback(() => {
    setCartInfo((pre) => {
      var newPre = JSON.parse(JSON.stringify(pre));
      newPre.totalQuantity -= newPre[productInfo.id].quantity;
      newPre.totalCost -= newPre[productInfo.id].totalCost;
      return newPre;
    });
    setProductsData((pre) =>
      pre.filter((product) => product.id != productInfo.id)
    );
  }, []);

  return (
    <div>
      <div className='card'>
        <div id={"carousel" + productInfo.id} className='carousel slide'>
          <div className='carousel-inner'>
            {productInfo.images?.map((image, idx) => (
              <div
                className={
                  idx === 0 ? "carousel-item active" : "carousel-item "
                }
                key={idx + "" + productInfo.id}
              >
                <img src={image} className='d-block w-100' alt='Logo' />
              </div>
            ))}
          </div>
          {productInfo.images?.length > 1 && (
            <>
              <button
                className='carousel-control-prev'
                type='button'
                data-bs-target={"#" + "carousel" + productInfo.id}
                data-bs-slide='prev'
              >
                <span
                  className='carousel-control-prev-icon'
                  aria-hidden='true'
                ></span>
                <span className='visually-hidden'>Previous</span>
              </button>
              <button
                className='carousel-control-next'
                type='button'
                data-bs-target={"#" + "carousel" + productInfo.id}
                data-bs-slide='next'
              >
                <span
                  className='carousel-control-next-icon'
                  aria-hidden='true'
                ></span>
                <span className='visually-hidden'>Next</span>
              </button>
            </>
          )}
        </div>
        <hr />
        <div className='productInfo'>
          <div className='descriptionPart'>
            <div className='productName center'>{productInfo.title}</div>
            <div className='ProductCost center'>{productInfo.price}</div>
          </div>
          <div>
            <b>Brand : </b>
            {productInfo.brand}
          </div>
          <div>
            <div>
              <b>Description : </b>
            </div>
            <div className='description' title={productInfo.description}>
              {productInfo.description}{" "}
            </div>
          </div>
          <div>
            <div className='productManipulate'>
              <div className='productEdit'>
                <button className='removeButton center' onClick={removeProduct}>
                  Remove
                </button>
                <button
                  className='subButton center'
                  onClick={() =>
                    cartInfo[productInfo.id]?.quantity > 1 && reduceProduct()
                  }
                >
                  -
                </button>
                <div className='quantity center'>
                  {cartInfo[productInfo.id]?.quantity}
                </div>

                <button className='addButton center' onClick={addProduct}>
                  +
                </button>
              </div>
              <div className='totalCost center'>
                {cartInfo[productInfo.id]?.totalCost}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
