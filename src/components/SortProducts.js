import React from 'react';
import { useDispatch } from "react-redux";
import { productActions } from "../store/navigation";


function SortProducts(props) {
    const dispatch = useDispatch();

    function sortProducts(){
        dispatch(productActions.sortProducts());
    }
    let sortBtnStyle = {
        paddingTop: "84px",
        display: "flex",
        justifyContent: "center"
    }
    return (
        <div style={sortBtnStyle}>
           <button onClick={sortProducts} type="button" className="btn btn-primary">sort</button> 
        </div>
    );
}

export default SortProducts;