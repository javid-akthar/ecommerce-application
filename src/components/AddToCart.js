import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {  productActions } from "../store/navigation";


function AddToCart(props) {
    const dispatch = useDispatch();
    const cartItemsCountMap = useSelector((state) => state.counter.cartItemsCountMap);
    console.log('valueofcartItemsCountMap',cartItemsCountMap);
    console.log('valueofcartItemsCountMap',JSON.stringify(Array.from(cartItemsCountMap.entries())));
    localStorage.setItem("cartItemsCountMap",JSON.stringify(Object.fromEntries(cartItemsCountMap)));

    let uniqueId = props.uniqueId;
    let addToCart = (uniqueId)=>{
        dispatch(productActions.addToCart(uniqueId));
    }
    
    return (
        <div>
           <button onClick={()=>{addToCart(uniqueId)}} type="button" className="btn btn-primary btn-sm">Add to Cart</button> 
        </div>
    );
}

export default AddToCart;