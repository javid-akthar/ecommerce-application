import React from 'react';
// import { Route } from 'react-router-dom';
// import CardDetails from './CardDetails';
import Navbar from './Navbar';
import CartItems from './CartItems';

function CardDetails(props) {
    return (
        <div>
            <Navbar/>
            <CartItems />
        </div>
    );
}

export default CardDetails;