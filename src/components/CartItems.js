import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import IncreaseItem from "./IncreaseItem";
import DecreaseItem from "./DecreaseItem";
import { productActions } from "../store/navigation";

function CartItems(props) {
  const dispatch = useDispatch();

  const cartItemsCountMap = useSelector(
    (state) => state.counter.cartItemsCountMap
  );
  // importing productListMap from store
  const productListMap = useSelector((state) => state.counter.productListMap);
  const cartList = useSelector((state) => state.counter.cartList);
  localStorage.setItem("cartList", JSON.stringify(cartList));

  localStorage.setItem(
    "cartItemsCountMap",
    JSON.stringify(Object.fromEntries(cartItemsCountMap))
  );

  console.log("cartList", cartList);
  let ele ;
  let total = 0;
  // loading the products through get api
  useLayoutEffect(() => {
    fetch("http://localhost:3000/products")
      .then(async (response) => {
        response = await response.json();
        console.log("response", response);
        await dispatch(productActions.updateProductList(response));
        await createEle();
      })
      .then((json) => console.log(json));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let countStyle = {
    padding: "0px 5px"
  }

  // function to create the cart list cards through cardList and productMap
  createEle();
  async function createEle() {
    ele = cartList.map((id) => {
      let item = productListMap.get(id);
      total += cartItemsCountMap.get(item.id.toString()) * item.price;
      return (
        <div
          key={"cartProduct" + item.id}
          className="card mb-3"
          style={{ maxWidth: "1000px" }}
        >
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={item.thumbnail}
                className="card-img"
                alt={"image" + item.title}
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                {console.log("item.id", item.id)}
                <IncreaseItem uniqueId={item.id} />
                <span style={countStyle}>{cartItemsCountMap.get(item.id.toString())}</span>
                <DecreaseItem uniqueId={item.id} />
                <h5>
                  price {cartItemsCountMap.get(item.id.toString()) * item.price}{" "}$
                </h5>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
 
  let headerDivStyle = {
    paddingTop: "84px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

// cartlist JSX code
  return (
    <div style={headerDivStyle}>
    <h3>Total Price: {total}$</h3>
      <h3>Cart Items </h3>
      {ele}
    </div>
  );
}

export default CartItems;
