import { createSlice } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

enableMapSet();
// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false
// })
let productList = null;
let productListMap = new Map();
// temp();
//  async function temp(){
//   console.log("line1")
//   let response = await fetch("http://localhost:3000/products")
//   console.log("line2")
// response =await response.json()
// console.log("line3")
// productList = response;
// console.log("line4")
//         let tempMap = new Map(); 
//         console.log("line1")
//       for(let i=0; i<productList.length; i++){
//         let id = productList[i].id;
//         let data = productList[i];
//         tempMap.set(id, data );
//       }
//       console.log("line5")
//       // productListMap = tempMap;
//       // console.log(productListMap);
//       return tempMap;
// }



let cartItemsCountMap = new Map()
if(localStorage.getItem("cartItemsCountMap")){
cartItemsCountMap = new Map(Object.entries(JSON.parse(localStorage.getItem("cartItemsCountMap"))));
console.log('cartItemsCountMap in navigation',cartItemsCountMap)
}
let cartList= [];
if(localStorage.getItem("cartList")){
  cartList = JSON.parse(localStorage.getItem("cartList"));
  console.log('cartList from localstorage',cartList)
}

const initialProductState = { productList: [], cartList : cartList, sortAsc: true, productListMap : productListMap, cartItemsCountMap,
  cacheDataLoaded: false };
console.log('initialProductState',initialProductState)
const productSlice = createSlice({
  name: 'counter',
  initialState: initialProductState,
  reducers: {
    updateProductList(state, action){
      console.log('action.payload',action.payload);
      state.productList = action.payload
      let productList = state.productList;
      let tempMap = new Map(); 
      for(let i=0; i<productList.length; i++){
        let id = productList[i].id;
        let data = productList[i];
        tempMap.set(id, data );
      }
      state.productListMap = tempMap;
    },addToCart(state, action){
      console.log(' addToCart action.payload',action.payload);
      
      // console.log('state.cartItemsCountMap',state.cartItemsCountMap);
      let countMap = state.cartItemsCountMap;
      console.log('countMap',countMap);
      if(countMap.has(action.payload.toString())){
        let existingCount = countMap.get(action.payload.toString())
        console.log('existingCount',existingCount);
      countMap.set(action.payload.toString(), existingCount+1);
      }else{
        countMap.set(action.payload.toString(), 1);
        state.cartList.push(action.payload);
      }
      state.cartItemsCountMap = countMap;
      for(let i of state.cartList){
        console.log(i);
      }
      localStorage.setItem("cartList",JSON.stringify(state.cartList));
      console.log("value need to be handle",state.cartItemsCountMap)
      console.log(typeof(state.cartItemsCountMap));
      for(let prop of state.cartItemsCountMap){
        console.log('prop',prop);
        console.log('prop',state.cartItemsCountMap[prop]);
      }
      console.log('state.cartlist',state.cartList);
      // localStorage.setItem("cartItemsCountMap",JSON.stringify(state.cartItemsCountMap));
    },removeFromCart(state, action){
      console.log(' addToCart action.payload',action.payload);
      
      // console.log('state.cartItemsCountMap',state.cartItemsCountMap);
      let countMap = state.cartItemsCountMap;
      console.log('countMap',countMap);
      if(countMap.has(action.payload.toString())){
        let existingCount = countMap.get(action.payload.toString())
        console.log('existingCount',existingCount);
        if(existingCount == 1){
          console.log('existingCount is 1',existingCount);
          console.log('countMapbefore',countMap)
          console.log('action.payload.toString()',action.payload.toString())
          console.log('action.payload.toString()',typeof(action.payload.toString()))
          countMap.delete(action.payload.toString()+"");
          // state.cartItemsCountMap.delete(action.payload.toString())
          // countMap = state.cartItemsCountMap
          console.log('countMapafter',countMap)
          state.cartList.pop(action.payload);
        }else{
          console.log('',existingCount);
          countMap.set(action.payload.toString(), existingCount-1);
        }
        
      }else{
        countMap.set(action.payload.toString(), 1);
        state.cartList.push(action.payload);
      }
      state.cartItemsCountMap = countMap;
      for(let i of state.cartList){
        console.log(i);
      }
      localStorage.setItem("cartList",JSON.stringify(state.cartList));
      console.log("value need to be handle",state.cartItemsCountMap)
      // localStorage.setItem("cartItemsCountMap",JSON.stringify(state.cartItemsCountMap));
    }
    ,deleteFromList(state, action){
      let deletableItem = action.payload;
      console.log('action.uniqueId',action.payload)
      let deletableIndex = -1;
      let productList = state.productList;
      console.log('productList',productList)
      console.log('productList.length',productList.length);
      console.log('deletableItem',deletableItem);
      for(let i=0;  i<productList.length; i++){

        if(productList[i].id === deletableItem){
          deletableIndex = i;
          state.productList.splice(i, 1);
          state.productListMap.delete(deletableItem);
          console.log('state.cartList',state.cartList);
          for(let l=0; l<state.cartList.length ; l++){
            if(state.cartList[l] == deletableItem){
              console.log('deletableItem',deletableItem);
              // state.cartList.pop(deletableItem);
              state.cartList.splice(l, 1);
              // console.log('deletableItem',deletableItem.toString)
              state.cartItemsCountMap.delete(deletableItem.toString())
              localStorage.setItem("cartList",JSON.stringify(state.cartList));
            }
          }
          break; 
        }
      }
      console.log('deletableIndex',deletableIndex);
    }, addProduct(state, action){
      console.log('action.payload',action.payload);
      state.productList.push(action.payload);
    },EditProduct(state, action){
      let productList = state.productList;
      let updateRequiredId = action.payload.id
      for(let i=0; i<productList.length; i++){
        if(productList[i].id === updateRequiredId){
          state.productList[i] = action.payload
          break;
        }
      }
    },sortProducts(state){
      console.log(state.sortAsc);
      if (state.sortAsc) {
        state.productList = state.productList.sort((a, b) => a["price"] > b["price"] ? 1 : -1)
        state.sortAsc = false;
        console.log(state.sortAsc);
    }else if (!state.sortAsc){
        state.productList = state.productList.sort((a, b) => a["price"] < b["price"] ? 1 : -1)
        state.sortAsc = true;
        console.log(state.sortAsc);
    }
    }
    // ,setCartListSavedData(state, action){
    //     state.cartList = action.payload;
    // },setCartItemsCountMapSavedData(state, action){
    //   state.cartItemsCountMap = action.payload
    // },setCacheDataLoaded(state){
    //   state.cacheDataLoaded = true;
    // }
  }
  // ,
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

export const productActions = productSlice.actions;

export default productSlice.reducer;