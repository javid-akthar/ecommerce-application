import React, { useState } from "react";
import { useSelector } from "react-redux";
import  AddToCart from './AddToCart' ;
import {useParams} from "react-router-dom";
import { useLayoutEffect } from "react";
import Navbar from "./Navbar";

function ItemDetails(props) {
  let [item, serItemDetails] = useState(null);
  const { id } = useParams();

//   importing cartList form store
  const cartList = useSelector((state) => state.counter.cartList);
//   to call the get api
  useLayoutEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // callign the products api with the id come in params
    fetch(
      `http://ec2-15-206-165-96.ap-south-1.compute.amazonaws.com:3004/products/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        serItemDetails(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  }, [id]);

//   code to setup the cartList in localstorage
  localStorage.setItem("cartList", JSON.stringify(cartList));

  let cardDivStyle = {
    width: "70%",
    margin: "auto",
  };

  let albumBodyStyle = {
    backgroundColor: "rgb(250,234,235)",
  };

  let headerDivStyle = {
    paddingTop: "84px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  let funcBtn = {
    display: "flex",
    justifyContent: "space-between"
  }

//   ele will hold the card of the selected element
  let ele = "";
  if (item) {
    ele = (
      <div style={headerDivStyle}>
        <div className="card mb-3" style={cardDivStyle}>
          <img className="card-img-top" src={item.thumbnail} alt={item.title} />
          <div className="card-body">
            <div className="card-body" style={albumBodyStyle}>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description}</p>
              <table
                className="table table-sm table-white"
                style={{ border: "0px solid white" }}
              >
                <tbody>
                  <tr>
                    <th scope="row">price</th>
                    <td>{item.price + "$"}</td>
                  </tr>
                  <tr>
                    <th scope="row">rating</th>
                    <td>{item.rating}</td>
                  </tr>
                  <tr>
                    <th scope="row">brand</th>
                    <td>{item.brand}</td>
                  </tr>
                  <tr>
                    <th scope="row">category</th>
                    <td>{item.category}</td>
                  </tr>
                </tbody>
              </table>
              <div style={funcBtn}> 
             <AddToCart uniqueId={item.id} />
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {ele}
    </>
  );
}

export default ItemDetails;
