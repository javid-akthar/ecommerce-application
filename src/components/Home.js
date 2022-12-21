import React from 'react';
import Navbar from './Navbar';
import ProductList from './ProductList'

function Home(props) {
    return (
        <div>
           <Navbar/> 
           <ProductList/>
        </div>
    );
}

export default Home;