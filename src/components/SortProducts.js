import React from 'react';
import { useDispatch } from "react-redux";
import { productActions } from "../store/navigation";
import AddProduct from './AddProduct';


function SortProducts(props) {
    const dispatch = useDispatch();

    // function to trigger the sort products by price reducer
    function sortProducts(){
        dispatch(productActions.sortProducts());
    }
    let sortBtnDivStyle = {
        paddingTop: "84px",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "10px"
    }
    let sortBtnStyle = {
        margin : "0px 10px"
    }
    // button through which sort function will be triggered
    return (
        <div style={sortBtnDivStyle}>
           <button onClick={sortProducts} type="button" className="btn btn-primary" style={sortBtnStyle}  ><i className="fa-solid fa-sort"></i> sort items by price</button> 
           <AddProduct/>
        </div>
    );
}

export default SortProducts;