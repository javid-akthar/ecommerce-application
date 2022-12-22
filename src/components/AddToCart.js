import React from 'react';
import {  useDispatch } from "react-redux";
import { productActions } from "../store/navigation";


function AddToCart(props) {
    const dispatch = useDispatch();
    let uniqueId = props.uniqueId;
    let addToCart = (uniqueId)=>{
        dispatch(productActions.addToCart(uniqueId));

    }
    return (
        <div>
           <button onClick={()=>{addToCart(uniqueId)}} type="button" className="btn btn-primary btn-sm">Small button</button> 
        </div>
    );
}

export default AddToCart;