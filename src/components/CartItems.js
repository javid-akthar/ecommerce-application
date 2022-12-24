import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import IncreaseItem from './IncreaseItem';
import DecreaseItem from './DecreaseItem';
import { productActions } from "../store/navigation";


// const initialProductState = { productList : null, cartList : [], sortAsc: true, productListMap : new Map() };

function CartItems(props) {
    console.log('loaded');
    const dispatch = useDispatch();

    const cartItemsCountMap = useSelector((state) => state.counter.cartItemsCountMap);
    const productListMap = useSelector((state) => state.counter.productListMap);
    const cartList = useSelector((state) => state.counter.cartList);
    console.log('cartList',cartList)
    let ele = "";
    let total = 0;
    useLayoutEffect(() => {
        fetch("http://localhost:3000/products")
          .then(async (response) => {
            response = await response.json();
            console.log("responseof", response);
            console.log("productActions", productActions);
            await dispatch(productActions.updateProductList(response));
            await createEle();
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

    createEle();
    async function createEle(){
        ele =   cartList.map( (id)=>{
            // let a = await productListMap;
            console.log(productListMap);
            let item = productListMap.get(id);
            console.log('id',id);
            console.log('item',item);
            console.log('item',productListMap);
            total += cartItemsCountMap.get(item.id.toString()) * item.price;
            return (<div key={"cartProduct"+item.id} className="card mb-3" style={{maxWidth: "1000px"}}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={item.thumbnail} className="card-img" alt={"image"+item.title}/>
              </div>
              
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  {console.log('item.id',item.id)}
                  <IncreaseItem uniqueId={item.id}/>{cartItemsCountMap.get(item.id.toString())}<DecreaseItem uniqueId={item.id}/>
                  <p>price {cartItemsCountMap.get(item.id.toString()) * item.price} </p>
                </div>
              </div>
              
              
            </div>
          </div>)
        })
    }
    
    // function createCartList(item){
    //     console.log('ele',ele)
    //     ele +=   
    //             (<div key={"cartProduct"+item.id} className="card mb-3" style="max-width: 540px;">
    //   <div className="row no-gutters">
    //     <div className="col-md-4">
    //       <img src={item.thumbnail} className="card-img" alt={"image"+item.title}/>
    //     </div>
    //     <div className="col-md-8">
    //       <div className="card-body">
    //         <h5 className="card-title">Card title</h5>
    //         <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    //         <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
    //       </div>
    //     </div>
    //   </div>
    // </div>)
    //   console.log('ele',ele)  ;   
    
           
    // }


    return (
        <div>
            <p>dddd</p>
            {ele} 
            {total}
        </div>
    );
}

export default CartItems;