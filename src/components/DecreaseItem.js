import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/navigation";


function DecreaseItem(props) {
    const dispatch = useDispatch();
    const cartItemsCountMap = useSelector((state) => state.counter.cartItemsCountMap);
    // localStorage.setItem("cartItemsCountMap",JSON.stringify(cartItemsCountMap));
    localStorage.setItem("cartItemsCountMap",JSON.stringify(Object.fromEntries(cartItemsCountMap)));

    let uniqueId = props.uniqueId;
    console.log('uniqueId',uniqueId)
    let removeFromCart = (uniqueId)=>{
        dispatch(productActions.removeFromCart(uniqueId));
    }
    return (
        <i onClick={()=>{removeFromCart(uniqueId)}}  class="fa-solid fa-minus"></i>
    );
}

export default DecreaseItem;