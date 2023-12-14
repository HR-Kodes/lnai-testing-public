import React, { Fragment, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem,
  Select,
} from "@material-ui/core";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./fillipform.css";
import FillipTable from "./filliptable";
import TableInput from "./tableinput";
import fillipquestions from "./fillipquestion.json";
import AnswerBox2 from "./answerbox2";
import QuestionBox from "./questionbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AnswerBox = ({
  question,
  questionDescriptions,
  handleMouseOut,
  handleMouseOver,
  formData,
  handleAnswerInputChange,
  setFormData,
}) => {
  //this use-state for selection option in dropdown-1
  const [selectedOption, setSelectedOption] = useState("");

  //this use-state for array elements
  const [selectedOptionsArray, setSelectedOptionsArray] = useState([]);

  //this use-state for the red alert message
  const [duplicateMessage, setDuplicateMessage] = useState("");

  //this use-state for showing table condition
  const [showTable, setShowTable] = useState(false);

  // Clone the updatedOptionsArray into another state variable
  const [copyUpdatedArray, setCopyUpdatedArray] = useState([]);

  // Declare the showTextOption state variable
  const [selectedOptionDropdown, setSelectedOptionDropdown] = useState("");

  //this for clicking the add button and adding elements into the array i.e UpdatedOptionsArray
  const handleAddClick = () => {
    if (
      selectedOption &&
      !selectedOptionsArray.some((item) => item.option === selectedOption)
    ) {
      const updatedOptionsArray = [
        ...selectedOptionsArray,
        { option: selectedOption, number: "" },
      ];

      setSelectedOptionsArray(updatedOptionsArray);
      setShowTable(true);
      setDuplicateMessage("");
    } else if (selectedOptionsArray.length === 0) {
      setDuplicateMessage("Please select an option to add.");
    } else {
      setDuplicateMessage("Option is already selected.");
    }
  };

  //this is for selecting option in dropdown
  const handleOptionDropdownChange = (event) => {
    setSelectedOptionDropdown(event.target.value, () => {
      console.log(selectedOptionDropdown);
    });
  };

  //handleChange for Handling the option selected in dropdown-1
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log(selectedValue);
  };

  //this is for removing the row from the table when clicking the delete icon
  const handleRemoveRow = (indexToRemove) => {
    const updatedOptionsArray = selectedOptionsArray.filter(
      (_, index) => index !== indexToRemove
    );

    // Update the state for both arrays
    setSelectedOptionsArray(updatedOptionsArray);
    console.log(
      "Updated Options Array after removing element is: ",
      updatedOptionsArray
    );
    if (updatedOptionsArray.length === 0) {
      setShowTable(false);
    }

    // Clone the array using JSON stringification and parsing
    const copyUpdatedArray = JSON.parse(JSON.stringify(updatedOptionsArray));
    setCopyUpdatedArray(copyUpdatedArray);
  };

  //this is for handling the number change i.e input numbers in the table and storing the values in an array UpdatedOptionsArray
  const handleNumberChange = (index, newValue) => {
    const updatedOptionsArray = [...selectedOptionsArray];

    let updatedFormData = {
      ...formData,
      selected_no_of_partners: formData["selected_no_of_partners"]
        ? formData["selected_no_of_partners"] - newValue
        : formData["total_Number_Of_Partners"] - newValue,
    };

    //checking if the index is within the boundary before updating it
    if (
      index >= 0 &&
      index < updatedOptionsArray.length &&
      updatedFormData["selected_no_of_partners"] >= 0
    ) {
      updatedOptionsArray[index].number = newValue;
      setSelectedOptionsArray(updatedOptionsArray);
      setFormData(updatedFormData);
    }

    // Clone the array using JSON stringification and parsing
    const copyUpdatedArray = JSON.parse(JSON.stringify(updatedOptionsArray));
    setCopyUpdatedArray(copyUpdatedArray);
  };

  // This is for file changes that will be used for updating the formData that is sent to the backend
  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const updatedFormData = { ...formData, [question.id]: file.name }; //storing the filename in the formData
  //     handleAnswerInputChange(question.id, file.name); // using the handleAnswerInputChange function with the filename
  //     setFormData(updatedFormData); // updating the formData using the setFormData
  //   }
  // };
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Obtain the pre-signed URL from your backend
        const response = await generatePresignedUrl(file.name); // Replace with your API request
  
        if (response.ok) {
          const { preSignedUrl } = await response.json();
  
          // Upload the file directly to S3 using the pre-signed URL
          const s3Response = await fetch(preSignedUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          });
  
          if (s3Response.ok) {
            // The file has been successfully uploaded to S3
  
            // Now, update your formData and call handleAnswerInputChange
            const updatedFormData = { ...formData, [question.id]: file.name };
            handleAnswerInputChange(question.id, file.name);
            setFormData(updatedFormData);
            
            console.log('File uploaded to S3 successfully.');
          } else {
            console.error('Error uploading file to S3:', s3Response.statusText);
          }
        } else {
          console.error('Error obtaining pre-signed URL:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  //Answer-boxes start depending on the question categories
  if (question.category === "text") {
    if (question.id == 2) {
      if (!formData[1] || formData[1] == "NO") return;
    }
    return (
      <input
        type={question.category === "text" ? "text" : "number"}
        id={`question${question.id}`}
        className="full-width-input-fillipform"
        style={{ width: "750px", marginLeft: "305px", marginTop: "-200px" }}
        value={formData[question.id] || ""}
        onChange={(e) => handleAnswerInputChange(question.id, e.target.value)}
      />
    );
  } else if (question.category === "number") {
    return (
      <div>
        <TableInput onChange={handleNumberChange} />
      </div>
    );
  } else if (question.category === "file") {
    return (
      <div>
        <input
          type="file"
          className="file-input-fillipform"
          style={{ marginTop: "-200px" }}
          onChange={handleFileInputChange} // Call the function on file input change
        />
      </div>
    );
  } else if (question.category === "radio") {
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby={`question${question.id}`}
          name={`question${question.id}`}
          style={{ marginTop: "-80px", marginLeft: "310px" }}
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
          <>
            {option !== "Area" ? (
              <input
                disabled={
                  ["City", "District", "State", "Country"].includes(option)
                    ? true
                    : false
                }
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
                    e.target.value,
                    [e, question.id, index]
                  )
                } // Update the formData
              />
            ) : (
              <>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={formData[`${question.id}-${index}`]}
                  onChange={(e) => {
                    console.log(e.target.value);
                    handleAnswerInputChange(
                      `${question.id}-${index}`,
                      e.target.value
                    );
                  }}
                  input={
                    <OutlinedInput
                      label="Area"
                      value={formData[`${question.id}-${index}`]}
                    />
                  }
                  MenuProps={MenuProps}
                >
                  {/* {console.log(formData[`${question.id}-${index}`])} */}
                  {formData?.[`${question.id}-${index}-${1}`]?.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      //   style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          </>
        ))}
      </div>
    );
  } else if (question.category === "dropdown") {
    const menuItems = question.options.map((option, index) => (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    ));

    return (
      <div>
        <FormControl>
          <div style={{ marginTop: "-50px", marginLeft: "10px" }}>
            <Select
              sx={{
                width: 250,
                height: 50,
              }}
              displayEmpty
              value={selectedOptionDropdown} // Set the value prop to the state
              onChange={handleOptionDropdownChange}
            >
              <MenuItem value="" disabled>
                Select an option
              </MenuItem>
              {menuItems}
            </Select>
          </div>
        </FormControl>

        {selectedOptionDropdown === "Others" && (
          <div>
            <p>If Others, please specify:</p>
            <input
              type="text"
              id={`question${question.id}`}
              className="full-width-input-fillipform"
              style={{
                width: "750px",
                marginLeft: "305px",
                marginTop: "-200px",
              }}
              value={selectedOptionDropdown}
              //  onChange={handleInputChange}
            />
          </div>
        )}
      </div>
    );
  } else if (question.category === "dropdown-1") {
    const menuItems = question.options.map((option, index) => (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    ));

    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <FormControl>
              <div
                style={{
                  marginTop: "-50px",
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
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {menuItems}
                </Select>
              </div>
            </FormControl>
          </div>
          <div style={{ marginTop: "-72px" }}>
            <button
              className="fillip-submit-button"
              style={{
                marginTop: "-55px",
                marginLeft: "30px",
              }}
              type="button"
              onClick={handleAddClick}
            >
              Add
            </button>
          </div>
        </div>
        <div>
          {duplicateMessage && (
            <p style={{ color: "red" }}>{duplicateMessage}</p>
          )}
          {showTable &&
            selectedOptionsArray &&
            selectedOptionsArray.length > 0 && (
              <FillipTable
                selectedOptionsArray={selectedOptionsArray}
                onRemoveRow={handleRemoveRow}
                handleNumberChange={handleNumberChange}
                setFormData={setFormData}
              />
            )}

          {copyUpdatedArray.map((arrayItem, index) => {
            if (
              arrayItem.option === "Number of Individuals Having valid DIN/DPIN"
            ) {
              const start_index = 113;
              const end_index = 116 + (parseInt(arrayItem.number) - 1) * 3;

              return (
                <form autoComplete="off" key={index}>
                  <br></br>
                  <p>Number of Individuals Having valid DIN/DPIN</p>
                  {fillipquestions
                    .slice(start_index, end_index)
                    .map((question, mapIndex) => (
                      <Fragment key={mapIndex}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <QuestionBox
                          question={question}
                          questionDescriptions={questionDescriptions}
                          handleMouseOver={handleMouseOver}
                          handleMouseOut={handleMouseOut}
                        />
                        <br></br>
                        <AnswerBox2
                          question={question}
                          formData={formData}
                          handleAnswerInputChange={handleAnswerInputChange}
                          setFormData={setFormData}
                        />
                        <br></br>
                        <br></br>
                      </Fragment>
                    ))}
                </form>
              );
            } else {
              return null;
            }
          })}

          {copyUpdatedArray.map((arrayItem, index) => {
            if (
              arrayItem.option ===
              "Number of Individuals not having valid DIN/DPIN"
            ) {
              const start_index = 11;
              const end_index = (parseInt(arrayItem.number) + 1) * 10 + 1;

              return (
                <form autoComplete="off" key={index}>
                  <br></br>
                  <p>Number of Individuals not Having valid DIN/DPIN</p>
                  {fillipquestions
                    .slice(start_index, end_index)
                    .map((question, mapIndex) => (
                      <Fragment key={mapIndex}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <QuestionBox
                          question={question}
                          questionDescriptions={questionDescriptions}
                          handleMouseOver={handleMouseOver}
                          handleMouseOut={handleMouseOut}
                        />
                        <br></br>
                        <AnswerBox2
                          question={question}
                          formData={formData}
                          handleAnswerInputChange={handleAnswerInputChange}
                          setFormData={setFormData}
                        />
                        <br></br>
                        <br></br>
                      </Fragment>
                    ))}
                </form>
              );
            } else {
              return null;
            }
          })}

          {copyUpdatedArray.map((arrayItem, index) => {
            if (
              arrayItem.option ===
              "Number of Body corporates and their nominees Having valid DIN/DPIN"
            ) {
              const start_index = 143;
              const end_index = parseInt(arrayItem.number) * 9 + 143;

              return (
                <form autoComplete="off" key={index}>
                  <br></br>
                  <p>
                    Number of Body corporates and their nominees Having valid
                    DIN/DPIN
                  </p>
                  {fillipquestions
                    .slice(start_index, end_index)
                    .map((question, mapIndex) => (
                      <Fragment key={mapIndex}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <QuestionBox
                          question={question}
                          questionDescriptions={questionDescriptions}
                          handleMouseOver={handleMouseOver}
                          handleMouseOut={handleMouseOut}
                        />
                        <br></br>
                        <AnswerBox2
                          question={question}
                          formData={formData}
                          handleAnswerInputChange={handleAnswerInputChange}
                          setFormData={setFormData}
                        />
                        <br></br>
                        <br></br>
                      </Fragment>
                    ))}
                </form>
              );
            } else {
              return null;
            }
          })}

          {copyUpdatedArray.map((arrayItem, index) => {
            if (
              arrayItem.option ===
              "Number of Body corporates and their nominess not Having valid DIN/DPIN"
            ) {
              const start_index = 233;
              const end_index = 233 + parseInt(arrayItem.number) * 12;

              return (
                <form autoComplete="off" key={index}>
                  <br></br>
                  <p>
                    Number of Body corporates and their nominees not Having
                    valid DIN/DPIN
                  </p>
                  {fillipquestions
                    .slice(start_index, end_index)
                    .map((question, mapIndex) => (
                      <Fragment key={mapIndex}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <QuestionBox
                          question={question}
                          questionDescriptions={questionDescriptions}
                          handleMouseOver={handleMouseOver}
                          handleMouseOut={handleMouseOut}
                        />
                        <br></br>
                        <AnswerBox2
                          question={question}
                          formData={formData}
                          handleAnswerInputChange={handleAnswerInputChange}
                          setFormData={setFormData}
                        />
                        <br></br>
                        <br></br>
                      </Fragment>
                    ))}
                </form>
              );
            } else {
              return null;
            }
          })}

          {copyUpdatedArray.map((arrayItem, index) => {
            if (
              arrayItem.option ===
              "Number of other Individuals Having valid DIN/DPIN"
            ) {
              const start_index = 455;
              const end_index = 458 + (parseInt(arrayItem.number) - 1) * 3;

              return (
                <form autoComplete="off" key={index}>
                  <br></br>
                  <p>Number of other Individuals Having valid DIN/DPIN</p>
                  {fillipquestions
                    .slice(start_index, end_index)
                    .map((question, mapIndex) => (
                      <Fragment key={mapIndex}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <QuestionBox
                          question={question}
                          questionDescriptions={questionDescriptions}
                          handleMouseOver={handleMouseOver}
                          handleMouseOut={handleMouseOut}
                        />
                        <br></br>
                        <AnswerBox2
                          question={question}
                          formData={formData}
                          handleAnswerInputChange={handleAnswerInputChange}
                          setFormData={setFormData}
                        />
                        <br></br>
                        <br></br>
                      </Fragment>
                    ))}
                </form>
              );
            } else {
              return null;
            }
          })}

          {copyUpdatedArray.map((arrayItem, index) => {
            if (
              arrayItem.option ===
              "Number of other Individuals not having valid DIN/DPIN"
            ) {
              const start_index = 353;
              const end_index = start_index + parseInt(arrayItem.number) * 10;

              return (
                <form autoComplete="off" key={index}>
                  <br></br>
                  <p>Number of other Individuals not having valid DIN/DPIN</p>
                  {fillipquestions
                    .slice(start_index, end_index)
                    .map((question, mapIndex) => (
                      <Fragment key={mapIndex}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <QuestionBox
                          question={question}
                          questionDescriptions={questionDescriptions}
                          handleMouseOver={handleMouseOver}
                          handleMouseOut={handleMouseOut}
                        />
                        <br></br>
                        <AnswerBox2
                          question={question}
                          formData={formData}
                          handleAnswerInputChange={handleAnswerInputChange}
                          setFormData={setFormData}
                        />
                        <br></br>
                        <br></br>
                      </Fragment>
                    ))}
                </form>
              );
            } else {
              return null;
            }
          })}

          {copyUpdatedArray.map((arrayItem, index) => {
            if (
              arrayItem.option ===
              "Number of other Body corporates and their nominees Having valid DIN/DPIN"
            ) {
              const start_index = 485;
              const end_index = parseInt(arrayItem.number) * 9 + 485;

              return (
                <form autoComplete="off" key={index}>
                  <br></br>
                  <p>
                    Number of other Body corporates and their nominees Having
                    valid DIN/DPINN
                  </p>
                  {fillipquestions
                    .slice(start_index, end_index)
                    .map((question, mapIndex) => (
                      <Fragment key={mapIndex}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <QuestionBox
                          question={question}
                          questionDescriptions={questionDescriptions}
                          handleMouseOver={handleMouseOver}
                          handleMouseOut={handleMouseOut}
                        />
                        <br></br>
                        <AnswerBox2
                          question={question}
                          formData={formData}
                          handleAnswerInputChange={handleAnswerInputChange}
                          setFormData={setFormData}
                        />
                        <br></br>
                        <br></br>
                      </Fragment>
                    ))}
                </form>
              );
            } else {
              return null;
            }
          })}

          {copyUpdatedArray.map((arrayItem, index) => {
            if (
              arrayItem.option ===
              "Number of other Body corporates and their nominess not Having valid DIN/DPIN"
            ) {
              const start_index = 575;
              const end_index = 575 + parseInt(arrayItem.number) * 12;

              return (
                <form autoComplete="off" key={index}>
                  <br></br>
                  <p>
                    "Number of other Body corporates and their nominess not
                    Having valid DIN/DPIN
                  </p>
                  {fillipquestions
                    .slice(start_index, end_index)
                    .map((question, mapIndex) => (
                      <Fragment key={mapIndex}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <QuestionBox
                          question={question}
                          questionDescriptions={questionDescriptions}
                          handleMouseOver={handleMouseOver}
                          handleMouseOut={handleMouseOut}
                        />
                        <br></br>
                        <AnswerBox2
                          question={question}
                          formData={formData}
                          handleAnswerInputChange={handleAnswerInputChange}
                          setFormData={setFormData}
                        />
                        <br></br>
                        <br></br>
                      </Fragment>
                    ))}
                </form>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default AnswerBox;
