import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
// import { Route } from 'react-router-dom';
// import CardDetails from './CardDetails';


function CartTotal(props) {
    const cartCount = useSelector((state) => state.counter.cartList.length);

    let cardBtnStyle = {
        margin: "0px 250px"
    }
    return (
        <div style={cardBtnStyle}>
        <Link to='/card-details'>
        <button  type="button" className="btn btn-primary">Go to Cart {cartCount}<i className="fa-solid fa-cart-shopping"></i> </button>
        </Link>
        
        </div>
    );
}

export default CartTotal;