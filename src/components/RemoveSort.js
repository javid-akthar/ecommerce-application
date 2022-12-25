import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/navigation";



function RemoveSort(props) {
    const dispatch = useDispatch();
    const sorted = useSelector((state) => state.counter.sorted);

    function removeSort(){
        dispatch(productActions.removeSort());

        fetch("http://ec2-15-206-165-96.ap-south-1.compute.amazonaws.com:3004/products")
      .then(async (response) => {
        response = await response.json();
        console.log("response", response);
        dispatch(productActions.updateProductList(response));
      })
      .then((json) => console.log(json));
    }
    return (
        
        <div>
        
         { sorted && <div> <button onClick={removeSort} type="button" className="btn-close" aria-label="Close"></button> <span>removesort</span> </div>}
        
        </div>
    );
}

export default RemoveSort;