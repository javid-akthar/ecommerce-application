import React from 'react';
import {Link} from "react-router-dom";

function MoreDetailsBtn(props) {
    let id = props.id;
    let moreDetailsStyle ={
        margin: "auto",
        display: "flex",
        marginTop: "15px"
      }
      
    return (
        <div>
         <Link to={`item-details/${id}`}>
           <button style={moreDetailsStyle}  type="button" className="btn btn-primary">More Details</button> 
          </Link>
        </div>
    );
}

export default MoreDetailsBtn;