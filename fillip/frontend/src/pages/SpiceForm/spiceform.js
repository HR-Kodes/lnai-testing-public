import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import questionsData from "./questionsData.json";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InfoImg from "../../assets/img/info.jpg";
import "./spiceform.css";
import axios from 'axios';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#080B1A',
    },
    secondary: {
      main: '#080B1A',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "8rem auto 5rem",
      maxWidth: "60%",
    },
  },
}));

export default function Form() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [questionDescriptions, setQuestionDescriptions] = useState({});
  const questionsPerPage = 10;

  const totalPages = Math.ceil(questionsData.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questionsData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const submit = async (event) => {
    event.preventDefault();

    const formData = {};
    const inputs = document.querySelectorAll(
      'input[type="text"], input[type="file"], input[type="radio"]:checked'
    );

    inputs.forEach((element) => {
      if (element.type === 'radio') {
        formData[element.name] = element.value;
      } else {
        formData[element.id] = [element.value];
      }
    });

    try {
      const response = await axios.post('/spiceform/submit', formData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Header />
        <div className="App">
          <h1 className="heading-spice-form">Fill the Spice-Form</h1>
          <form className={classes.root} autoComplete="off">
            {currentQuestions.map((question, index) => (
              <div
                className="col-md-6 offset-md-3 question-text"
                key={startIndex + index}
              >
                <div className="question-box">
                  <label htmlFor={`question${startIndex + index + 1}`}>
                    <strong>
                      {question.id}. {question.label}
                    </strong>
                    {question.info !== "" && (
                      <div className="description-box">
                        <img
                          src={InfoImg}
                          alt="Info"
                          style={{ width: '15px', height: '15px' }}
                          onMouseOver={() => handleMouseOver(question.id, question.info)}
                          onMouseOut={() => handleMouseOut(question.id)}
                          className="more-info-icon"
                        />
                        {questionDescriptions[question.id] && (
                          <div className="description-tooltip">{questionDescriptions[question.id]}</div>
                        )}
                      </div>
                    )}
                  </label>
                </div>
                <div className="answer-box">
                  {["4", "17", "18", "19", "20", "29", "30", "31", "32", "35"].includes(question.id.toString()) ? (
                    <input type="file" className="file-input" />
                  ) : ["10", "11", "22", "23", "33", "38", "39"].includes(question.id.toString()) ? (
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  ) : ["5"].includes(question.id.toString()) ? (
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="Owned" control={<Radio />} label="Owned" />
                        <FormControlLabel value="Rented" control={<Radio />} label="Rented" />
                        <FormControlLabel value="Held By Consent" control={<Radio />} label="Held By Consent" />
                      </RadioGroup>
                    </FormControl>
                  ) : ["16", "28"].includes(question.id.toString()) ? (
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel value="Indian" control={<Radio />} label="Indian" />
                        <FormControlLabel value="NRI" control={<Radio />} label="NRI" />
                        <FormControlLabel value="PIO" control={<Radio />} label="PIO" />
                        <FormControlLabel value="Foreign Citizen" control={<Radio />} label="Foreign Citizen" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <input
                      type="text"
                      id={`question${startIndex + index + 1}`}
                      className="full-width-input"
                      style={{ width: "800px" }}
                    />
                  )}
                </div>
              </div>
            ))}
          </form>
          {currentPage === 1 && (
            <div className="button-container" style={{ marginTop: "2rem" }}>
              <button onClick={handleNextPage} className="spice-button">
                Next
              </button>
            </div>
          )}
          {currentPage === totalPages && (
            <div className="button-container" style={{ marginTop: "2rem" }}>
              <button onClick={handlePreviousPage} className="spice-button">
                Previous
              </button>
              <button onClick={submit} className="spice-button">
                Submit
              </button>
            </div>
          )}
          {currentPage !== 1 && currentPage !== totalPages && (
            <div className="button-container" style={{ marginTop: "2rem" }}>
              <button onClick={handlePreviousPage} className="spice-button">
                Previous
              </button>
              <button onClick={handleNextPage} className="spice-button">
                Next
              </button>
            </div>
          )}
        </div>
        <Footer />
      </Fragment>
    </ThemeProvider>
  );
}
