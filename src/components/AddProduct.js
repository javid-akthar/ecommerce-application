import React, { useState } from 'react';
import { productActions } from "../store/navigation";
import {  useDispatch } from "react-redux";
import $ from 'jquery';
import toastr from 'toastr';


function AddProduct(props) {
    const dispatch = useDispatch();
    let [title, setTitle] = useState("");
    let [description, setDescription] = useState("");
    let [price, setPrice] = useState("");
    let [rating, setRating] = useState("");
    let [brand, setBrand] = useState("");
    let [category, setCategory] = useState("");
    let [imageUrl, setImageUrl] = useState("");
   
    const titleHandleChange = (event) => {
      // 👇 Get input value from "event"
      setTitle(event.target.value);
    };

    const descriptionHandleChange = (event) => {
      // 👇 Get input value from "event"
      setDescription(event.target.value);
    };

    const priceHandleChange = (event) => {
      // 👇 Get input value from "event"
      setPrice(event.target.value);
    };

    const ratingHandleChange = (event) => {
      // 👇 Get input value from "event"
      setRating(event.target.value);
    };

    const brandHandleChange = (event) => {
      // 👇 Get input value from "event"
      setBrand(event.target.value);
    };

    const categoryHandleChange = (event) => {
      // 👇 Get input value from "event"
      setCategory(event.target.value);
    };


    const imageUrlHandleChange = (event) => {
      // 👇 Get input value from "event"
      setImageUrl(event.target.value);
    };
    
    function addProduct(){
        // let uniqueId = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(16).toString().replace(".", ""));
      let newObj = {
        title: title,
        description : description,
        price : price,
        rating : rating,
        brand : brand,
        category : category,
        imageUrl : imageUrl
      }
        // dispatch(productActions.addProduct(newObj));

      // 

      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(newObj);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/products", requestOptions)
  .then(response => response.text())
  .then(result => {
    console.log(result);
    console.log(typeof(result));
    console.log(JSON.parse(result));
    dispatch(productActions.addProduct(JSON.parse(result)));
  })
  .catch(error => console.log('error', error));
        
      // 
        $("#addCancelBtn").click();
        $(".modal-backdrop").remove();
        toastr.options.timeOut = 2000;
        toastr.success('Product added');
        setTitle("");
        setDescription("");
        setPrice("");
        setRating("");
        setBrand("");
        setCategory("");
        setImageUrl("")
   
    }

    return (
        <div>
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
 Edit
</button>

<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
        <div className="form-group">
    <label htmlFor="title">Product Name</label>
    <input onChange={titleHandleChange} value={title} type="text" className="form-control" id="title"  placeholder={""}/>
  </div>
  <div className="form-group">
    <label htmlFor="price">Price</label>
    <input onChange={priceHandleChange} value={price} type="text" className="form-control" id="price"  placeholder={""}/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Product Description</label>
    <input onChange={descriptionHandleChange} value={description} type="text" className="form-control" id="description"  placeholder={""}/>
  </div>
  <div className="form-group">
    <label htmlFor="rating">Rating</label>
    <input onChange={ratingHandleChange} value={rating} type="text" className="form-control" id="rating"  placeholder={""}/>
  </div>
  <div className="form-group">
    <label htmlFor="brand">Brand</label>
    <input onChange={brandHandleChange} value={brand} type="text" className="form-control" id="brand"  placeholder={""}/>
  </div>
  <div className="form-group">
    <label htmlFor="category">Category</label>
    <input onChange={categoryHandleChange} value={category} type="text" className="form-control" id="category"  placeholder={""}/>
  </div>
  <div className="Category">
    <label htmlFor="imageUrl">Url</label>
    <input onChange={imageUrlHandleChange} value={imageUrl} type="text" className="form-control" id="imageUrl"  placeholder={""}/>
  </div>
        </form>
      </div>
      <div className="modal-footer">
        <button id={"addCancelBtn"} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={addProduct} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
}

export default AddProduct;