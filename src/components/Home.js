import React from 'react';
import Navbar from './Navbar';
import ProductList from './ProductList'
import SortProducts from './SortProducts';

// home page comprising of Navbar, SortProducts, ProductList components
function Home(props) {
    return (
        <div>
           <Navbar/> 
           <SortProducts/>
           <ProductList/>
        </div>
    );
}

export default Home;