import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/navigation";
import AddToCart from './AddToCart';

function ProductList(props) {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.counter.productList);
    // let dbResponse = "";
    useEffect(() => {
        fetch('http://localhost:3000/products')
  .then(async (response) => {
    response =await response.json();
    console.log('responseof',response);
    console.log('productActions',productActions);
    dispatch(productActions.updateProductList(response));
    // console.log(response.json());
  }
  
  )
  .then((json) => console.log(json));
//   dispatch(productActions.updateprodctList(dbResponse));

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      let albumBodyStyle = {
        backgroundColor: "rgb(250,234,235)"
      }

let ele = ""
    if(productList != null)
    {
        console.log('productList',productList)
        ele = productList.map( (item, index)=>{
            return (
                <div key={item.id} className="card" style={{width: "18rem"}}>
  <img className="card-img-top" src={item.thumbnail} alt="Card cap"/>
  <div className="card-body" style={albumBodyStyle}>
    <h5 className="card-title">{item.title}</h5>
    <p className="card-text">{item.description}</p>
    <table className="table table-sm table-white" style={{border : "0px solid white"}}>
  
  <tbody>
    <tr>
      <th scope="row">price</th>
      <td>{item.price}</td>
     
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
    <AddToCart uniqueId={item.id} />
    {/* "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones", */}
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
            )
        })
    }

    let flexMainDiv = {
        padding: "63px",
        columnGap: "20px",
        rowGap: "20px",
        justifyContent: "space-around",
      };

    return (
        <div className="d-flex flex-wrap" style={flexMainDiv}>
            {ele}
        </div>
    );
}

export default ProductList;