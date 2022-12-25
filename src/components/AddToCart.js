import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/navigation";
import "./toastr.css";
import toastr from "toastr";

function AddToCart(props) {
  const dispatch = useDispatch();
  // importing the cartItemsCountMap from redux store
  const cartItemsCountMap = useSelector(
    (state) => state.counter.cartItemsCountMap
  );
  
  // setting up the cartItemsCountMap in local storage to maintain data even after page referesh
  localStorage.setItem(
    "cartItemsCountMap",
    JSON.stringify(Object.fromEntries(cartItemsCountMap))
  );

  let uniqueId = props.uniqueId;

  // function to add item to cart
  let addToCart = (uniqueId) => {
    dispatch(productActions.addToCart(uniqueId));
    toastr.options.timeOut = 1500;
    toastr.success("Product added to Cart");
  };

  // html code for increasing item in cart
  return (
    <div>
      <button
        onClick={() => {
          addToCart(uniqueId);
        }}
        type="button"
        className="btn btn-primary btn-sm"
      >
        <i className="fa-solid fa-cart-plus"></i> Add to Cart
      </button>
    </div>
  );
}

export default AddToCart;
