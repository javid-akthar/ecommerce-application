import React, { useState } from 'react';
import { productActions } from "../store/navigation";
import {  useDispatch } from "react-redux";
import $ from 'jquery';
import toastr from 'toastr';


function EditProduct(props) {
    const dispatch = useDispatch();
    let item = props.item;
    let [title, setTitle] = useState(item.title);
    let [description, setDescription] = useState(item.description);
    let [price, setPrice] = useState(item.price);
    let [rating, setRating] = useState(item.rating);
    let [brand, setBrand] = useState(item.brand);
    let [category, setCategory] = useState(item.category);
    let [imageUrl, setImageUrl] = useState(item.thumbnail);
   
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
    
    function editProduct(uniqueId){
      let updatedObj = {
        ...props.item,
        title: title,
        description : description,
        price : price,
        rating : rating,
        brand : brand,
        category : category,
        imageUrl : imageUrl
      }

      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(updatedObj);

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/products/"+uniqueId, requestOptions)
  .then(response => response.text())
  .then(result =>{
     console.log(result)
     dispatch(productActions.EditProduct(JSON.parse(result)));
  })
  .catch(error => console.log('error', error));

        // dispatch(productActions.EditProduct(updatedObj));
        // {"editCancelBtn"+props.item.id}
        $("#editCancelBtn"+props.item.id).click();
        $(".modal-backdrop").remove();
        toastr.options.timeOut = 2000;
        toastr.success('album record updated');
    }

    return (
        <div>
<button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target={"#exampleModalCenter"+props.item.id}>
 Edit <i class="fa-solid fa-pen"></i>
</button>

<div className="modal fade" id={"exampleModalCenter"+props.item.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
    <input onChange={titleHandleChange} value={title} type="text" className="form-control" id="title"  placeholder={item.title}/>
  </div>
  <div className="form-group">
    <label htmlFor="price">Price</label>
    <input onChange={priceHandleChange} value={price} type="text" className="form-control" id="price"  placeholder={item.price}/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Product Description</label>
    <input onChange={descriptionHandleChange} value={description} type="text" className="form-control" id="description"  placeholder={item.description}/>
  </div>
  <div className="form-group">
    <label htmlFor="rating">Rating</label>
    <input onChange={ratingHandleChange} value={rating} type="text" className="form-control" id="rating"  placeholder={item.rating}/>
  </div>
  <div className="form-group">
    <label htmlFor="brand">Brand</label>
    <input onChange={brandHandleChange} value={brand} type="text" className="form-control" id="brand"  placeholder={item.brand}/>
  </div>
  <div className="form-group">
    <label htmlFor="category">Category</label>
    <input onChange={categoryHandleChange} value={category} type="text" className="form-control" id="category"  placeholder={item.category}/>
  </div>
  <div className="Category">
    <label htmlFor="imageUrl">Url</label>
    <input onChange={imageUrlHandleChange} value={imageUrl} type="text" className="form-control" id="imageUrl"  placeholder={item.thumbnail}/>
  </div>
        </form>
      </div>
      <div className="modal-footer">
        <button id={"editCancelBtn"+props.item.id} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={ () => editProduct(props.item.id)} type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
}

export default EditProduct;