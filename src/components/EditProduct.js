import React, { useState } from "react";
import { productActions } from "../store/navigation";
import { useDispatch } from "react-redux";
import $ from "jquery";
import toastr from "toastr";

function EditProduct(props) {
  const dispatch = useDispatch();
  let item = props.item;
  // setting up the useState for editing product fields
  let [title, setTitle] = useState(item.title);
  let [description, setDescription] = useState(item.description);
  let [price, setPrice] = useState(item.price);
  let [rating, setRating] = useState(item.rating);
  let [brand, setBrand] = useState(item.brand);
  let [category, setCategory] = useState(item.category);
  let [imageUrl, setImageUrl] = useState(item.thumbnail);

  // this function will be triggered on onChange action of the fields in the form
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

  // this function takes care of creating an object with the input data got from user 
  // and triggers the edit api
  function editProduct(uniqueId) {
    let updatedObj = {
      ...props.item,
      title: title,
      description: description,
      price: price,
      rating: rating,
      brand: brand,
      category: category,
      imageUrl: imageUrl,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(updatedObj);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // when the user give the data in form and trigger submit, this api will be called and
    // the db will be updated with the actual data
    fetch("http://ec2-15-206-165-96.ap-south-1.compute.amazonaws.com:3004/products/" + uniqueId, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // to prevent whole page from rerender the update of store data is triggered through thid dispatch
        dispatch(productActions.EditProduct(JSON.parse(result)));
      })
      .catch((error) => console.log("error", error));

    // once the required updated matchMedia, the modal will be closed  
    $("#editCancelBtn" + props.item.id).click();
    $(".modal-backdrop").remove();
    // relevant message as push notification will be sent to user
    toastr.options.timeOut = 1500;
    toastr.success("product Details updated");
  }

  // jsx code for form edit modal
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        data-toggle="modal"
        data-target={"#exampleModalCenter" + props.item.id}
      >
        Edit <i className="fa-solid fa-pen"></i>
      </button>

      <div
        className="modal fade"
        id={"exampleModalCenter" + props.item.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Product
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
                    placeholder={item.title}
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
                    placeholder={item.price}
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
                    placeholder={item.description}
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
                    placeholder={item.rating}
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
                    placeholder={item.brand}
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
                    placeholder={item.category}
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
                    placeholder={item.thumbnail}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                id={"editCancelBtn" + props.item.id}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => editProduct(props.item.id)}
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

export default EditProduct;
