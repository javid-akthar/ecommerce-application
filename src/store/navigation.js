import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

let productListMap = new Map();

let cartItemsCountMap = new Map();
if (localStorage.getItem("cartItemsCountMap")) {
  cartItemsCountMap = new Map(
    Object.entries(JSON.parse(localStorage.getItem("cartItemsCountMap")))
  );
  // console.log("cartItemsCountMap in navigation", cartItemsCountMap);
}
let cartList = [];
if (localStorage.getItem("cartList")) {
  cartList = JSON.parse(localStorage.getItem("cartList"));
  // console.log("cartList from localstorage", cartList);
}

const initialProductState = {
  productList: [],
  cartList: cartList,
  sortAsc: true,
  productListMap: productListMap,
  cartItemsCountMap,
  cacheDataLoaded: false,
  // productListCache : [],
  sorted: false
};
// console.log("initialProductState", initialProductState);
const productSlice = createSlice({
  name: "counter",
  initialState: initialProductState,
  reducers: {
    updateProductList(state, action) {
      // console.log("action.payload", action.payload);
      state.productList = action.payload;
      let tempMap = new Map();
      for (let i = 0; i < state.productList.length; i++) {
        let id = state.productList[i].id;
        let data = state.productList[i];
        tempMap.set(id, data);
      }
      state.productListMap = tempMap;
    },
    addToCart(state, action) {
      // console.log("action.payload", action.payload);
      let countMap = state.cartItemsCountMap;
      if (countMap.has(action.payload.toString())) {
        let existingCount = countMap.get(action.payload.toString());
        countMap.set(action.payload.toString(), existingCount + 1);
      } else {
        countMap.set(action.payload.toString(), 1);
        state.cartList.push(action.payload);
      }
      state.cartItemsCountMap = countMap;
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    removeFromCart(state, action) {
      // console.log(" addToCart action.payload", action.payload);
      let countMap = state.cartItemsCountMap;
      if (countMap.has(action.payload.toString())) {
        let existingCount = countMap.get(action.payload.toString());
        if (existingCount === 1) {
          countMap.delete(action.payload.toString());
          state.cartItemsCountMap = countMap;
          for (let i = 0; i < state.cartList.length; i++) {
            if (state.cartList[i] === action.payload) {
              state.cartList.splice(i, 1);
            }
          }
        } else {
          countMap.set(action.payload.toString(), existingCount - 1);
        }
      }
      state.cartItemsCountMap = countMap;
    },
    deleteFromList(state, action) {
      let deletableItem = action.payload;
      // console.log("action.uniqueId", action.payload);
      let productList = state.productList;
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id === deletableItem) {
          state.productList.splice(i, 1);
          state.productListMap.delete(deletableItem);
          for (let l = 0; l < state.cartList.length; l++) {
            if (state.cartList[l] === deletableItem) {
              state.cartList.splice(l, 1);
              state.cartItemsCountMap.delete(deletableItem.toString());
              localStorage.setItem("cartList", JSON.stringify(state.cartList));
            }
          }
          break;
        }
      }
    },
    addProduct(state, action) {
      state.productList.push(action.payload);
    },
    EditProduct(state, action) {
      let productList = state.productList;
      let updateRequiredId = action.payload.id;
      for (let i = 0; i < productList.length; i++) {
        if (productList[i].id === updateRequiredId) {
          state.productList[i] = action.payload;
          break;
        }
      }
    },
    sortProducts(state) {
      if (state.sortAsc) {
        state.productList = state.productList.sort((a, b) =>
          a["price"] > b["price"] ? 1 : -1
        );
        state.sortAsc = false;
      } else if (!state.sortAsc) {
        state.productList = state.productList.sort((a, b) =>
          a["price"] < b["price"] ? 1 : -1
        );
        state.sortAsc = true;
      }
      state.sorted = true
    },removeSort(state){
      state.sorted = false
    }
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
