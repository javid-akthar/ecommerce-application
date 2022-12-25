import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/navigation";
import AddToCart from "./AddToCart";
import DeleteFromList from './DeleteFromList';
import EditProduct from './EditProduct';
import MoreDetailsBtn from "./MoreDetailsBtn";

function ProductList(props) {
  const dispatch = useDispatch();
  // importing productList from store
  const productList = useSelector((state) => state.counter.productList);

  // in the useEffect we are triggering the get api to get the products details from db
  useEffect(() => {
    fetch("http://ec2-15-206-165-96.ap-south-1.compute.amazonaws.com:3004/products")
      .then(async (response) => {
        response = await response.json();
        console.log("response", response);
        dispatch(productActions.updateProductList(response));
      })
      .then((json) => console.log(json));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let albumBodyStyle = {
    backgroundColor: "rgb(250,234,235)",
  };

  let funcBtn = {
    display: "flex",
    justifyContent: "space-between"
  }

  let ele = "";
  if (productList != null) {
    console.log("productList", productList);
    // rendering the productList card with details got from db through store
    ele = productList.map((item, index) => {
      return (
        <div key={"product"+item.id} className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src={item.thumbnail} alt={"image"+item.title} />
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
                  <td>{item.price+"$"}</td>
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
             <EditProduct item={item}/>
             <DeleteFromList uniqueId={item.id} />
            </div>
            <MoreDetailsBtn id={item.id}/>
          </div>
        </div>
      );
    });
  }

  let flexMainDiv = {
    padding: "63px",
    columnGap: "20px",
    rowGap: "20px",
    justifyContent: "space-around",
    paddingTop: "4px"
  };

  return (
    // flex container to hold the productlist cards
    <div className="d-flex flex-wrap" style={flexMainDiv}>
      {ele}
    </div>
  );
}

export default ProductList;
