import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
import React, { useState } from "react";

const AnswerBox2 = ({
  question,
  formData,
  handleAnswerInputChange,
  setFormData,
  handleFileInputChange,
}) => {
  // State to track the selected option in the dropdown
  const [selectedOption, setSelectedOption] = useState("");

  //State to track the selected option for years
  const [selectedOptionYears, setSelectedOptionYears] = useState("");

  //State to track the selected option for months
  const [selectedOptionMonths, setSelectedOptionMonths] = useState("");

  //State to track the selected option for Other Than Cash
  const [selectedOptionOtherThanCash, setSelectedOptionOtherThanCash] =
    useState("");

  // State to control the visibility of the textbox
  const [showTextbox, setShowTextbox] = useState(false);

  //State to control the residential Proof
  const [selectedResidentialProof, setSelectedResidentialProof] = useState("");

  // Handler for when an option is selected in the dropdown
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Check if "Others" is selected, then show the textbox
    if (selectedValue === "Others") {
      setShowTextbox(true);
    } else {
      setShowTextbox(false);
    }

    // Update formData with the selected value
    setFormData((prevData) => ({
      ...prevData,
      [question.id]: selectedValue,
    }));
  };

  //Handling option selection in Form of Contribution (Other than Cash) Dropdown
  const HandleOtherThanCash = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionOtherThanCash(selectedValue);

    if (selectedValue === "Other than cash") {
      setShowTextbox(true);
    } else {
      setShowTextbox(false);
    }

    // Update formData with the selected value
    setFormData((prevData) => ({
      ...prevData,
      [question.id]: selectedValue,
    }));
  };

  //Handling option selection in Years Dropdown
  const HandleYearChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionYears(selectedValue);

    // Update formData with the selected value
    setFormData((prevData) => ({
      ...prevData,
      [`${question.id}-YEAR`]: selectedValue,
    }));
  };

  //Handling option selection in Months Dropdown
  const HandleMonthChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionMonths(selectedValue);

    // Update formData with the selected value
    setFormData((prevData) => ({
      ...prevData,
      [`${question.id}-MONTH`]: selectedValue,
    }));
  };

  //This is for updating Residential Proof Dropdown
  const HandleResidentialProof = (event) => {
    const selectedValue = event.target.value;
    setSelectedResidentialProof(selectedValue);

    //Update formData with the selected Value
    setFormData((prevData) => ({
      ...prevData,
      [`${question.id}-RESIDENTIAL_PROOF_OPTION`]: selectedValue,
    }));
  };

  //This is for updating Residential Proof Upload Link
  const HandleResidentialProofFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFormData = {
        ...formData,
        [`${question.id}-RESIDENTIAL_PROOF_UPLOAD_LINK`]: file.name,
      }; //storing the filename in the formData
      handleAnswerInputChange(question.id, file.name); // using the handleAnswerInputChange function with the filename
      setFormData(updatedFormData); // updating the formData using the setFormData
    }
  };

  //This is for updating the Residential Proof Number
  const HandleResidentialProofNumber = (questionId, answer) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${questionId}-RESIDENTIAL_PROOF_NUMBER`]: answer,
    }));
  };

  //This is for updating Aadhar card Number
  const HandleAadharCardNumber = (questionId, answer) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${questionId}-AADHAR_CARD_NUMBER`]: answer,
    }));
  };

  //This is for Aadhar Card File Upload
  const HandleAadharFileUpoad = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFormData = {
        ...formData,
        [`${question.id}-AADHAR_CARD_UPLOAD`]: file.name,
      }; //storing the filename in the formData
      handleAnswerInputChange(question.id, file.name); // using the handleAnswerInputChange function with the filename
      setFormData(updatedFormData); // updating the formData using the setFormData
    }
  };

  //This is for updating PAN upload
  const HandlePanFileUpoad = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFormData = {
        ...formData,
        [`${question.id}-PAN_CARD_UPLOAD`]: file.name,
      }; //storing the filename in the formData
      handleAnswerInputChange(question.id, file.name); // using the handleAnswerInputChange function with the filename
      setFormData(updatedFormData); // updating the formData using the setFormData
    }
  };
  const otherContributionOfPartner = (event, question) => {
    console.log(event);
    const updatedFormData = {
      ...formData,
      [`Other-${question.id}`]: event.target.value,
    };
    setFormData((prevData) => {
      return updatedFormData;
    });
  };

  //this is for updating the selected date
  const handleDateChange = (selectedDate) => {
    let formatedDate = moment.utc(selectedDate).format("YYYY-MM-DD");
    // Update formData with the selected date
    setFormData((prevData) => ({
      ...prevData,
      [`${question.id}-DATE`]: formatedDate,
    }));
  };

  if (question.category === "text") {
    return (
      <input
        type="text"
        id={`question${question.id}`}
        className="full-width-input-fillipform"
        style={{ width: "750px", marginLeft: "10px", marginTop: "-200px" }}
        // onChange={handleAnswerInputChange}
        onChange={(e) => handleAnswerInputChange(question.id, e.target.value)}
      />
    );
  } else if (question.category === "file") {
    return (
      <div>
        <input
          type="file"
          className="file-input-fillipform"
          style={{ marginTop: "-200px" }}
          onChange={HandlePanFileUpoad} // Call the ffunction on file input change
        />
      </div>
    );
  } else if (question.category === "file-aadhar-pan") {
    return (
      <div>
        <p>Aadhar Card:</p>
        <div>
          <input
            type="file"
            className="file-input-fillipform"
            style={{ marginTop: "-50px" }}
            onChange={HandleAadharFileUpoad} // Call the function on file input change
          />
          <input
            type="text"
            id={`question${question.id}`}
            className="full-width-input-fillipform"
            style={{ width: "750px", marginLeft: "0px", marginTop: "10px" }}
            onChange={(e) =>
              HandleAadharCardNumber(question.id, e.target.value)
            }
            placeholder="Aadhar Card Number"
          />
        </div>
        <p style={{ marginTop: "50px" }}>PAN Card:</p>
        <div>
          <input
            type="file"
            className="file-input-fillipform"
            style={{ marginTop: "-50px" }}
            onChange={HandlePanFileUpoad} // Call the function on file input change
          />
          {question.options &&
            question.options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={option}
                id={`question${question.id}-${index}`}
                className="full-width-input-fillipform"
                style={{
                  width: "750px",
                  marginLeft: "2px",
                  marginBottom: "25px",
                }}
                value={formData[`${question.id}-${index}`] || ""} // Set the input value from formData
                onChange={(e) =>
                  handleAnswerInputChange(
                    `${question.id}-${index}`,
                    e.target.value
                  )
                } // Update the formData
              />
            ))}
          <p>Date Of Birth</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={handleDateChange} />
          </LocalizationProvider>
        </div>
      </div>
    );
  } else if (question.category === "file-resident-proof") {
    const menuItems = question.options
      ? question.options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))
      : [];
    return (
      <div>
        <div>
          <FormControl>
            <div
              style={{
                marginTop: "10px",
                marginLeft: "2px",
              }}
            >
              <Select
                sx={{
                  width: 250,
                  height: 50,
                }}
                displayEmpty
                value={selectedResidentialProof}
                onChange={HandleResidentialProof}
              >
                <MenuItem value="" disabled>
                  Select an option
                </MenuItem>
                {menuItems}
              </Select>
            </div>
          </FormControl>
        </div>
        <div>
          <input
            type="file"
            className="file-input-fillipform"
            style={{ marginTop: "50px", marginLeft: "0px" }}
            onChange={HandleResidentialProofFileUpload} // Call the function on file input change
          />
        </div>
        <div>
          <input
            type="text"
            id={`question${question.id}`}
            className="full-width-input-fillipform"
            style={{ width: "750px", marginLeft: "0px", marginTop: "50px" }}
            placeholder="Residential Proof Number"
            onChange={(e) =>
              HandleResidentialProofNumber(question.id, e.target.value)
            }
          />
        </div>
      </div>
    );
  } else if (question.category === "radio") {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby={`question${question.id}`}
          name={`question${question.id}`}
          style={{ marginTop: "-80px" }}
          value={formData[question.id] || ""} // Set the selected value
          onChange={(e) => handleAnswerInputChange(question.id, e.target.value)} // Update the formData
        >
          {question.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  } else if (question.category === "address") {
    return (
      <div>
        {question.options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={option}
            id={`question${question.id}-${index}`}
            className="full-width-input-fillipform"
            style={{ width: "750px", marginLeft: "2px", marginBottom: "25px" }}
            value={formData[`${question.id}-${index}`] || ""} // Set the input value from formData
            onChange={(e) =>
              handleAnswerInputChange(`${question.id}-${index}`, e.target.value)
            } // Update the formData
          />
        ))}
      </div>
    );
  } else if (question.category === "dropdown") {
    const menuItems = question.options
      ? question.options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))
      : [];

    return (
      <div>
        <FormControl>
          <div
            style={{
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <Select
              sx={{
                width: 250,
                height: 50,
              }}
              displayEmpty
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {menuItems}
            </Select>
          </div>
        </FormControl>

        {showTextbox && (
          <div>
            <input
              type="text"
              id={`question${question.id}`}
              className="full-width-input-fillipform"
              style={{ width: "750px", marginLeft: "10px", marginTop: "10px" }}
              placeholder="Please Specify"
            />
          </div>
        )}
      </div>
    );
  } else if (question.category === "dropdown-cash") {
    const menuItems = question.options.map((option, index) => (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    ));

    return (
      <div>
        <FormControl>
          <div
            style={{
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <Select
              sx={{
                width: 250,
                height: 50,
              }}
              displayEmpty
              value={selectedOptionOtherThanCash}
              onChange={HandleOtherThanCash}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {menuItems}
            </Select>
          </div>
        </FormControl>

        {showTextbox && (
          <div>
            <input
              type="text"
              id={`question${question.id}`}
              className="full-width-input-fillipform"
              style={{ width: "750px", marginLeft: "10px", marginTop: "10px" }}
              placeholder="Please Specify"
              value={formData[`Other-${question.id}`] || ""}
              onChange={(event) => otherContributionOfPartner(event, question)}
            />
          </div>
        )}
      </div>
    );
  } else if (question.category === "dropdown-number") {
    //storing number for years
    const years = [];
    for (let i = 0; i <= 100; i++) {
      years.push(i);
    }
    // Map over the years array to create MenuItem components
    const menuItems = years.map((year) => (
      <MenuItem key={year} value={year}>
        {year}
      </MenuItem>
    ));

    //storing number for months
    const months = [];
    for (let i = 1; i <= 11; i++) {
      months.push(i);
    }

    // Map over the months array to create MenuItem components
    const menuItems1 = months.map((months) => (
      <MenuItem key={months} value={months}>
        {months}
      </MenuItem>
    ));

    return (
      <div>
        <FormControl>
          <div
            style={{
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <p>Years</p>
            <Select
              sx={{
                width: 250,
                height: 50,
              }}
              displayEmpty
              value={selectedOptionYears}
              onChange={HandleYearChange}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {menuItems}
            </Select>
          </div>
        </FormControl>

        <FormControl>
          <div
            style={{
              marginTop: "10px",
              marginLeft: "50px",
            }}
          >
            <p>Months</p>
            <Select
              sx={{
                width: 250,
                height: 50,
              }}
              displayEmpty
              value={selectedOptionMonths}
              onChange={HandleMonthChange}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {menuItems1}
            </Select>
          </div>
        </FormControl>
      </div>
    );
  } else {
    return null;
  }
};

export default AnswerBox2;
