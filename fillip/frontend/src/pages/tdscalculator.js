import React, { useState, Fragment } from "react";
// import "./style.css"
import "./tds.css";
import Header from "../components/Header";
// import Fragment from "../Fragment/Fragment"

const Tdscalculator = () => {
  const [income, setIncome] = useState(0);
  const [tdsRate, setTdsRate] = useState(10);
  const [tdsAmount, setTdsAmount] = useState(0);

  const handleIncomeChange = (event) => {
    setIncome(parseFloat(event.target.value));
  };

  const handleTdsRateChange = (event) => {
    setTdsRate(parseFloat(event.target.value));
  };

  const calculateTdsAmount = () => {
    const amount = (income * tdsRate) / 100;
    setTdsAmount(amount);
  };
  return (
    <Fragment>
      <Header />
      <section className="tds-box">
      <h4 className="tds-heading">TDS Calculator</h4>
        <div className="tds-container">
          <div className="left-side">
           
            <p className="para1">
              Can't figure out how to calculate your taxes?
            </p>
            <p className="para2">
              You don't need to worry. We are here to help.
            </p>

            <div className="given-input">
              <label htmlFor="income">Income</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={income}
                  onChange={handleIncomeChange}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="tds">TDS Rate</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={tdsRate}
                  onChange={handleTdsRateChange}
                />
                <p className="percentage-symbol">%</p>
              </div>
            </div>
            <button className="tds-button" onClick={calculateTdsAmount}>
              Calculate TDS Amount
            </button>
          </div>
          <div className="right-side">
            <div className="right-container">
              <div className="selling-cost">
                <p>TDS Amount</p>
                <p>₹ {tdsAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Tdscalculator;
