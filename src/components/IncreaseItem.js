import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/navigation";


function IncreaseItem(props) {
    const dispatch = useDispatch();
    const cartItemsCountMap = useSelector((state) => state.counter.cartItemsCountMap);
    localStorage.setItem("cartItemsCountMap",JSON.stringify(Object.fromEntries(cartItemsCountMap)));

    // localStorage.setItem("cartItemsCountMap",JSON.stringify(cartItemsCountMap));
    let uniqueId = props.uniqueId;
    console.log('uniqueId',uniqueId)
    let addToCart = (uniqueId)=>{
        dispatch(productActions.addToCart(uniqueId));
    }
    return (
        <i onClick={()=>{addToCart(uniqueId)}}  class="fa-solid fa-plus"></i>
    );
}

export default IncreaseItem;