import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import fillipquestions from "./fillipquestion.json";
import QuestionBox from "./questionbox";
import AnswerBox from "./answerbox";
import axios from "axios";
import "./fillipform.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FinalCheck from "./finalcheck";
import AnswerBox2 from "./answerbox2";

const theme = createTheme({
  palette: {
    primary: {
      main: "#080B1A",
    },
    secondary: {
      main: "#080B1A",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "0.8rem auto 5rem",
      maxWidth: "60%",
    },
  },
}));

export default function FillipForm() {
  const classesfillip = useStyles();
  const [questionDescriptions, setQuestionDescriptions] = useState({});
  const [numberOfDesignatedPartners1, setNumberOfDesignatedPartners1] =
    useState(0);
  const [numberOfDesignatedPartners2, setNumberOfDesignatedPartners2] =
    useState(0);
  const [totalNumberOfPartners, setTotalNumberOfPartners] = useState(0);
  const [maxValueMessage, setMaxValueMessage] = useState("");
  const [minValueMessage, setMinValueMessage] = useState("");
  const [NumericValueMessage, setNumericValueMessage] = useState("");
  const [NumericValueMessage2, setNumericValueMessage2] = useState("");
  const [maxValueMessage2, setMaxValueMessage2] = useState("");
  const [minValueMessage2, setMinValueMessage2] = useState("");
  const [formData, setFormData] = useState({});

  const handleMouseOver = (questionId, info) => {
    setQuestionDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [questionId]: info,
    }));
  };

  const handleMouseOut = (questionId) => {
    setQuestionDescriptions((prevDescriptions) => {
      const updatedDescriptions = { ...prevDescriptions };
      delete updatedDescriptions[questionId];
      return updatedDescriptions;
    });
  };

  const handleChangeInput1 = (newValue) => {
    if (newValue === "") {
      setNumberOfDesignatedPartners1(newValue); // Empty input
      setMinValueMessage("");
      setMaxValueMessage("");
      setNumericValueMessage("");
      // Set the data in formData
      setFormData((prevData) => ({
        ...prevData,
        numberOfDesignatedPartners1: newValue,
      }));
    } else if (/^\d+$/.test(newValue)) {
      // Valid numeric input
      const numericValue = parseInt(newValue);
      if (numericValue >= 1 && numericValue <= 10) {
        setNumberOfDesignatedPartners1(numericValue);
        setMinValueMessage("");
        setMaxValueMessage("");
        setNumericValueMessage("");
        // Set the data in formData
        setFormData((prevData) => ({
          ...prevData,
          Number_of_Designated_partners: numericValue,
        }));
      } else if (numericValue < 1) {
        setMinValueMessage("Minimum acceptable value is 1");
        setMaxValueMessage("");
        setNumericValueMessage("");
      } else if (numericValue > 10) {
        setMaxValueMessage("Maximum acceptable value is 10");
        setMinValueMessage("");
        setNumericValueMessage("");
      }
    } else {
      setNumericValueMessage("Only numeric values acceptable");
      setMinValueMessage("");
      setMaxValueMessage("");
    }
  };

  const handleInputChange2 = (e) => {
    const newValue = e.target.value;

    if (/^\d*$/.test(newValue)) {
      const numericValue = parseInt(newValue);

      if (numericValue >= 0 && numericValue <= 10) {
        setNumberOfDesignatedPartners2(numericValue);
        setMinValueMessage2("");
        setMaxValueMessage2("");
        setNumericValueMessage2(""); // Clear numeric value error message
        // Set the data in formData
        setFormData((prevData) => ({
          ...prevData,
          Number_of_partners_other_than_designated_partners: numericValue,
        }));
      } else if (numericValue > 10) {
        setNumberOfDesignatedPartners2("10");
        setMaxValueMessage2("Maximum acceptable value is 10");
        setMinValueMessage2("");
        setNumericValueMessage2(""); // Clear numeric value error message
      } else {
        setNumberOfDesignatedPartners2("");
        setMinValueMessage2("");
        setMaxValueMessage2("");
        setNumericValueMessage2("Value should be between 0 and 10"); // Set non-numeric error message here
      }
    } else {
      setNumericValueMessage2("Only numeric values acceptable");
      setMinValueMessage2("");
      setMaxValueMessage2("");
      setNumberOfDesignatedPartners2("");
    }
  };

  const handleAnswerInputChange = async (
    questionId,
    answer,
    [event = null, mainQuestionId, subQuestionId] = []
  ) => {
    let locationDetails;

    if (event?.target?.placeholder === "Pincode") {
      if (answer.length === 6) {
        console.log(answer);
        const response = await axios.get(
          `http://127.0.0.1:8000/documentation/pincode/${answer}/`
        );
        if (response?.data) {
          locationDetails = response.data;

          setFormData((prevData) => ({
            ...prevData,
            [questionId]: answer,
            [`${mainQuestionId}-${subQuestionId + 1}-${1}`]:
              locationDetails?.["area"],
            [`${mainQuestionId}-${subQuestionId + 2}`]:
              locationDetails?.["city"],
            [`${mainQuestionId}-${subQuestionId + 3}`]:
              locationDetails?.["district"],
            [`${mainQuestionId}-${subQuestionId + 4}`]:
              locationDetails?.["state"],
            [`${mainQuestionId}-${subQuestionId + 5}`]:
              locationDetails?.["country"],
          }));
        }
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: answer,
    }));
  };

  console.log(formData);

  // const handleAnswerInputChange = (questionId, answer) => {
  //     setFormData((prevData) => ({
  //         ...prevData,
  //         [questionId]: Array.isArray(answer) ? [...answer] : [answer],
  //     }));
  // };
  // Calculate and update total number of partners whenever designated partner counts change
  useEffect(() => {
    const totalPartners =
      parseInt(numberOfDesignatedPartners1) +
      parseInt(numberOfDesignatedPartners2);
    setTotalNumberOfPartners(totalPartners);

    // Update formData with the total number of partners
    setFormData((prevData) => ({
      ...prevData,
      total_Number_Of_Partners: totalPartners,
    }));
  }, [numberOfDesignatedPartners1, numberOfDesignatedPartners2]);

  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Header />
        <div className="App-fillip-main-div">
          <h1 className="heading-fillip-form">Welcome to LegalNiti AI</h1>
          <p className="fillip-heading2">
            We're excited to help you incorporate your company with ease!
          </p>

          <form className={classesfillip.root} autoComplete="off">
            {fillipquestions.slice(0, 6).map((question) => (
              <Fragment key={question.id}>
                <QuestionBox
                  question={question}
                  questionDescriptions={questionDescriptions}
                  handleMouseOver={handleMouseOver}
                  handleMouseOut={handleMouseOut}
                  formData={formData}
                />
                <AnswerBox
                  question={question}
                  formData={formData}
                  handleAnswerInputChange={handleAnswerInputChange}
                  setFormData={setFormData}
                />
              </Fragment>
            ))}
          </form>

          <div className="div-extra-fillip-question-1">
            <div className="extra-fillip-question-1">
              <strong> Number of Designated partners</strong>
            </div>
            <input
              type="text"
              className="full-width-input-fillipform"
              style={{ width: "500px", marginLeft: "300px", marginTop: "30px" }}
              placeholder="1"
              value={numberOfDesignatedPartners1}
              onChange={(e) => handleChangeInput1(e.target.value)}
            />
            <p style={{ color: "red", marginLeft: "300px" }}>
              {minValueMessage}
            </p>
            <p style={{ color: "red", marginLeft: "300px" }}>
              {maxValueMessage}
            </p>
            <p style={{ color: "red", marginLeft: "300px" }}>
              {NumericValueMessage}
            </p>
          </div>
          <br></br>
          <br></br>

          <div className="div-extra-fillip-question-2">
            <div
              className="extra-fillip-question-2"
              style={{ marginLeft: "300px" }}
            >
              <strong>
                {" "}
                Number of partners other than designated partners
              </strong>
            </div>
            <input
              type="text"
              className="full-width-input-fillipform"
              style={{ width: "500px", marginLeft: "300px", marginTop: "30px" }}
              value={numberOfDesignatedPartners2}
              onChange={handleInputChange2}
            />
            <p style={{ color: "red", marginLeft: "300px" }}>
              {minValueMessage2}
            </p>
            <p style={{ color: "red", marginLeft: "300px" }}>
              {maxValueMessage2}
            </p>
            <p style={{ color: "red", marginLeft: "300px" }}>
              {NumericValueMessage2}
            </p>
          </div>
          <br></br>
          <br></br>

          <div className="div-extra-fillip-question-3">
            <div
              className="extra-fillip-question-3"
              style={{ marginLeft: "300px" }}
            >
              <strong> Total number of partners</strong>
            </div>
            <input
              type="text"
              className="full-width-input-fillipform"
              style={{ width: "500px", marginLeft: "300px", marginTop: "30px" }}
              value={totalNumberOfPartners}
              disabled
            />
          </div>
          <br></br>
          <br></br>

          {numberOfDesignatedPartners1 > 0 &&
            fillipquestions.slice(9, 10).map((question) => (
              <form
                className={classesfillip.root}
                autoComplete="off"
                key={question.id}
              >
                <QuestionBox
                  question={question}
                  questionDescriptions={questionDescriptions}
                  handleMouseOver={handleMouseOver}
                  handleMouseOut={handleMouseOut}
                />
                <AnswerBox
                  question={question}
                  formData={formData}
                  handleAnswerInputChange={handleAnswerInputChange}
                  setFormData={setFormData}
                />
              </form>
            ))}
          {numberOfDesignatedPartners2 > 0 &&
            fillipquestions.slice(10, 11).map((question) => (
              <form
                className={classesfillip.root}
                autoComplete="off"
                key={question.id}
              >
                <QuestionBox
                  question={question}
                  questionDescriptions={questionDescriptions}
                  handleMouseOver={handleMouseOver}
                  handleMouseOut={handleMouseOut}
                />
                <AnswerBox
                  question={question}
                  formData={formData}
                  handleAnswerInputChange={handleAnswerInputChange}
                  setFormData={setFormData}
                />
              </form>
            ))}
        </div>
        <div style={{ marginLeft: "300px" }}>
          {fillipquestions.slice(111, 113).map((question, mapIndex) => (
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
              <br></br>
              <br></br>
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
        </div>

        <div>
          <FinalCheck formData={formData} />
        </div>
        <Footer />
      </Fragment>
    </ThemeProvider>
  );
}
