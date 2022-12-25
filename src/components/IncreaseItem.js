import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/navigation";

// in the cart details page if the user wants to increase the item count that is already added to cart
function IncreaseItem(props) {
    const dispatch = useDispatch();
    // importing cartItemsCountMap from store and maintining in the local storage
    const cartItemsCountMap = useSelector((state) => state.counter.cartItemsCountMap);
    localStorage.setItem("cartItemsCountMap",JSON.stringify(Object.fromEntries(cartItemsCountMap)));


    let uniqueId = props.uniqueId;
    console.log('uniqueId',uniqueId)
    // triggering dipatch function to increase the cart item
    let addToCart = (uniqueId)=>{
        dispatch(productActions.addToCart(uniqueId));
    }
    // jsx code for increase button
    return (
        <button onClick={()=>{addToCart(uniqueId)}} type="button" className="btn btn-secondary">
            <i className="fa-solid fa-plus"></i>
        </button>
        
    );
}

export default IncreaseItem;