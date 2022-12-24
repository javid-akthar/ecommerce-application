import React, { useEffect } from 'react';
import AddProduct from './AddProduct';
import CartTotal from './CartTotal';
// import { useSelector, useDispatch } from "react-redux";
// import { productActions } from "../store/navigation";



function Navbar(props) {
    // const dispatch = useDispatch();
    // const cacheDataLoaded = useSelector((state) => state.counter.cacheDataLoaded);

    // setCartListSavedData(state, action){
    //     state.cartList = action.payload;
    // },setCartItemsCountMapSavedData(state, action){
    //   state.cartItemsCountMap = action.payload
    // }
    // // useEffect( ()=>{
    //     // if(!cacheDataLoaded){
    //     // if(localStorage.getItem("cartList")){
    //     //     dispatch(productActions.setCartListSavedData(localStorage.getItem("cartList")));
    //     // }
    //     // if(localStorage.getItem("cartItemsCountMap")){
    //     //     dispatch(productActions.setCartItemsCountMapSavedData(JSON.parse(localStorage.getItem("cartItemsCountMap"))));
    //     // }
    //     // dispatch(productActions.setCacheDataLoaded());
    // }
    

    // // }, []);
    let navbarTitleStle = {
        color: "rgb(153,0,18)",
        fontSize: "32px",
        paddingLeft: "4px"
    }

    let navBarStyleOBj = {
     backgroundColor: "#e3f2fd",
     height: "65px",
     width: "100%",
     position: "fixed",
     zIndex: "2"  
    }

    return (
        <div>
            <nav className="navbar navbar-light" style={navBarStyleOBj}>
      <span className="navbar-brand mb-0 h1" style={navbarTitleStle}>Ecommerce Application</span>
      <CartTotal/>
      <AddProduct/>
    </nav>
        </div>
    );
}

export default Navbar;