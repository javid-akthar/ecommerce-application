import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/navigation";


function DecreaseItem(props) {
    const dispatch = useDispatch();
        // importing cartItemsCountMap from store
    const cartItemsCountMap = useSelector((state) => state.counter.cartItemsCountMap);
    localStorage.setItem("cartItemsCountMap",JSON.stringify(Object.fromEntries(cartItemsCountMap)));
   

    let uniqueId = props.uniqueId;
    console.log('uniqueId',uniqueId)
    // function to decrease the itemcount
    let removeFromCart = (uniqueId)=>{
        dispatch(productActions.removeFromCart(uniqueId));
    }
    // button to trigger the decrease cart items count
    return (
        <button onClick={()=>{removeFromCart(uniqueId)}} type="button" className="btn btn-secondary">
                    <i   className="fa-solid fa-minus"></i>
        </button>
    );
}

export default DecreaseItem;