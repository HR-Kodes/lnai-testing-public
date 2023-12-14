import React, { useState, useEffect, Fragment } from "react";
import Header from "../components/Header";
import "./si.css";
// import Fragment from "../Fragment/Fragment"

const Simpleinterstcalcularor = () => {
  const [principleAmount, setPrincipleAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [time, setTime] = useState(0);
  const [calculationType, setCalculationType] = useState("simple");
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculateInterest = () => {
      let interest;
      let total;
      if (calculationType === "simple") {
        interest = (principleAmount * interestRate * time) / 100;
        total = principleAmount + interest;
      } else {
        interest =
          principleAmount * Math.pow(1 + interestRate / 100, time) -
          principleAmount;
        total = principleAmount + interest;
      }
      setTotalInterest(interest);
      setTotalAmount(total);
    };

    calculateInterest();
  }, [principleAmount, interestRate, time, calculationType]);

  const handlePrincipleAmountChange = (e) => {
    setPrincipleAmount(parseFloat(e.target.value));
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(parseFloat(e.target.value));
  };

  const handleTimeChange = (e) => {
    setTime(parseFloat(e.target.value));
  };

  const handleCalculationTypeChange = (e) => {
    setCalculationType(e.target.value);
  };

  return (
    <Fragment>
      <Header />
      <section className="si-box">
        <div className="si-container">
          <div className="left-side">
            <h4 className="si-heading">
              Easy Online Compound Interest Calculator!
            </h4>
            <p className="para1">
              Find out how much money you can save for your future!
            </p>
            <p className="para1">
              Calculate complex compound interest in seconds using the easy
              compound interest calculator from Vakilsearch.
            </p>
            <div className="radio-buttons">
              <input
                className="radio1"
                type="radio"
                name="calculation"
                value="simple"
                defaultChecked={calculationType === "simple"}
                onChange={handleCalculationTypeChange}
              />

              <label className="label" htmlFor="inclusive">
                Simple Interest
              </label>
              <input
                className="radio2"
                type="radio"
                name="calculation"
                value="compound"
                defaultChecked={calculationType === "compound"}
                onChange={handleCalculationTypeChange}
              />
              <label className="label" htmlFor="inclusive">
                Compound Interest
              </label>
            </div>

            <div className="given-input">
              <label htmlFor="cost-input">Cost of Goods/Services</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  onChange={handlePrincipleAmountChange}
                  value={principleAmount}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="cost-input">Rate of Interst</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  onChange={handleInterestRateChange}
                  value={interestRate}
                />
                <p className="percentage-symbol">%</p>
              </div>
            </div>
            <div className="given-input">
              <label htmlFor="cost-input">Time Period</label>
              <div className="user-input-rs">
                <input type="number" onChange={handleTimeChange} value={time} />
              </div>
            </div>
          </div>

          <div className="right-side">
            <div className="right-container">
              <div className="selling-cost">
                <p>Total Interest</p>
                <p>{totalInterest}</p>
              </div>
              <div className="total-si">
                <p>Total Amount</p>
                <p> {totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Simpleinterstcalcularor;
