import React, { useState, Fragment } from "react";
// import "./style.css"
import "./sip.css";
// import "./gst.css";
import Header from "../components/Header";
// import Fragment from "../Fragment/Fragment"

const Sipcalculator = () => {
  const [investmentType, setInvestmentType] = useState("sip");
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [expectedReturnRate, setExpectedReturnRate] = useState(0);
  const [timePeriod, setTimePeriod] = useState(0);

  const handleInvestmentTypeChange = (event) => {
    setInvestmentType(event.target.value);
  };

  const handleMonthlyInvestmentChange = (event) => {
    setMonthlyInvestment(parseFloat(event.target.value));
  };

  const handleExpectedReturnRateChange = (event) => {
    setExpectedReturnRate(parseFloat(event.target.value));
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(parseInt(event.target.value));
  };

  const calculateTotalValue = () => {
    let totalValue = 0;
    let investedAmount = 0;
    let estimatedReturns = 0;

    if (investmentType === "sip") {
      // for (let i = 0; i < timePeriod; i++) {
      //   investedAmount += monthlyInvestment
      //   totalValue = Math.ceil(
      //     (totalValue + monthlyInvestment) * (1 + expectedReturnRate / 100)
      //   )
      // }
      totalValue = monthlyInvestment * (1 + expectedReturnRate) * timePeriod;
      estimatedReturns = (totalValue - monthlyInvestment) / timePeriod;
    } else if (investmentType === "lumpsum") {
      investedAmount = monthlyInvestment;
      totalValue = Math.ceil(
        monthlyInvestment * Math.pow(1 + expectedReturnRate / 100, timePeriod)
      );
      estimatedReturns = totalValue - investedAmount;
    }

    return { totalValue, investedAmount, estimatedReturns };
  };

  const { totalValue, investedAmount, estimatedReturns } =
    calculateTotalValue();

  return (
    <Fragment>
      <Header />
      <section className="sip-box">
      <h4 className="sip-heading">
               SIP Return Calculator 
            </h4>
        <div className="sip-container">
          <div className="left-side">
           
            <p className="para1">Know your SIP returns anytime, anywhere!</p>
            <p className="para2">
              Calculate the future value of your monthly SIP investment on the
              Go!
            </p>
            <div className="radio-buttons">
              <input
                className="radio-11"
                type="button"
                value="sip"
                defaultChecked={investmentType === "sip"}
                onClick={handleInvestmentTypeChange}
              />
              {/* <label className="label" htmlFor="sip">
                SIP
              </label> */}

              <input
                className="radio-12"
                type="button"
                value="lumpsum"
                defaultChecked={investmentType === "lumpsum"}
                onClick={handleInvestmentTypeChange}
              />
              {/* <label className="label" htmlFor="lumpsum">
                Lumpsum
              </label> */}
            </div>

            <div className="given-input">
              <label htmlFor="investment">Monthly Investment</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={handleMonthlyInvestmentChange}
                />
                <p className="ruppes-symbol">₹</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="investment">Expected Return Rate</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={expectedReturnRate}
                  onChange={handleExpectedReturnRateChange}
                />
                <p className="percentage-symbol">%</p>
              </div>
            </div>

            <div className="given-input">
              <label htmlFor="time-period">Time period</label>
              <div className="user-input-rs">
                <input
                  type="number"
                  value={timePeriod}
                  onChange={handleTimePeriodChange}
                />
                <p className="year-symbol">year</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <div className="right-container">
              <div className="selling-cost">
                <p>Total Value</p>
                <p>₹ {totalValue}</p>
              </div>

              <div className="total-sip">
                <p>Invested Amount</p>
                <p>₹ {investedAmount}</p>
              </div>
              <div className="total-profit">
                <p>Estimated Returns</p>
                <p>₹ {estimatedReturns}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Sipcalculator;
