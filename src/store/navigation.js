import { createSlice } from '@reduxjs/toolkit';



const initialProductState = { productList : null, cartList : [] };



const productSlice = createSlice({
  name: 'counter',
  initialState: initialProductState,
  reducers: {
    updateProductList(state, action){
      console.log('action.payload',action.payload);
      state.productList = action.payload
    },addToCart(state, action){
      console.log(' addToCart action.payload',action.payload);
      let tempArr = state.cartList;
      console.log(tempArr);
      state.cartList.push(action.payload);
      console.log(state.cartList)
       tempArr = state.cartList;
      console.log(tempArr);
      console.log('state.cartList',state.cartList);
      for(let i of state.cartList){
        console.log(i);
      }
    },addProductList(state, action){
      console.log('action.payload',action.payload);
      state.productList.push(action.payload);
    },updateProductListObj(state, action){
      let productList = state.productList;
      productList.forEach((element, index) => {
        let updatedObj = action.payload;
        console.log('index.payload',index.payload);
        if(updatedObj.uniqueId === element.uniqueId){
          element.id = updatedObj.id;
          element.updatedId = updatedObj.updatedId;
          element.title = updatedObj.title;
        }
      });
    }, deleteProductListObj(state, action){
      // let deletableUniqueId = action.payload
      // console.log('dlete.payload',action.payload);
      // let productList = state.productList;
      // let deletableIndex = -1;
      // productList.map( (item, index) =>{
      //   if(item.uniqueId === deletableUniqueId){
      //     deletableIndex = index;
      //     // console.log('deletableIndex',deletableIndex);
      //     return index;
      //   }
      // });
      // if(deletableIndex !== -1)
      // productList.splice(deletableIndex, 1);
      // state.productList = productList;

    }
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;