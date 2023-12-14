import React from "react";
import "./feature.css"
function FeatureItem(props) {
  return (
    <div className="col-md-4 feature-box">
      <div className="icon-box-item feature-icon">
        <div className="icon-box__icon">
          <img
            src={require("../../assets/img/" + props.img)}
            alt="Businex-Feature"
          />
        </div>
        <div className="icon-box__info">
          <h5>{props.title}</h5>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default FeatureItem;
