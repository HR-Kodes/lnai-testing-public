import React, { useState } from "react";
import axios from "axios";
import "./fillipform.css";

const FinalCheck = ({ formData }) => {
  const [termsAndConditionsChecked1, setTermsAndConditionsChecked1] =
    useState(false);
  const [termsAndConditionsChecked2, setTermsAndConditionsChecked2] =
    useState(false);

  const submit = () => {
    const jsonData = {};

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const [group, subKey] = key.split("-");
        if (!jsonData[group]) {
          if (subKey) {
            jsonData[group] = {};
            jsonData[group][key] = formData[key];
          } else {
            jsonData[key] = formData[key];
          }
        } else {
          jsonData[group][key] = formData[key];
        }
      }
    }

    console.log(JSON.stringify(jsonData, null, 2));

    SendDataToBackend(jsonData);
  };

  const SendDataToBackend = (data) => {
    axios
      .post("http://localhost:3001/writejson", data)
      .then((response) => {
        console.log("Data sent to backend.");
      })
      .catch((error) => {
        console.log("Error sending data to the backend: ", error);
      });
  };

  return (
    <div className="terms-and-conditions-fillip">
      <label>
        <input
          type="checkbox"
          checked={termsAndConditionsChecked2}
          onChange={(event) =>
            setTermsAndConditionsChecked2(event.target.checked)
          }
        />
        <strong style={{ marginLeft: "10px" }}>
          I confirm that the provided details are accurate to the best of my
          knowledge and consent to their use.
        </strong>
      </label>

      <label style={{ marginTop: "50px" }} className="label-2-fillip">
        <p>Terms and Conditions</p>
        <input
          type="checkbox"
          checked={termsAndConditionsChecked1}
          onChange={(event) =>
            setTermsAndConditionsChecked1(event.target.checked)
          }
        />

        <strong style={{ marginLeft: "10px" }}>
          I have read and agree to Legal Niti's Terms of Service and Privacy
          Policy. By checking this box, I acknowledge that I have carefully
          reviewed and understood the terms and conditions outlined by Legal
          Niti. I agree to comply with all the stated policies and guidelines
          while using this service
        </strong>
      </label>
      <button
        onClick={submit}
        className="fillip-submit-button"
        disabled={!termsAndConditionsChecked1 || !termsAndConditionsChecked2}
        style={{ marginLeft: "350px", marginTop: "50px" }}
      >
        Submit
      </button>
    </div>
  );
};

export default FinalCheck;
