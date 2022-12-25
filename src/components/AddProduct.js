import React, { useState } from "react";
import { productActions } from "../store/navigation";
import { useDispatch } from "react-redux";
import $ from "jquery";
import toastr from "toastr";
import './toastr.css';

function AddProduct(props) {
  const dispatch = useDispatch();
  // setting up useStates for the fields of product
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [rating, setRating] = useState("");
  let [brand, setBrand] = useState("");
  let [category, setCategory] = useState("");
  let [imageUrl, setImageUrl] = useState("");

  // setting up handleChange for input data in add product form
  const titleHandleChange = (event) => {
    setTitle(event.target.value);
  };

  const descriptionHandleChange = (event) => {
    setDescription(event.target.value);
  };

  const priceHandleChange = (event) => {
    setPrice(event.target.value);
  };

  const ratingHandleChange = (event) => {
    setRating(event.target.value);
  };

  const brandHandleChange = (event) => {
    setBrand(event.target.value);
  };

  const categoryHandleChange = (event) => {
    setCategory(event.target.value);
  };

  const imageUrlHandleChange = (event) => {
    setImageUrl(event.target.value);
  };


  function addProduct() {
    // creating an object with the input data
    let newObj = {
      title: title,
      description: description,
      price: price,
      rating: rating,
      brand: brand,
      category: category,
      thumbnail: imageUrl,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(newObj);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // calling the json-server and add the product through post api call
    fetch("http://ec2-15-206-165-96.ap-south-1.compute.amazonaws.com:3004/products", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        dispatch(productActions.addProduct(JSON.parse(result)));
      })
      .catch((error) => console.log("error", error));

    $("#addCancelBtn").click();
    $(".modal-backdrop").remove();
    // for flash message
    toastr.options.timeOut = 2000;
    toastr.success("Product added");
    setTitle("");
    setDescription("");
    setPrice("");
    setRating("");
    setBrand("");
    setCategory("");
    setImageUrl("");
  }

  let AddBtnStyle = {
    margin : "0px 10px"
}

// modal for new adding product
  return (
    <div>
      <button
         style={AddBtnStyle} 
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        <i className="fa-solid fa-plus"></i> Add new Product 
      </button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add Product
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Product Name</label>
                  <input
                    onChange={titleHandleChange}
                    value={title}
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder={""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    onChange={priceHandleChange}
                    value={price}
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder={""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Product Description</label>
                  <input
                    onChange={descriptionHandleChange}
                    value={description}
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder={""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <input
                    onChange={ratingHandleChange}
                    value={rating}
                    type="text"
                    className="form-control"
                    id="rating"
                    placeholder={""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <input
                    onChange={brandHandleChange}
                    value={brand}
                    type="text"
                    className="form-control"
                    id="brand"
                    placeholder={""}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    onChange={categoryHandleChange}
                    value={category}
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder={""}
                  />
                </div>
                <div className="Category">
                  <label htmlFor="imageUrl">Url</label>
                  <input
                    onChange={imageUrlHandleChange}
                    value={imageUrl}
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    placeholder={""}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                id={"addCancelBtn"}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={addProduct}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
