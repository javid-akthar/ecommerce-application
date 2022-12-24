import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../store/navigation";
import AddToCart from "./AddToCart";
import DeleteFromList from './DeleteFromList';
import EditProduct from './EditProduct';
// import fs from 'fs'
// import preval from 'babel-plugin-preval';

function ProductList(props) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.counter.productList);
  // let dbResponse = "";
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(async (response) => {
        response = await response.json();
        console.log("responseof", response);
        console.log("productActions", productActions);
        dispatch(productActions.updateProductList(response));
        // console.log(response.json());
      })
      .then((json) => console.log(json));
    // const fs = require("fs");
    // const fileName = "./db.json";
    // const file = require(fileName);

    // file.key = "new value";

    // fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
    //   if (err) return console.log(err);
    //   console.log(JSON.stringify(file));
    //   console.log("writing to " + fileName);
    // });

//     const greetingContent = preval`
//     const fs = require('fs')
//     module.exports = fs.readFileSync(require.resolve('./greeting.txt'), 'utf8')
//   `
//   console.log(greetingContent);

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
    <div className="d-flex flex-wrap" style={flexMainDiv}>
      {ele}
    </div>
  );
}

export default ProductList;
