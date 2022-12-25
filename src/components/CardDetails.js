import React from 'react';
import Navbar from './Navbar';
import CartItems from './CartItems';

// cardDetails component
function CardDetails(props) {
    return (
        <div>
            <Navbar/>
            <CartItems />
        </div>
    );
}

export default CardDetails;