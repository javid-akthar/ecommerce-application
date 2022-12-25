import React from "react";
import { productActions } from "../store/navigation";
import { useSelector, useDispatch } from "react-redux";
import toastr from "toastr";
import './toastr.css'

function DeleteFromList(props) {
  const dispatch = useDispatch();
  // importing cartItemsCountMap from store
  const cartItemsCountMap = useSelector(
    (state) => state.counter.cartItemsCountMap
  );
  // setting up the local cartItemsCountMap in localstorage
  localStorage.setItem(
    "cartItemsCountMap",
    JSON.stringify(Object.fromEntries(cartItemsCountMap))
  );

  // this function will delete the product added to productList
  function deleteFromList(uniqueId) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // api call to trigger delete function
    fetch("http://ec2-15-206-165-96.ap-south-1.compute.amazonaws.com:3004/products/" + uniqueId, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        dispatch(productActions.deleteFromList(uniqueId));
        toastr.options.timeOut = 1500;
        toastr.warning("product Deleted");
      })
      .catch((error) => console.log("error", error));
  }

  // button in which user triggers the delete function
  return (
    <div>
      <i
        onClick={() => deleteFromList(props.uniqueId)}
        className="fa-solid fa-trash"
      ></i>
    </div>
  );
}

export default DeleteFromList;
