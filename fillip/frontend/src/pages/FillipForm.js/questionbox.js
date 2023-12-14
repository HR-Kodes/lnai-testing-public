import React from "react";
import InfoImg from "../../assets/img/info.jpg";

const QuestionBox = ({
  question,
  questionDescriptions,
  handleMouseOver,
  handleMouseOut,
  formData,
}) => {
  if (question.id == 2) {
    if (!formData[1] || formData[1] == "NO") return;
  }

  return (
    <div className="question-box">
      <label htmlFor={`question${question.id}`}>
        <strong>{question.label}</strong>
        {question.info !== "" && (
          <div className="description-box">
            <img
              src={InfoImg}
              alt="Info"
              style={{ width: "15px", height: "15px" }}
              onMouseOver={() => handleMouseOver(question.id, question.info)}
              onMouseOut={() => handleMouseOut(question.id)}
              className="more-info-icon"
            />
            {questionDescriptions[question.id] && (
              <div className="description-tooltip">
                {questionDescriptions[question.id]}
              </div>
            )}
          </div>
        )}
      </label>
    </div>
  );
};

export default QuestionBox;
