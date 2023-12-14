import React, { useState, useEffect,Fragment } from "react";
// import "./style.css"
import "./rp.css";
import Header from "../components/Header";
// import Fragment from "../Fragment/Fragment"

const Retirementcalculator = () => {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [monthlySavings, setMonthlySavings] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [retirementSavings, setRetirementSavings] = useState("");

  useEffect(() => {
    const calculateRetirementSavings = () => {
      const yearsToRetirement = retirementAge - currentAge;
      const monthlyInterestRate = interestRate / 100 / 12;
      const totalMonths = yearsToRetirement * 12;
      const calculatedRetirementSavings = Math.ceil(
        (monthlySavings * ((1 + monthlyInterestRate) ** totalMonths - 1)) /
          monthlyInterestRate
      );
      setRetirementSavings(calculatedRetirementSavings);
    };

    calculateRetirementSavings();
  }, [currentAge, retirementAge, monthlySavings, interestRate]);

  const handleCurrentAgeChange = (e) => {
    setCurrentAge(e.target.value);
  };

  const handleRetirementAgeChange = (e) => {
    setRetirementAge(e.target.value);
  };

  const handleMonthlySavingsChange = (e) => {
    setMonthlySavings(e.target.value);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
  };
  return (
    <Fragment>
      <Header/>
      <section className="rp-box">
      <h4 className="rp-heading">
              Online Retirement Planning Calculator
            </h4>
        <div className="rp-container">
          <div className="left-side">
            
            <p className="para2"></p>
            <div className="given-input">
              <label htmlFor="Currentage">Current Age</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={currentAge}
                  onChange={handleCurrentAgeChange}
                />
                <p className="year-symbol">yr</p>
              </div>
            </div>
            <div className="given-input">
              <label htmlFor="retirementage">Retirement Age</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={retirementAge}
                  onChange={handleRetirementAgeChange}
                />
                <p className="year-symbol">yr</p>
              </div>
            </div>
            <div className="given-input">
              <label htmlFor="saving">Monthly Savings</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={monthlySavings}
                  onChange={handleMonthlySavingsChange}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>
            <div className="given-input">
              <label htmlFor="interstrate">Interest Rate</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                />
                <p className="percentage-symbol">%</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="right-container">
              <div className="selling-cost">
                <p>Retirement Savings</p>
                <p>{retirementSavings}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Retirementcalculator;
