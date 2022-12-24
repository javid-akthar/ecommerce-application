import React from 'react';
import { productActions } from "../store/navigation";
import {  useSelector, useDispatch } from "react-redux";


function DeleteFromList(props) {
    const dispatch = useDispatch();
    const cartItemsCountMap = useSelector((state) => state.counter.cartItemsCountMap);
    localStorage.setItem("cartItemsCountMap",JSON.stringify(Object.fromEntries(cartItemsCountMap)));
    // console.log('indelete',props.unqiueId);
    // console.log('indelete',props);
    function deleteFromList(uniqueId){
        // console.log('insidemethod',uniqueId);

        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = "";

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/products/"+uniqueId, requestOptions)
  .then(response => response.text())
  .then(result =>
    { console.log(result)
        dispatch(productActions.deleteFromList(uniqueId)); 
    })
  .catch(error => console.log('error', error));

        
    }

    return (
        <div>
               <i onClick={() => deleteFromList(props.uniqueId)} className="fa-solid fa-trash"></i> 
        </div>
    );
}

export default DeleteFromList;